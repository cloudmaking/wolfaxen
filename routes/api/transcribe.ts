import { Handlers } from "$fresh/server.ts";
import { GoogleGenerativeAI } from "npm:@google/generative-ai";
import { State } from "../../middleware/auth.ts";

const apiKey = Deno.env.get("GEMINI_API_KEY");
if (!apiKey) {
  console.error("CRITICAL ERROR: Missing GEMINI_API_KEY environment variable.");
}
const genAI = new GoogleGenerativeAI(apiKey || "");

const RATE_LIMIT_WINDOW_MS = 5 * 60_000;
const MAX_REQUESTS = 10;
const rateBuckets = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string) {
  const now = Date.now();
  const bucket = rateBuckets.get(ip);

  if (!bucket || now > bucket.resetAt) {
    rateBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }

  if (bucket.count >= MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfter: Math.ceil((bucket.resetAt - now) / 1000),
    };
  }

  bucket.count++;
  return { allowed: true };
}

export const handler: Handlers<any, State> = {
  async POST(req, ctx) {
    const session = ctx.state.session;
    const supabase = ctx.state.supabaseClient;

    // Allow guest access for chat interface
    // if (!session) ... we proceed

    const clientIP = (ctx.remoteAddr as Deno.NetAddr)?.hostname || "unknown";
    const rl = rateLimit(clientIP);
    if (!rl.allowed) {
      return new Response("Too Many Requests", {
        status: 429,
        headers: rl.retryAfter
          ? { "Retry-After": String(rl.retryAfter) }
          : undefined,
      });
    }

    if (!apiKey) {
      console.error("Transcription failed: Missing GEMINI_API_KEY");
      return new Response("Server Misconfiguration: Missing AI Credentials", {
        status: 500,
      });
    }

    const body = await req.json();
    const { audio } = body;

    if (!audio) {
      return new Response("Audio data required", { status: 400 });
    }

    // Basic size check (base64 string length)
    // 10MB approx 13.3MB base64
    if (audio.length > 14 * 1024 * 1024) {
      return new Response("Audio too large (max 10MB)", { status: 400 });
    }

    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
      });

      const result = await model.generateContent([
        "Transcribe the speech exactly. If it is a description of a business process, ensure clarity in the steps.",
        {
          inlineData: {
            mimeType: "audio/webm",
            data: audio,
          },
        },
      ]);

      return new Response(JSON.stringify({ text: result.response.text() }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (e) {
      console.error("Transcription failed", e);
      return new Response("Transcription failed", { status: 500 });
    }
  },
};
