import { createClient } from "npm:@supabase/supabase-js@2.39.3";

const isServer = typeof Deno !== "undefined";

const supabaseUrl = isServer
  ? Deno.env.get("SUPABASE_URL")!
  : (window as any).SUPABASE_URL;

const supabaseAnonKey = isServer
  ? Deno.env.get("SUPABASE_ANON_KEY")!
  : (window as any).SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase credentials missing. Ensure SUPABASE_URL and SUPABASE_ANON_KEY are set.",
  );
}

export const supabase = createClient(supabaseUrl || "", supabaseAnonKey || "");
