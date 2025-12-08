import { Handlers } from "$fresh/server.ts";
import { deleteCookie, getCookies } from "$std/http/cookie.ts";
import { createClient } from "npm:@supabase/supabase-js";

export const handler: Handlers = {
  async GET(req) {
    const url = new URL(req.url);
    const cookies = getCookies(req.headers);
    const accessToken = cookies.supa_access_token;

    if (accessToken) {
      const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
      const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
      const supabase = createClient(supabaseUrl, supabaseAnonKey, {
        auth: { persistSession: false },
        global: {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      });
      // Sign out from Supabase
      await supabase.auth.signOut();
    }

    const headers = new Headers();
    headers.set("Location", "/login");

    // Clear cookies
    deleteCookie(headers, "supa_access_token", { path: "/" });
    deleteCookie(headers, "supa_refresh_token", { path: "/" });

    return new Response(null, {
      status: 303,
      headers,
    });
  },
};
