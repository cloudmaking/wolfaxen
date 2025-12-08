import { useState } from "preact/hooks";
import { supabase } from "../utils/supabase_client.ts";

export default function AuthForm(
  { initialType = "login" }: { initialType?: "login" | "signup" },
) {
  const type = initialType;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (type === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });
        if (error) throw error;

        if (data.session) {
          await fetch("/api/auth/set-session", {
            method: "POST",
            body: JSON.stringify({
              access_token: data.session.access_token,
              refresh_token: data.session.refresh_token,
            }),
          });
        }
        alert("Signup successful! Please check your email for confirmation.");
        window.location.href = "/login";
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;

        // Set session on server (cookies)
        if (data.session) {
          await fetch("/api/auth/set-session", {
            method: "POST",
            body: JSON.stringify({
              access_token: data.session.access_token,
              refresh_token: data.session.refresh_token,
            }),
          });
        }

        // Redirect to the Dashboard after login
        window.location.href = "/dashboard";
      }
    } catch (err: any) {
      console.error("Auth Error:", err);
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "apple" | "github") => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      console.error("Auth Error:", err);
      setError(err.message || "An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <div class="w-full max-w-md mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-display font-bold text-warm-beige mb-2">
          {type === "login" ? "Welcome Back" : "Join Wolfaxen"}
        </h2>
        <p class="text-warm-beige/60 text-sm">
          {type === "login"
            ? "Sign in to access your process maps"
            : "Create an account to start optimizing"}
        </p>
      </div>

      {error && (
        <div class="bg-red-500/10 border border-red-500/20 text-red-200 p-4 rounded-lg mb-6 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} class="space-y-5">
        {type === "signup" && (
          <div>
            <label class="block text-sm font-medium text-warm-beige/80 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onInput={(e) => setFullName((e.target as HTMLInputElement).value)}
              required
              class="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-warm-beige placeholder-warm-beige/30 focus:outline-none focus:ring-2 focus:ring-muted-gold/50 focus:border-muted-gold/50 transition-all"
              placeholder="John Doe"
            />
          </div>
        )}

        <div>
          <label class="block text-sm font-medium text-warm-beige/80 mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
            required
            class="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-warm-beige placeholder-warm-beige/30 focus:outline-none focus:ring-2 focus:ring-muted-gold/50 focus:border-muted-gold/50 transition-all"
            placeholder="john@company.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-warm-beige/80 mb-1.5">
            Password
          </label>
          <input
            type="password"
            value={password}
            onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
            required
            class="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-warm-beige placeholder-warm-beige/30 focus:outline-none focus:ring-2 focus:ring-muted-gold/50 focus:border-muted-gold/50 transition-all"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          class="w-full bg-gradient-to-r from-muted-gold to-light-gold text-oreo-black font-bold py-3 px-6 rounded-lg hover:shadow-[0_0_20px_rgba(185,176,123,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          {loading
            ? "Processing..."
            : type === "login"
            ? "Sign In"
            : "Create Account"}
        </button>
      </form>

      <div class="mt-8">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-white/10"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-oreo-black text-warm-beige/60">
              Or continue with
            </span>
          </div>
        </div>

        <div class="mt-6 grid grid-cols-3 gap-3">
          <button
            onClick={() => handleSocialLogin("google")}
            class="flex items-center justify-center px-4 py-2 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 hover:border-muted-gold/30 transition-all group"
          >
            <svg
              class="h-5 w-5 text-warm-beige group-hover:text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .533 5.333.533 12S5.867 24 12.48 24c3.44 0 6.32-1.133 8.413-3.293 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.133H12.48z" />
            </svg>
          </button>

          <button
            onClick={() => handleSocialLogin("apple")}
            class="flex items-center justify-center px-4 py-2 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 hover:border-muted-gold/30 transition-all group"
          >
            <svg
              class="h-5 w-5 text-warm-beige group-hover:text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.21-1.23 3.91-1.12 1.34.08 2.53.82 3.34 1.97-2.84 1.74-2.4 5.51.56 6.87-.67 1.73-1.6 3.49-2.89 4.51zm-5.22-17.9c.67-.83 1.14-1.99.95-3.14-1.02.05-2.22.68-2.92 1.5-.64.76-1.2 1.96-1.04 3.1 1.14.09 2.3-.64 3.01-1.46z" />
            </svg>
          </button>

          <button
            onClick={() => handleSocialLogin("github")}
            class="flex items-center justify-center px-4 py-2 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 hover:border-muted-gold/30 transition-all group"
          >
            <svg
              class="h-5 w-5 text-warm-beige group-hover:text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div class="mt-6 text-center">
        <a
          href={type === "login" ? "/signup" : "/login"}
          class="text-sm text-muted-gold hover:text-light-gold transition-colors underline decoration-muted-gold/30 hover:decoration-muted-gold"
        >
          {type === "login"
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"}
        </a>
      </div>
    </div>
  );
}
