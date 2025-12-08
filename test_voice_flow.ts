import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import "https://deno.land/std@0.208.0/dotenv/load.ts";

const supabaseUrl = Deno.env.get("SUPABASE_URL") ||
  "https://qlcsibdhbxiavckqemjl.supabase.co";
const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY");

if (!supabaseKey) {
  console.error("SUPABASE_ANON_KEY is missing from environment!");
  Deno.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeFPC47yWY58pLCgq0mdvZ3bDRHHtGh6DDCTA7mXDg_SSLlYg/formResponse";

const GOOGLE_FORM_FIELDS = {
  name: "entry.1455405538",
  email: "entry.1612667603",
  subject: "entry.610310285",
  message: "entry.1755670710",
};

async function testVoiceSubmission() {
  console.log("=== Testing Voice AI Submission Flow ===");

  const testPayload = {
    source: "voice_ai_test_script",
    name: "VoiceTest User",
    email: `voicetest_${Date.now()}@example.com`,
    message: "This is a test submission from the verification script.",
    transcript: "User: Hello. AI: Hi. User: Need test.",
    summary: "User needs a test.",
    company: "TestCorp",
  };

  console.log("Payload:", testPayload);

  // 1. Insert into Supabase unqualified_leads (Guest Flow)
  console.log("\n1. Inserting into Supabase 'unqualified_leads'...");
  const { data: lead, error } = await supabase
    .from("unqualified_leads")
    .insert({
      user_id: null,
      source: testPayload.source,
      name: testPayload.name,
      email: testPayload.email,
      message: testPayload.message,
      transcript: testPayload.transcript,
      summary: testPayload.summary,
    });

  if (error) {
    console.error("❌ Supabase Insert FAILED:", error);
  } else {
    console.log("✅ Supabase Insert SUCCESS:", lead);
  }

  // 1.5 Test Magic Link Trigger (Optional - just verifying API call doesn't crash)
  // We won't actually wait for email, just checking the call.
  // NOTE: This might fail if the user doesn't exist and Auto-Confirm is off, or if allow_signup is false.
  /*
  console.log("\n1.5 Triggering Magic Link...");
  // Using signInWithOtp directly
  // Note: 'origin' header imitation isn't needed for the API call itself, just the redirect URL
  const { error: authError } = await supabase.auth.signInWithOtp({
    email: testPayload.email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: "http://localhost:8000/auth/callback",
    },
  });

  if (authError) {
    console.warn("⚠️ Magic Link Trigger FAILED (Expected if Auth configured strictly):", authError.message);
  } else {
    console.log("✅ Magic Link Trigger SENT (Check email logs if possible).");
  }
  */

  // 2. Submit to Google Forms
  console.log("\n2. Submitting to Google Form...");
  const googleParams = new URLSearchParams();
  if (testPayload.name) {
    googleParams.append(GOOGLE_FORM_FIELDS.name, testPayload.name);
  }
  if (testPayload.email) {
    googleParams.append(GOOGLE_FORM_FIELDS.email, testPayload.email);
  }
  const subject = `${testPayload.company} (${testPayload.source})`;
  googleParams.append(GOOGLE_FORM_FIELDS.subject, subject);
  googleParams.append(GOOGLE_FORM_FIELDS.message, testPayload.message);

  try {
    const googleResponse = await fetch(GOOGLE_FORM_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: googleParams.toString(),
    });

    if (googleResponse.ok) {
      console.log("✅ Google Form Submission SUCCESS (Stats 200)");
    } else {
      // Google Forms often returns opacity/redirect, but 200 means received.
      // It might redirect to a thank you page. fetch might follow redirect.
      console.log(`ℹ️ Google Form Response Status: ${googleResponse.status}`);
      // If status is 200 or 3xx, it's likely fine.
    }
  } catch (e) {
    console.error("❌ Google Form Submission FAILED:", e);
  }

  console.log("\n=== Test Complete ===");
}

testVoiceSubmission();
