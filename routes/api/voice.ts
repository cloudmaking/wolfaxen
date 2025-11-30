import { Handlers } from "$fresh/server.ts";
import { FreshContext } from "$fresh/server.ts";

// Rate limiting: track connections per IP
const connectionTracker = new Map<string, { count: number; resetAt: number }>();
const MAX_CONNECTIONS_PER_MINUTE = 10;
const RATE_LIMIT_WINDOW_MS = 60_000;

// Allowed origins - production and development
const ALLOWED_ORIGINS = new Set([
  // Production
  "https://wolfaxen.com",
  "https://www.wolfaxen.com",
  // Development (remove these in production if you want stricter security)
  //"http://localhost:8000",
  //"http://localhost:3000",
  //"http://127.0.0.1:8000",
]);

function getClientIP(req: Request, ctx: FreshContext): string {
  // Use actual remote address from connection, not client-supplied headers
  const remoteAddr = ctx.remoteAddr as Deno.NetAddr;
  if (remoteAddr?.hostname) {
    return remoteAddr.hostname;
  }
  // Fallback only if remoteAddr unavailable (should not happen in Deno)
  return "unknown";
}

function isOriginAllowed(req: Request): boolean {
  const origin = req.headers.get("origin");
  // REQUIRE origin header - reject requests without it
  if (!origin) return false;
  return ALLOWED_ORIGINS.has(origin);
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const tracker = connectionTracker.get(ip);

  if (!tracker || now > tracker.resetAt) {
    connectionTracker.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return { allowed: true };
  }

  if (tracker.count >= MAX_CONNECTIONS_PER_MINUTE) {
    const retryAfter = Math.ceil((tracker.resetAt - now) / 1000);
    return { allowed: false, retryAfter };
  }

  tracker.count++;
  return { allowed: true };
}

function isValidMessage(data: unknown): boolean {
  if (typeof data !== "string") return false;
  try {
    const parsed = JSON.parse(data);
    // Basic validation: must be an object
    if (typeof parsed !== "object" || parsed === null) return false;
    // Reject if message is suspiciously large (> 1MB)
    if (data.length > 1_000_000) return false;
    return true;
  } catch {
    // Allow binary data (audio chunks)
    return data.length < 1_000_000;
  }
}

// Cleanup old rate limit entries periodically
const cleanupInterval = setInterval(() => {
  const now = Date.now();
  for (const [ip, tracker] of connectionTracker.entries()) {
    if (now > tracker.resetAt) {
      connectionTracker.delete(ip);
    }
  }
}, 60_000);

// Prevent this interval from keeping the process alive (e.g. during build)
if (typeof Deno !== "undefined") {
  Deno.unrefTimer(cleanupInterval);
}

export const handler: Handlers = {
  GET(req, ctx) {
    // 1. Check for WebSocket upgrade request
    if (req.headers.get("upgrade") !== "websocket") {
      return new Response(null, { status: 501 });
    }

    // 2. Verify API key exists BEFORE upgrading
    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) {
      console.error("❌ GEMINI_API_KEY not set in environment variables!");
      return new Response("Server configuration error", { status: 500 });
    }

    // 3. Validate origin - REQUIRED (no missing origin allowed)
    if (!isOriginAllowed(req)) {
      console.warn(
        `⚠️ Rejected connection: missing or unauthorized origin: ${
          req.headers.get("origin") || "(none)"
        }`,
      );
      return new Response("Forbidden: Origin required", { status: 403 });
    }

    // 4. Check rate limit using actual connection IP
    const clientIP = getClientIP(req, ctx);
    const rateCheck = checkRateLimit(clientIP);
    if (!rateCheck.allowed) {
      console.warn(`⚠️ Rate limited IP: ${clientIP}`);
      return new Response("Too many requests", {
        status: 429,
        headers: { "Retry-After": String(rateCheck.retryAfter) },
      });
    }

    // 5. All checks passed - upgrade connection
    const { socket: clientSocket, response } = Deno.upgradeWebSocket(req);
    console.log(`✅ WebSocket upgraded for IP: ${clientIP}`);

    const geminiUrl =
      `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent?key=${apiKey}`;
    const geminiSocket = new WebSocket(geminiUrl);

    const messageBuffer: string[] = [];
    let messageCount = 0;
    const MAX_MESSAGES_PER_SESSION = 1000;

    clientSocket.onopen = () => {
      console.log("Client connected to Voice Relay");
    };

    geminiSocket.onopen = () => {
      console.log("Connected to Gemini API");
      while (messageBuffer.length > 0) {
        const msg = messageBuffer.shift();
        if (msg) geminiSocket.send(msg);
      }
    };

    clientSocket.onmessage = (e) => {
      // Validate message before forwarding
      if (!isValidMessage(e.data)) {
        console.warn("⚠️ Invalid message rejected");
        return;
      }

      // Per-session message limit
      messageCount++;
      if (messageCount > MAX_MESSAGES_PER_SESSION) {
        console.warn("⚠️ Session message limit exceeded");
        clientSocket.close(1008, "Message limit exceeded");
        return;
      }

      if (geminiSocket.readyState === WebSocket.OPEN) {
        geminiSocket.send(e.data);
      } else {
        console.log("Buffering message for Gemini...");
        messageBuffer.push(e.data as string);
      }
    };

    geminiSocket.onmessage = (e) => {
      if (clientSocket.readyState === WebSocket.OPEN) {
        clientSocket.send(e.data);
      }
    };

    clientSocket.onclose = () => {
      console.log("Client disconnected");
      if (geminiSocket.readyState === WebSocket.OPEN) {
        geminiSocket.close();
      }
    };

    geminiSocket.onclose = (e) => {
      console.log("Gemini disconnected", e.code, e.reason);
      if (clientSocket.readyState === WebSocket.OPEN) {
        clientSocket.send(
          JSON.stringify({
            error: `Gemini disconnected: ${e.code} ${e.reason}`,
          }),
        );
        clientSocket.close();
      }
    };

    geminiSocket.onerror = (e) => {
      console.error("Gemini WebSocket Error", e);
      if (clientSocket.readyState === WebSocket.OPEN) {
        clientSocket.send(JSON.stringify({ error: "Gemini WebSocket Error" }));
      }
    };

    return response;
  },
};
