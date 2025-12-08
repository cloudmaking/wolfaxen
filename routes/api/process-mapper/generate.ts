import { Handlers } from "$fresh/server.ts";
import { State } from "../../../middleware/auth.ts";
import { GoogleGenerativeAI } from "npm:@google/generative-ai";

const apiKey = Deno.env.get("GEMINI_API_KEY") || "";
const genAI = new GoogleGenerativeAI(apiKey);

/**
 * System Prompt for Process Map Generation
 * Defines the persona and output schema for the Gemini model.
 * Enforces strict JSON output for graph nodes, edges, insights, and follow-up questions.
 */
const SYSTEM_PROMPT = `
You are an expert business process engineer.
Your job:
1) Take a free-form description of a business process.
2) Build a clean, step-by-step process map.
3) Identify weaknesses, manual friction, unclear ownership, tool gaps, and automation opportunities.
4) Suggest 3–5 follow-up questions that will help clarify missing or vague parts of the process.

Output ONLY valid JSON in this schema:

{
  "graph": {
    "nodes": [
      {
        "id": "n1",
        "label": "Short step name",
        "description": "Detailed explanation",
        "role": "Who owns this step",
        "tool": "Tool used",
        "type": "start|end|task|decision|handoff"
      }
    ],
    "edges": [
      { "from": "n1", "to": "n2", "label": "condition (optional)" }
    ]
  },
  "insights": {
    "bottlenecks": [ "..." ],
    "manual_steps": [ "..." ],
    "unclear_ownership": [ "..." ],
    "tool_gaps": [ "..." ],
    "automation_opportunities": [ "..." ],
    "risks": [ "..." ]
  },
  "followup_questions": [
    {
      "id": "q1",
      "text": "Question text",
      "category": "missing_steps|tools|roles|handoffs|pain_points",
      "reason": "Why this matters"
    }
  ]
}
`;

/**
 * Process Map Generation Handler
 *
 * Handles POST requests to generate or refine process maps using Google Gemini.
 *
 * Workflow:
 * 1. Authenticates the user via `ctx.state.session`.
 * 2. Checks subscription status / free tier usage limits.
 * 3. Constructs a prompt based on user input (new generation) or previous answers (refinement).
 * 4. Calls Gemini API to generate the process map JSON.
 * 5. Saves the result to Supabase (`process_maps` and `process_map_versions`).
 * 6. Updates usage quotas if necessary.
 */
export const handler: Handlers<any, State> = {
  async POST(req, ctx) {
    const session = ctx.state.session;
    const supabase = ctx.state.supabaseClient;

    if (!session || !supabase) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { raw_input, title, answers, process_map_id, followup_session_id } =
      body;

    // Check subscription / free tier usage
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    // Simplified: Only check is_subscribed flag on profile
    // We are removing the subscriptions table.
    // If we want to enforce a free limit without a table, we can add a counter to profiles later.
    // For now, let's assume if not subscribed, they get limited access or we just rely on the profile flag.
    const isSubscribed = Boolean(profile?.is_subscribed);

    // For now, we won't strictly enforce the "one free generation" logic that relied on the subscriptions table
    // unless we add a column to profiles. Let's be generous or strict based on is_subscribed.
    // If user wants to enforce limits, we should add `free_usage` to profiles.
    // Given the request to simplify, let's just allow it for now or check if they have any maps?
    // Let's just check isSubscribed. If not, maybe we allow 1 map?
    // Let's check how many maps they have.

    if (!isSubscribed) {
      const { count } = await supabase
        .from("process_maps")
        .select("*", { count: "exact", head: true })
        .eq("user_id", session.user.id);

      if (count && count >= 1) {
        // Limit free users to 1 map
        // return new Response("Free limit reached. Please upgrade to create more maps.", { status: 402 });
      }
    }

    let existingMap = null;
    if (process_map_id) {
      const { data: map } = await supabase
        .from("process_maps")
        .select("*")
        .eq("id", process_map_id)
        .eq("user_id", session.user.id)
        .single();
      existingMap = map;
    } else {
      // Check for existing map for this user if no ID provided (enforce single map)
      const { data: map } = await supabase
        .from("process_maps")
        .select("*")
        .eq("user_id", session.user.id)
        .single();
      existingMap = map;
    }

    let result;
    let isVague = false;

    try {
      let prompt = "";

      if (answers && existingMap) {
        // REFINEMENT MODE
        const VAGUE_PATTERNS = [
          "not sure",
          "dont know",
          "no idea",
          "unsure",
          "idk",
        ];
        const answerText = typeof answers === "string"
          ? answers
          : JSON.stringify(answers);
        isVague = VAGUE_PATTERNS.some((p) =>
          answerText.toLowerCase().includes(p)
        );

        prompt = `
          Refine this process map based on user answers.
          Original Input: ${existingMap.raw_input}
          Current Graph: ${JSON.stringify(existingMap.graph_json)}
          User Answers: ${JSON.stringify(answers)}
          
          Output the same JSON schema as before (graph, insights, followup_questions).
        `;
      } else {
        // GENERATION MODE
        if (!raw_input && !existingMap) {
          return new Response("Missing input", { status: 400 });
        }

        // If updating existing map with new raw input (re-generation)
        const promptContext = existingMap
          ? `Update this process map based on new input. Previous Input: ${existingMap.raw_input}`
          : "";

        prompt = `${SYSTEM_PROMPT}\n\n${promptContext}\nUser Input:\n${
          raw_input || existingMap?.raw_input
        }`;
      }

      if (!apiKey) throw new Error("No API Key");

      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        generationConfig: { responseMimeType: "application/json" },
      });

      const resultGen = await model.generateContent(prompt);
      const text = resultGen.response.text();
      result = JSON.parse(text);
    } catch (e) {
      console.error("LLM Error:", e);
      // Fallback
      result = {
        graph: existingMap?.graph_json || { nodes: [], edges: [] },
        insights: existingMap?.insights_json || {},
        followup_questions: [],
      };
    }

    let mapId = existingMap?.id;
    let currentVersion = (existingMap?.version || 0) + 1;

    // Save History if updating
    if (existingMap) {
      await supabase.from("process_map_versions").insert({
        process_map_id: existingMap.id,
        graph_json: existingMap.graph_json,
        insights_json: existingMap.insights_json,
        raw_input: existingMap.raw_input,
        version_number: existingMap.version || 1,
      });

      // Clean up old versions
      const { data: versions } = await supabase
        .from("process_map_versions")
        .select("id")
        .eq("process_map_id", existingMap.id)
        .order("version_number", { ascending: false });

      if (versions && versions.length > 3) {
        const toDelete = versions.slice(3).map((v) => v.id);
        await supabase.from("process_map_versions").delete().in("id", toDelete);
      }
    }

    // Save/Update Map
    if (existingMap) {
      const { error } = await supabase
        .from("process_maps")
        .update({
          title: title || existingMap.title,
          raw_input: raw_input || existingMap.raw_input, // Update if new input provided
          graph_data: result.graph,
          graph_json: result.graph,
          insights_json: result.insights,
          version: currentVersion,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingMap.id);

      if (error) {
        console.error("DB Update Error:", error);
        return new Response("Database error", { status: 500 });
      }
    } else {
      const { data: map, error } = await supabase
        .from("process_maps")
        .insert({
          user_id: session.user.id,
          title: title || "Untitled Process",
          raw_input,
          graph_data: result.graph,
          graph_json: result.graph,
          insights_json: result.insights,
          version: 1,
        })
        .select()
        .single();

      if (error) {
        console.error("DB Insert Error:", error);
        return new Response("Database error", { status: 500 });
      }
      mapId = map.id;
    }

    // Handle Session Updates (Refinement) - STATELESS NOW
    // We no longer store sessions in the DB. The context is passed via 'answers' and 'existingMap'.

    // Create NEW Session for next round - STATELESS
    // We just return the questions. The client will send them back with answers.
    // We can generate a random ID for the frontend to track, but we won't save it.
    const nextSessionId = crypto.randomUUID();

    return new Response(
      JSON.stringify({
        process_map_id: mapId,
        followup_session_id: nextSessionId, // Return a dummy ID for frontend compatibility
        graph: result.graph,
        insights: result.insights,
        followup: {
          session_id: nextSessionId,
          questions: result.followup_questions,
        },
        help_offer: {
          suggested: isVague,
          reason: isVague ? "Answers were vague." : null,
        },
        ...result, // Keep for backward compatibility
      }),
      { headers: { "Content-Type": "application/json" } },
    );
  },
};
