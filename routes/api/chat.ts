import { Handlers } from "$fresh/server.ts";
import { GoogleGenerativeAI, Part } from "npm:@google/generative-ai";

const apiKey = Deno.env.get("GEMINI_API_KEY");
const genAI = new GoogleGenerativeAI(apiKey || "");

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction:
    `You are "Flow", a professional, friendly, and efficient business process consultant for Wolfaxen.
Your goal is to briefly interview the potential client to understand their business inefficiencies.

1.  **Introduce yourself** briefly as Flow, Wolfaxen's AI consultant (only if it's the start of the conversation).
2.  **Ask for their name and company** if you don't feature them.
3.  **Ask about their main operational bottleneck** or "pain point".
4.  **Ask for their email** if you don't have it.
5.  **Once you have Name, Company, Challenges, and Email**, you MUST call the 'previewInquiry' tool to show the user what you have captured.
6.  Ask the user to confirm if the details are correct.
7.  If the user corrects anything, call 'previewInquiry' again with the updated details.
8.  **ONLY when the user explicitly confirms** (e.g., "yes", "looks good", "submit it"), call the 'submitInquiry' tool.
9.  When calling 'submitInquiry', you MUST generate two things:
    a) 'transcript': A detailed, word-for-word transcript of the conversation so far.
    b) 'summary': A concise summary of their pain points and business context.
10. After the 'submitInquiry' tool call is successful, say "I've submitted your inquiry. To be helpful, I've sent you a sign-in link straight to your email. You can use it to access our free Process Mapper on the dashboard immediately. It will visualize exactly where you're losing money."
11. Then say goodbye.
12. **Voice Feature**: If the user seems to be providing short or vague answers, or if they mention typing is difficult, politely remind them that they can use the microphone button to speak their thoughts freely.
13. Keep responses concise and conversational. Do not use markdown formatting like bolding or lists unless necessary for clarity.`,
  tools: [
    {
      functionDeclarations: [
        {
          name: "previewInquiry",
          description:
            "Show the gathered inquiry details to the user for confirmation before submission.",
          parameters: {
            type: "OBJECT",
            properties: {
              name: { type: "STRING" },
              company: { type: "STRING" },
              email: { type: "STRING" },
              challenges: { type: "STRING" },
            },
            required: ["name", "company", "email", "challenges"],
          },
        },
        {
          name: "submitInquiry",
          description:
            "Submit the user inquiry after gathering necessary information and receiving explicit user confirmation.",
          parameters: {
            type: "OBJECT",
            properties: {
              name: { type: "STRING" },
              company: { type: "STRING" },
              email: { type: "STRING" },
              challenges: { type: "STRING" },
              transcript: {
                type: "STRING",
                description: "A detailed word-for-word transcript.",
              },
              summary: {
                type: "STRING",
                description: "A concise summary of the business pain points.",
              },
            },
            required: [
              "name",
              "company",
              "email",
              "challenges",
              "transcript",
              "summary",
            ],
          },
        },
      ],
    },
  ],
});

export const handler: Handlers = {
  async POST(req, _ctx) {
    if (!apiKey) {
      return new Response("GEMINI_API_KEY not set", { status: 500 });
    }

    try {
      const body = await req.json();
      const { history, message, userContext } = body;

      // Construct chat history for Gemini
      // History format: { role: "user" | "model", parts: [{ text: "..." }] }
      const chat = model.startChat({
        history: history || [],
      });

      // If userContext is provided and it's the first message (or we want to reinforce it),
      // we could prepend it to the message or use it to seed the history.
      // For now, let's just append the user message.

      let msgText = message;
      if (userContext && (!history || history.length === 0)) {
        msgText = `[System Context: User Name: ${
          userContext.name || "Unknown"
        }, Company: ${userContext.company || "Unknown"}, Email: ${
          userContext.email || "Unknown"
        }]\n\n${message}`;
      }

      const result = await chat.sendMessage(msgText);
      const response = await result.response;

      // Check for function calls
      const functionCalls = response.functionCalls();
      const text = response.text();

      return new Response(
        JSON.stringify({
          text,
          functionCalls,
          history: await chat.getHistory(),
        }),
        {
          headers: { "Content-Type": "application/json" },
        },
      );
    } catch (error) {
      console.error("Chat API Error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};
