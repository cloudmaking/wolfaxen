import { assertEquals } from "$std/testing/asserts.ts";
import { handler } from "../routes/api/contact.ts";

Deno.test("contact handler maps fields into Google Form payload", async () => {
  const fetchCalls: Array<{ url: unknown; init: RequestInit }> = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, init) => {
    fetchCalls.push({ url, init: init! });
    return new Response("", { status: 200 });
  };

  try {
    const req = new Request("https://example.com/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: "Alice",
        email: "alice@example.com",
        subject: "Subject line",
        message: "Hello from a test",
      }),
    });

    const res = await handler.POST!(req, {} as any);

    assertEquals(res.status, 200);
    assertEquals(fetchCalls.length, 1);
    const call = fetchCalls[0];
    const calledUrl = typeof call.url === "string"
      ? call.url
      : call.url instanceof URL
      ? call.url.toString()
      : String(call.url);
    assertEquals(
      calledUrl,
      "https://docs.google.com/forms/d/e/1FAIpQLSeFPC47yWY58pLCgq0mdvZ3bDRHHtGh6DDCTA7mXDg_SSLlYg/formResponse",
    );
    const params = new URLSearchParams(call.init.body as string);
    assertEquals(params.get("entry.1455405538"), "Alice");
    assertEquals(params.get("entry.1612667603"), "alice@example.com");
    assertEquals(params.get("entry.610310285"), "Subject line");
    assertEquals(params.get("entry.1755670710"), "Hello from a test");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
