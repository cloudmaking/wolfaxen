import { GoogleGenerativeAI } from "npm:@google/generative-ai";
import "https://deno.land/std@0.208.0/dotenv/load.ts";

const apiKey = Deno.env.get("GEMINI_API_KEY");

if (!apiKey) {
  console.error("No GEMINI_API_KEY found in environment");
  Deno.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function testModel(modelName: string) {
  console.log(`Testing model: ${modelName}...`);
  try {
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent("Hello, are you working?");
    const response = await result.response;
    console.log(`✅ ${modelName} Success! Response: ${response.text()}`);
    return true;
  } catch (error) {
    console.error(`❌ ${modelName} Failed:`, error.message);
    return false;
  }
}

async function main() {
  console.log("Fetching available models via REST API...");
  const url =
    `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.models) {
      console.log("Available Models:");
      data.models.forEach((m: any) => {
        if (m.supportedGenerationMethods.includes("generateContent")) {
          console.log(`- ${m.name} (Supports generateContent)`);
        }
      });
    } else {
      console.error("Failed to list models:", data);
    }
  } catch (error) {
    console.error("Network error listing models:", error);
  }
}

main();
