import { Handlers } from "$fresh/server.ts";
import { State } from "../../../middleware/auth.ts";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeFPC47yWY58pLCgq0mdvZ3bDRHHtGh6DDCTA7mXDg_SSLlYg/formResponse";

// Field mapping from inspection of routes/api/contact.ts
const GOOGLE_FORM_FIELDS = {
  name: "entry.1455405538",
  email: "entry.1612667603",
  subject: "entry.610310285",
  message: "entry.1755670710",
};

export const handler: Handlers<any, State> = {
  async POST(req, ctx) {
    try {
      const supabase = ctx.state.supabaseClient;
      const session = ctx.state.session;

      // Allow guest submissions; we only require a Supabase client
      // Session may be null for logged-out visitors (voice assistant, homepage forms)
      if (!supabase) {
        return new Response("Unauthorized", { status: 401 });
      }

      const body = await req.json();
      const { name, email, message, source } = body;

      // 1. Check if user is logged in
      if (session?.user?.id) {
        // Check if user already has a process map
        const { count } = await supabase
          .from("process_maps")
          .select("*", { count: "exact", head: true })
          .eq("user_id", session.user.id);

        if (count && count > 0) {
          return new Response(
            JSON.stringify({
              success: false,
              error: "User already has a process map",
              code: "EXISTING_MAP",
            }),
            { status: 400, headers: { "Content-Type": "application/json" } },
          );
        }

        // Create Process Map directly
        const { data: map, error } = await supabase
          .from("process_maps")
          .insert({
            user_id: session.user.id,
            title: "Voice AI Consultation",
            raw_input: `Transcript:\n${body.transcript || ""}\n\nSummary:\n${
              body.summary || message || ""
            }`,
            graph_data: { nodes: [], edges: [] },
            graph_json: { nodes: [], edges: [] },
            insights_json: {},
            version: 1,
          })
          .select()
          .single();

        if (error) throw error;

        // Return success (skip Google Forms/Magic Link for existing users)
        return new Response(JSON.stringify({ success: true, map }), {
          headers: { "Content-Type": "application/json" },
        });
      }

      // 2. Guest Flow: Upsert into unqualified_leads
      const { data: lead, error } = await supabase
        .from("unqualified_leads")
        .insert({
          user_id: null, // Always null for guests
          source: source || "voice_ai",
          name: name ?? null,
          company: body.company ?? null,
          email: email ?? null,
          message: message || body.transcript || body.summary ||
            "(No message provided)",
          transcript: body.transcript ?? null,
          summary: body.summary ?? null,
        });

      if (error) {
        console.error("Supabase Insert Error:", error);
        // We continue to Google Forms even if Supabase fails
      } else if (email) {
        // 1.5 Send Magic Link (Voice AI Enhancement)
        try {
          const origin = req.headers.get("origin") || new URL(req.url).origin;
          const { error: authError } = await supabase.auth.signInWithOtp({
            email,
            options: {
              shouldCreateUser: true,
              emailRedirectTo: `${origin}/auth/callback`,
            },
          });
          if (authError) {
            console.error("Magic Link Error:", authError);
          } else {
            console.log("Magic link sent to:", email);
          }
        } catch (e) {
          console.error("Magic Link Exception:", e);
        }
      }

      // 2. Forward to Google Forms (Dual Write)
      const googleParams = new URLSearchParams();
      if (name) googleParams.append(GOOGLE_FORM_FIELDS.name, name);
      if (email) googleParams.append(GOOGLE_FORM_FIELDS.email, email);
      // Map source/company to subject for Google Forms context
      const subject = body.company
        ? `${body.company} (${source})`
        : `New Lead from ${source}`;
      googleParams.append(GOOGLE_FORM_FIELDS.subject, subject);
      googleParams.append(GOOGLE_FORM_FIELDS.message, message);

      const googleResponse = await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: googleParams.toString(),
      });

      if (!googleResponse.ok) {
        console.error("Google Form Error:", googleResponse.status);
      }

      return new Response(JSON.stringify({ success: true, lead }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Lead Submission Error:", error);
      return new Response(
        JSON.stringify({ success: false, error: "Submission failed" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  },
};
