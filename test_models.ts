import { GoogleGenerativeAI } from "npm:@google/generative-ai";

const apiKey = Deno.env.get("GEMINI_API_KEY");
if (!apiKey) {
  console.error("GEMINI_API_KEY not set");
  Deno.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
  try {
    console.log("Fetching available models...");
    // Note: listModels is not directly exposed on genAI instance in some versions,
    // but usually accessible via ModelManager or similar.
    // Let's try the standard way if available, or just test a known few.
    // Actually, the SDK headers might suggest it's `getGenerativeModel` directly.
    // There isn't a simple `listModels` in the JS SDK generic surface often,
    // but we can try to just instantiate and run a prompt on a few candidates.

    const candidates = [
      "gemini-2.0-flash-exp",
      "gemini-1.5-flash-latest",
      "gemini-1.5-flash",
    ];

    console.log("\n--- Testing Specific Models ---");
    for (const modelName of candidates) {
      try {
        console.log(`Testing model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Hello?");
        const response = await result.response;
        console.log(`✅ SUCCESS: ${modelName}`);
      } catch (e) {
        console.log(`❌ FAILED: ${modelName} - ${e.message.split("\n")[0]}`);
      }
    }

    console.log("\n--- Listing All Models via REST ---");
    try {
      const url =
        `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
      const resp = await fetch(url);
      const data = await resp.json();
      if (data.models) {
        console.log("Available Models:");
        data.models.forEach((m: any) => {
          if (m.supportedGenerationMethods?.includes("generateContent")) {
            console.log(`- ${m.name} (Supports generateContent)`);
          }
        });
      } else {
        console.log("No models returned or error:", data);
      }
    } catch (e) {
      console.error("REST List Error:", e);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

listModels();
