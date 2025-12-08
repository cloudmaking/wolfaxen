import { Handlers } from "$fresh/server.ts";
import { State } from "../../../middleware/auth.ts";

export const handler: Handlers<any, State> = {
  async GET(_req, ctx) {
    const session = ctx.state.session;
    const supabase = ctx.state.supabaseClient;

    if (!session || !supabase) {
      return new Response(
        JSON.stringify({ session: null, profile: null, subscription: null }),
        { headers: { "Content-Type": "application/json" } },
      );
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", session.user.id)
      .single();

    return new Response(
      JSON.stringify({ session, profile, subscription }),
      { headers: { "Content-Type": "application/json" } },
    );
  },
};
