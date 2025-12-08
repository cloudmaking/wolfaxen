import { Handlers } from "$fresh/server.ts";
import { State } from "../../../middleware/auth.ts";

export const handler: Handlers<any, State> = {
  async POST(req, ctx) {
    const session = ctx.state.session;
    const supabase = ctx.state.supabaseClient;

    if (!session || !supabase) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { error } = await supabase
      .from("help_requests")
      .insert({
        user_id: session.user.id,
        process_map_id: body.process_map_id,
        company_name: body.company_name,
        contact_name: body.contact_name,
        contact_email: body.contact_email,
        message: body.message,
      });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
