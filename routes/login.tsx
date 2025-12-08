import { Handlers, PageProps } from "$fresh/server.ts";
import { createClient } from "npm:@supabase/supabase-js";
import LoginError from "../islands/LoginError.tsx";

export const handler: Handlers = {
  async POST(req, ctx) {
    const form = await req.formData();
    const email = form.get("email")?.toString();

    if (!email) {
      return ctx.render({ error: "Email is required" });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false },
    });

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: `${new URL(req.url).origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Login Error:", error);
      return ctx.render({ error: error.message });
    }

    return ctx.render({ success: true, email });
  },
};

export default function Login({ data }: PageProps) {
  return (
    <div class="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div class="max-w-md w-full space-y-8">
        <div class="text-center">
          <h2 class="mt-6 text-3xl font-bold tracking-tight">
            Sign in to Wolfaxen
          </h2>
          <p class="mt-2 text-sm text-gray-400">
            Enter your email to receive a magic link
          </p>
        </div>

        <LoginError />

        {data?.success
          ? (
            <div class="bg-green-900/50 border border-green-500 text-green-200 p-4 rounded-lg text-center">
              <p class="font-medium">Magic link sent!</p>
              <p class="text-sm mt-1">Check your inbox at {data.email}</p>
            </div>
          )
          : (
            <form class="mt-8 space-y-6" method="POST">
              {data?.error && (
                <div class="bg-red-900/50 border border-red-500 text-red-200 p-3 rounded text-sm">
                  {data.error}
                </div>
              )}
              <div>
                <label htmlFor="email" class="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  class="relative block w-full rounded-md border-0 bg-gray-900 py-1.5 text-white ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 px-3"
                  placeholder="Email address"
                />
              </div>

              <div>
                <button
                  type="submit"
                  class="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Send Magic Link
                </button>
              </div>
            </form>
          )}
      </div>
    </div>
  );
}
