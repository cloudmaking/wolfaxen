import { Handlers } from "$fresh/server.ts";
import { GoogleGenerativeAI } from "npm:@google/generative-ai";
import { State } from "../../middleware/auth.ts";

const apiKey = Deno.env.get("GEMINI_API_KEY") || "";
if (!apiKey) console.error("GEMINI_API_KEY is missing!");
const genAI = new GoogleGenerativeAI(apiKey);

export const handler: Handlers<any, State> = {
  async POST(req, ctx) {
    const session = ctx.state.session;
    const supabase = ctx.state.supabaseClient;

    if (!session || !supabase) {
      return new Response("Unauthorized", { status: 401 });
    }

    const user = session.user;

    // Check usage limits
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (!profile) {
      return new Response("Profile not found", { status: 404 });
    }

    if (!profile.is_subscribed && profile.usage_count >= 1) {
      return new Response("Free limit reached", { status: 403 });
    }

    const body = await req.json();
    const { prompt } = body;

    if (!prompt) {
      return new Response("Prompt is required", { status: 400 });
    }

    if (prompt.length > 5000) {
      return new Response("Prompt too long (max 5000 chars)", { status: 400 });
    }

    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      });

      // 1. Generate Graph Structure
      const graphPrompt = `Analyze this process description: "${prompt}". 
      Extract the process flow into nodes and edges.
      - Nodes: id, label, type (start, process, decision, end).
      - Edges: source, target, label (optional).
      Return JSON.`;

      const graphResult = await model.generateContent(graphPrompt);
      const graphText = graphResult.response.text();
      // Clean up markdown code blocks if present
      const cleanGraphText = graphText.replace(/```json/g, "").replace(
        /```/g,
        "",
      ).trim();
      const graphData = JSON.parse(cleanGraphText);

      // 2. Generate Deep Analysis
      const analysisPrompt = `Analyze this process map JSON: ${
        JSON.stringify(graphData)
      }.
      Provide:
      1. A concise executive summary.
      2. A list of key bottlenecks or pain points.
      3. A list of actionable improvements/recommendations.
      Return JSON with keys: summary, bottlenecks, improvements.`;

      const analysisResult = await model.generateContent(analysisPrompt);
      const analysisText = analysisResult.response.text();
      const cleanAnalysisText = analysisText.replace(/```json/g, "").replace(
        /```/g,
        "",
      ).trim();
      const analysisData = JSON.parse(cleanAnalysisText);

      const result = {
        nodes: graphData.nodes,
        edges: graphData.edges,
        summary: analysisData.summary,
        bottlenecks: analysisData.bottlenecks,
        improvements: analysisData.improvements,
      };

      // Update usage count if not subscribed
      if (!profile.is_subscribed) {
        await supabase.from("profiles").update({
          usage_count: profile.usage_count + 1,
        }).eq("id", user.id);
      }

      return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (e: any) {
      console.error("Generation failed:", e);
      console.error("API Key present:", !!apiKey);
      return new Response(`Generation failed: ${e.message}`, { status: 500 });
    }
  },
};
