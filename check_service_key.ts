import "https://deno.land/std@0.208.0/dotenv/load.ts";

const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
console.log("SUPABASE_SERVICE_ROLE_KEY present:", !!key);
if (key) console.log("Key length:", key.length);
