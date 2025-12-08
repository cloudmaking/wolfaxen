import { Handlers, PageProps } from "$fresh/server.ts";
import { setCookie } from "$std/http/cookie.ts";
import { createClient } from "npm:@supabase/supabase-js";

export const handler: Handlers = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    console.log("Auth callback received:", req.url);
    const code = url.searchParams.get("code");

    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false },
    });

    if (code) {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error("Auth error:", error);
        return Response.redirect(`${url.origin}/login?error=auth_failed`);
      }

      // Create profile if it doesn't exist
      if (data.session?.user) {
        const user = data.session.user;

        // 1. Check for pending unqualified lead
        const { data: leads } = await supabase
          .from("unqualified_leads")
          .select("*")
          .eq("email", user.email);

        if (leads && leads.length > 0) {
          const lead = leads[0];
          console.log("Found pending lead for user:", user.email);

          // 2. Create Process Map from Lead
          await supabase.from("process_maps").insert({
            user_id: user.id,
            title: "Voice AI Consultation",
            raw_input: `Transcript:\n${lead.transcript || ""}\n\nSummary:\n${
              lead.summary || lead.message || ""
            }`,
            graph_data: { nodes: [], edges: [] },
            graph_json: { nodes: [], edges: [] },
            insights_json: {},
            version: 1,
          });

          // 3. Update Profile Name/Company if missing
          const updates: any = {};
          if (lead.name) updates.full_name = lead.name;
          if (lead.company) updates.company = lead.company;

          if (Object.keys(updates).length > 0) {
            await supabase
              .from("profiles")
              .update(updates)
              .eq("id", user.id);
          }

          // 4. Delete the lead
          await supabase
            .from("unqualified_leads")
            .delete()
            .eq("email", user.email);

          console.log("Converted lead to process map and deleted lead.");
        } else {
          // Ensure profile exists even if no lead
          await supabase.from("profiles").upsert({
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name ||
              user.email?.split("@")[0],
          }, { onConflict: "id" });
        }
      }

      const headers = new Headers();

      if (data.session) {
        console.log(
          "[Auth Callback] Session exchange successful. Setting cookies...",
        );
        console.log(
          `[Auth Callback] Access Token (masked): ${
            data.session.access_token.substring(0, 10)
          }...`,
        );

        setCookie(headers, {
          name: "supa_access_token",
          value: data.session.access_token,
          maxAge: data.session.expires_in,
          path: "/",
          httpOnly: true,
          secure: true,
          sameSite: "Lax",
        });
        setCookie(headers, {
          name: "supa_refresh_token",
          value: data.session.refresh_token,
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: "/",
          httpOnly: true,
          secure: true,
          sameSite: "Lax",
        });
      } else {
        console.error(
          "[Auth Callback] No session returned from exchangeCodeForSession",
        );
      }

      headers.set("Location", `${url.origin}/dashboard`);
      return new Response(null, {
        status: 303,
        headers,
      });
    }

    // If no code, render the page to check for hash (Implicit Flow)
    return ctx.render();
  },
};

export default function AuthCallback() {
  return (
    <div class="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div class="max-w-md w-full text-center space-y-4">
        <h1 class="text-2xl font-bold">Completing Sign In...</h1>
        <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white mx-auto">
        </div>
        <p class="text-gray-400">Please wait while we verify your session.</p>

        <script
          dangerouslySetInnerHTML={{
            __html: `
          // Check for hash fragment (Implicit Flow)
          if (window.location.hash) {
            console.log("Hash found:", window.location.hash);
            const params = new URLSearchParams(window.location.hash.substring(1));
            const accessToken = params.get("access_token");
            const refreshToken = params.get("refresh_token");
            const error = params.get("error");
            
            if (error) {
               document.body.innerHTML = '<div class="text-red-500 p-4">Login Error: ' + params.get("error_description") + '</div>';
            } else if (accessToken && refreshToken) {
               console.log("Found tokens in hash, setting session...");
               document.querySelector('h1').innerText = "Logging you in...";
               document.querySelector('p').innerText = "Setting up your secure session...";

               fetch("/api/auth/set-session", {
                 method: "POST",
                 headers: { "Content-Type": "application/json" },
                 body: JSON.stringify({ access_token: accessToken, refresh_token: refreshToken })
               })
               .then(res => {
                 if (res.ok) {
                   window.location.href = "/dashboard";
                 } else {
                   document.body.innerHTML = '<div class="text-red-500 p-4">Session Setup Failed. Please try again.</div>';
                 }
               })
               .catch(err => {
                 console.error(err);
                 document.body.innerHTML = '<div class="text-red-500 p-4">Network Error. Please try again.</div>';
               });
            }
          } else {
            console.log("No hash or code found.");
            // Only redirect to login if we are sure there's no auth data
            setTimeout(() => {
               window.location.href = "/login?error=no_code_or_hash";
            }, 2000);
          }
        `,
          }}
        />
      </div>
    </div>
  );
}
