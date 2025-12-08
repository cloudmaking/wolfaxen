import { Handlers } from "$fresh/server.ts";
import { State } from "../../../middleware/auth.ts";

interface ProfilePayload {
  name?: string;
  company?: string;
  email?: string;
}

export const handler: Handlers<any, State> = {
  async POST(req, ctx) {
    const session = ctx.state.session;
    const supabase = ctx.state.supabaseClient;

    if (!session || !supabase) {
      return new Response("Unauthorized", { status: 401 });
    }

    let payload: ProfilePayload;
    try {
      payload = await req.json();
    } catch {
      return new Response("Invalid JSON body", { status: 400 });
    }

    const { name, company, email } = payload;
    const updates: Record<string, unknown> = {};

    if (name !== undefined) updates.full_name = name;
    if (company !== undefined) updates.company = company;
    if (email !== undefined) updates.email = email;

    if (Object.keys(updates).length === 0) {
      return new Response("No fields provided", { status: 400 });
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", session.user.id)
      .select("*")
      .single();

    if (profileError) {
      console.error("Profile update failed", profileError);
      return new Response("Profile update failed", { status: 500 });
    }

    let emailUpdated = false;
    if (email && email !== session.user.email) {
      const { error: emailError } = await supabase.auth.updateUser({ email });
      if (emailError) {
        console.error("Auth email update failed", emailError);
        return new Response(
          JSON.stringify({
            success: false,
            profile,
            error: "Auth email update failed",
          }),
          { status: 500, headers: { "Content-Type": "application/json" } },
        );
      }
      emailUpdated = true;
    }

    return new Response(
      JSON.stringify({ success: true, profile, emailUpdated }),
      { headers: { "Content-Type": "application/json" } },
    );
  },
};
