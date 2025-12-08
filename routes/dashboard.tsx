import { Handlers, PageProps } from "$fresh/server.ts";
import { State } from "../middleware/auth.ts";
import ProfileForm from "../islands/ProfileForm.tsx";

export const handler: Handlers<any, State> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const session = ctx.state.session;
    const supabase = ctx.state.supabaseClient;

    if (!session || !supabase) {
      return Response.redirect(`${url.origin}/login`);
    }

    let profile, sub;

    const { data: dbProfile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();
    profile = dbProfile;

    const { data: dbSub } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", session.user.id)
      .single();
    sub = dbSub;

    return ctx.render({ profile, sub });
  },
};

export default function Dashboard({ data }: PageProps) {
  const { profile, sub } = data;

  return (
    <div class="min-h-screen bg-black text-white p-8">
      <div class="max-w-4xl mx-auto">
        <header class="mb-12 flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold">Dashboard</h1>
            <p class="text-gray-400 mt-1">
              Welcome back, {profile?.email || "User"}
            </p>
          </div>
          <a
            href="/auth/signout"
            class="text-sm text-gray-400 hover:text-white"
          >
            Sign Out
          </a>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Process Mapper Card */}
          <div class="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-indigo-500 transition-colors group">
            <div class="flex justify-between items-start mb-4">
              <div class="p-3 bg-indigo-900/30 rounded-lg text-indigo-400 group-hover:text-indigo-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                  <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                  <line x1="6" y1="6" x2="6.01" y2="6"></line>
                  <line x1="6" y1="18" x2="6.01" y2="18"></line>
                </svg>
              </div>
              <span class="text-xs font-medium px-2 py-1 rounded bg-green-900/30 text-green-400 border border-green-900">
                {sub?.status === "active" ? "Active" : "Free Tier"}
              </span>
            </div>
            <h3 class="text-xl font-bold mb-2">Process Mapper</h3>
            <p class="text-gray-400 text-sm mb-6">
              Map your workflows, identify bottlenecks, and get AI-driven
              automation insights.
            </p>
            <button class="text-gray-500 cursor-not-allowed text-sm" disabled>
              Launch Tool (Coming Soon)
            </button>
          </div>

          {/* Subscription Card */}
          <div class="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div class="flex justify-between items-start mb-4">
              <div class="p-3 bg-gray-800 rounded-lg text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
            </div>
            <h3 class="text-xl font-bold mb-2">Subscription</h3>
            <p class="text-gray-400 text-sm mb-6">
              {sub?.status === "active"
                ? "You have unlimited access to all tools."
                : "You are on the free tier. 1 free generation available."}
            </p>
            <button class="text-gray-500 cursor-not-allowed text-sm" disabled>
              Manage Billing (Coming Soon)
            </button>
          </div>
        </div>

        <div class="mt-8 bg-gray-900 border border-gray-800 rounded-xl p-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-xl font-bold">Profile</h3>
              <p class="text-gray-400 text-sm">
                Update your details to personalize the experience.
              </p>
            </div>
          </div>
          <ProfileForm
            name={profile?.full_name || profile?.name || ""}
            company={(profile as any)?.company || ""}
            email={profile?.email || ""}
          />
        </div>
      </div>
    </div>
  );
}
