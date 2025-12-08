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
    const { process_map_id, graph_json } = body;

    if (!process_map_id || !graph_json) {
      return new Response("Missing required fields", { status: 400 });
    }

    // Fetch existing map
    const { data: existingMap } = await supabase
      .from("process_maps")
      .select("*")
      .eq("id", process_map_id)
      .eq("user_id", session.user.id)
      .single();

    if (!existingMap) {
      return new Response("Map not found", { status: 404 });
    }

    // Save current version to history
    await supabase.from("process_map_versions").insert({
      process_map_id: existingMap.id,
      graph_json: existingMap.graph_json,
      insights_json: existingMap.insights_json,
      raw_input: existingMap.raw_input,
      version_number: existingMap.version || 1,
    });

    // Clean up old versions (keep last 3)
    const { data: versions } = await supabase
      .from("process_map_versions")
      .select("id")
      .eq("process_map_id", existingMap.id)
      .order("version_number", { ascending: false });

    if (versions && versions.length > 3) {
      const toDelete = versions.slice(3).map((v) => v.id);
      await supabase.from("process_map_versions").delete().in("id", toDelete);
    }

    // Update map with new graph
    const newVersion = (existingMap.version || 1) + 1;
    const { error } = await supabase
      .from("process_maps")
      .update({
        graph_json: graph_json,
        graph_data: graph_json, // Keep synced
        version: newVersion,
        updated_at: new Date().toISOString(),
      })
      .eq("id", process_map_id);

    if (error) {
      console.error("DB Update Error:", error);
      return new Response("Database error", { status: 500 });
    }

    return new Response(
      JSON.stringify({ success: true, version: newVersion }),
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  },
};
