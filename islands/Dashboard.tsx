import { useEffect, useState } from "preact/hooks";
import { supabase } from "../utils/supabase_client.ts";
import { ProcessGraph } from "../types.ts";
import Button from "../components/Button.tsx";

interface MapEntry {
  id: string;
  title: string;
  created_at: string;
  graph_data: ProcessGraph;
}

interface UserProfile {
  email: string;
  full_name?: string;
  is_subscribed: boolean;
  usage_count: number;
}

export default function Dashboard() {
  const [maps, setMaps] = useState<MapEntry[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        window.location.href = "/login";
        return;
      }

      // Fetch Profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (profileData) {
        setProfile({
          email: session.user.email!,
          full_name: profileData.full_name,
          is_subscribed: profileData.is_subscribed,
          usage_count: profileData.usage_count,
        });
      }

      // Fetch Maps
      const { data: mapsData } = await supabase
        .from("process_maps")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      if (mapsData) {
        setMaps(mapsData);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div class="flex items-center justify-center min-h-[60vh]">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-muted-gold">
        </div>
      </div>
    );
  }

  return (
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 class="text-4xl font-display font-bold text-warm-beige mb-2">
            Dashboard
          </h1>
          <p class="text-warm-beige/60">
            Manage your process maps and account settings.
          </p>
        </div>
        <div class="flex items-center gap-4">
          <div class="text-right hidden md:block">
            <p class="text-warm-beige font-medium">
              {profile?.full_name || "User"}
            </p>
            <p class="text-xs text-warm-beige/40">{profile?.email}</p>
          </div>
          <div class="h-10 w-10 rounded-full bg-gradient-to-br from-muted-gold to-light-gold flex items-center justify-center text-oreo-black font-bold text-lg shadow-lg">
            {profile?.full_name?.[0]?.toUpperCase() || "U"}
          </div>
          <button
            onClick={handleLogout}
            class="ml-4 text-sm text-warm-beige/60 hover:text-red-400 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Stats / Plan Section */}
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h3 class="text-sm font-medium text-warm-beige/60 uppercase tracking-wider mb-2">
            Current Plan
          </h3>
          <div class="flex items-center gap-3">
            <span class="text-2xl font-bold text-white">
              {profile?.is_subscribed ? "Professional" : "Free Tier"}
            </span>
            {profile?.is_subscribed && (
              <span class="px-2 py-1 bg-muted-gold/20 text-muted-gold text-xs rounded-full border border-muted-gold/30">
                Active
              </span>
            )}
          </div>
          {!profile?.is_subscribed && (
            <p class="text-xs text-warm-beige/40 mt-2">
              {profile?.usage_count || 0} / 1 free maps used
            </p>
          )}
        </div>
      </div>

      {/* Maps Grid */}
      <h2 class="text-2xl font-display font-bold text-warm-beige mb-6 flex items-center gap-3">
        Your Process Maps
        <span class="text-sm font-sans font-normal text-warm-beige/40 bg-white/5 px-2 py-0.5 rounded-full">
          {maps.length}
        </span>
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Create New Card */}
        <a
          href="/services/process-mapping"
          class="group relative block h-64 rounded-xl border-2 border-dashed border-white/10 hover:border-muted-gold/50 transition-all duration-300 bg-white/5 hover:bg-white/10 flex flex-col items-center justify-center gap-4 overflow-hidden"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-muted-gold/0 to-muted-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div class="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/10 group-hover:border-muted-gold/30">
            <svg
              class="w-8 h-8 text-warm-beige/60 group-hover:text-muted-gold transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <span class="font-medium text-warm-beige/80 group-hover:text-muted-gold transition-colors">
            Create New Map
          </span>
        </a>

        {/* Map Cards */}
        {maps.map((map) => (
          <div
            key={map.id}
            class="group relative h-64 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col hover:border-muted-gold/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.3)]"
          >
            <div class="flex-1">
              <div class="flex justify-between items-start mb-4">
                <div class="h-10 w-10 rounded-lg bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center border border-white/5">
                  <svg
                    class="w-5 h-5 text-muted-gold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                </div>
                <span class="text-xs text-warm-beige/40 font-mono">
                  {new Date(map.created_at).toLocaleDateString()}
                </span>
              </div>
              <h3 class="text-xl font-bold text-warm-beige mb-2 line-clamp-2 group-hover:text-muted-gold transition-colors">
                {map.title || "Untitled Process"}
              </h3>
              <p class="text-sm text-warm-beige/60 line-clamp-3">
                {map.graph_data.summary || "No summary available."}
              </p>
            </div>
            <div class="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
              <span class="text-xs text-warm-beige/40">
                {map.graph_data.nodes.length} nodes
              </span>
              <a
                href={`/services/process-mapping?id=${map.id}`}
                class="text-sm font-medium text-muted-gold hover:text-light-gold transition-colors flex items-center gap-1"
              >
                Open Map
                <svg
                  class="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
