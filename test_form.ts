const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeFPC47yWY58pLCgq0mdvZ3bDRHHtGh6DDCTA7mXDg_SSLlYg/formResponse";

const params = new URLSearchParams();
params.append("entry.1455405538", "Test Name"); // Name
params.append("entry.1612667603", "test@example.com"); // Email
params.append("entry.610310285", "Test Subject"); // Subject
params.append("entry.1755670710", "Test Message"); // Message

console.log("Submitting to:", FORM_URL);
console.log("Params:", params.toString());

const res = await fetch(FORM_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: params,
});

console.log("Status:", res.status);
const text = await res.text();
const titleMatch = text.match(/<title>(.*?)<\/title>/);
console.log("Page Title:", titleMatch ? titleMatch[1] : "No title found");

if (text.includes("Your response has been recorded")) {
  console.log("SUCCESS: Submission confirmed!");
} else {
  console.log("FAILURE: Success message not found.");
  console.log("Response dump:", text.slice(0, 1000)); // Debug first 1000 chars
}
