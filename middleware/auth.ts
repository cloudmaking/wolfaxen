import { FreshContext, MiddlewareHandler } from "$fresh/server.ts";
import {
  createClient,
  Session,
  SupabaseClient,
} from "npm:@supabase/supabase-js";

/**
 * State interface for the Fresh context.
 * Carries the Supabase client and user session for the duration of the request.
 */
export interface State {
  supabaseClient: SupabaseClient;
  session: Session | null;
}

/**
 * Authentication Middleware
 *
 * This middleware is responsible for:
 * 1. Creating a unique Supabase client for each request to prevent session bleeding.
 * 2. Retrieving the access token from secure cookies or the Authorization header.
 * 3. Verifying the user's session with Supabase.
 * 4. Populating `ctx.state` with the authenticated client and session.
 *
 * @param req - The incoming request.
 * @param ctx - The Fresh context.
 * @returns The response from the next handler or a redirect/error.
 */
export const authMiddleware: MiddlewareHandler<State> = async (req, ctx) => {
  const url = new URL(req.url);

  // 1. Create a per-request Supabase client
  // We disable session persistence because we are handling it manually via cookies/headers
  // for a server-side context.
  const createClientFn =
    // Allow test stubbing without affecting runtime behavior.
    (globalThis as unknown as { __supabaseCreateClient?: typeof createClient })
      .__supabaseCreateClient ?? createClient;

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY");

  if (!supabaseUrl || !supabaseKey) {
    console.error(
      "CRITICAL ERROR: Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables.",
    );
    return new Response(
      "Internal Configuration Error: Missing Database Credentials",
      { status: 500 },
    );
  }

  const client = createClientFn(
    supabaseUrl,
    supabaseKey,
    { auth: { persistSession: false } },
  );

  ctx.state.supabaseClient = client;

  // 2. Retrieve Access Token
  // Priority: Cookie > Authorization Header
  let accessToken: string | null = null;
  let refreshToken: string | null = null;
  let session: Session | null = null;
  const cookies = req.headers.get("cookie");
  if (cookies) {
    const match = cookies.match(/supa_access_token=([^;]+)/);
    if (match) accessToken = match[1];
    const refreshMatch = cookies.match(/supa_refresh_token=([^;]+)/);
    if (refreshMatch) refreshToken = refreshMatch[1];
  }

  if (!accessToken) {
    const authHeader = req.headers.get("Authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      accessToken = authHeader.replace("Bearer ", "");
    }
  }

  if (accessToken && refreshToken) {
    const { data, error } = await client.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    if (error) {
      console.error("[Auth Middleware] setSession Error:", error.message);
    } else {
      session = data.session;
    }
  } else if (accessToken) {
    // If only access token is present (e.g. from header), verify it
    const { data: { user }, error } = await client.auth.getUser(accessToken);

    if (error) {
      console.error("[Auth Middleware] getUser Error:", error.message);
    } else if (user) {
      // Create a partial session object
      session = {
        access_token: accessToken,
        token_type: "bearer",
        user: user,
      } as Session;
    }
  }

  ctx.state.supabaseClient = client;
  ctx.state.session = session;

  // Protect dashboard routes
  if (url.pathname.startsWith("/dashboard")) {
    if (!session) {
      console.log("[Auth Middleware] Redirecting to login (No Session)");
      return new Response(null, {
        status: 303,
        headers: { Location: "/login" },
      });
    }
  }

  return await ctx.next();
};
