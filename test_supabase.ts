import { createClient } from "npm:@supabase/supabase-js";

// Load env vars
const supabaseUrl = Deno.env.get("SUPABASE_URL");
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ||
  Deno.env.get("SUPABASE_ANON_KEY");

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase credentials missing");
  Deno.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSupabaseInsert() {
  console.log("Testing Supabase Insert for Unqualified Leads...");

  const testPayload = {
    source: "test_script",
    name: "Test User " + Date.now(),
    company: "Test Corp",
    email: "test_script_" + Date.now() + "@example.com",
    message: "This is a test message",
    transcript: "Test Transcript",
    summary: "Test Summary",
  };

  const { data, error } = await supabase
    .from("unqualified_leads")
    .insert([testPayload])
    .select();

  if (error) {
    console.error("❌ Insert Failed:", error);
    // Print RLS info hint
    console.log(
      "Hint: Check RLS policies. Guests (anon) might not have INSERT permission.",
    );
  } else {
    console.log("✅ Insert Successful:", data);
  }
}

testSupabaseInsert();
