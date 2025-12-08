import { Handlers } from "$fresh/server.ts";
import { setCookie } from "$std/http/cookie.ts";
import { createClient } from "npm:@supabase/supabase-js";

export const handler: Handlers = {
  async POST(req) {
    const body = await req.json();
    const { access_token, refresh_token } = body;

    if (!access_token || !refresh_token) {
      return new Response("Missing tokens", { status: 400 });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false },
    });

    // Verify the session with Supabase to ensure tokens are valid
    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });

    if (error || !data.session) {
      console.error("Failed to verify session:", error);
      return new Response("Invalid tokens", { status: 401 });
    }

    // Create profile if it doesn't exist (Critical for new users via Implicit Flow)
    if (data.session.user) {
      const { error: profileError } = await supabase.from("profiles").upsert({
        id: data.session.user.id,
        email: data.session.user.email,
      }, { onConflict: "id" });

      if (profileError) {
        console.error("Failed to create profile:", profileError);
      }
    }

    const headers = new Headers();

    setCookie(headers, {
      name: "supa_access_token",
      value: access_token,
      maxAge: data.session.expires_in,
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
    });

    setCookie(headers, {
      name: "supa_refresh_token",
      value: refresh_token,
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
    });

    return new Response(JSON.stringify({ success: true }), {
      headers,
      status: 200,
    });
  },
};
