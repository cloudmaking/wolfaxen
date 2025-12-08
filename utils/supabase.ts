import { createClient } from "@supabase/supabase-js";

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase credentials missing. Ensure SUPABASE_URL and SUPABASE_ANON_KEY are set.",
  );
}

const overrideClient = (globalThis as unknown as {
  __supabaseClientOverride?: ReturnType<typeof createClient>;
}).__supabaseClientOverride;

export const supabase = overrideClient ?? createClient(
  supabaseUrl,
  supabaseAnonKey,
  { auth: { persistSession: false } },
);
