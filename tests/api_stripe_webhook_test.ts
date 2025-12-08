import { assertEquals } from "$std/testing/asserts.ts";

Deno.test({
  name: "stripe webhook requires signature header",
  sanitizeResources: false,
  sanitizeOps: false,
  async fn() {
    Deno.env.set("SUPABASE_SERVICE_ROLE_KEY", "dummy_service_key");
    Deno.env.set("SUPABASE_URL", "https://example.supabase.co");
    Deno.env.set("STRIPE_SECRET_KEY", "sk_test_dummy");
    Deno.env.set("STRIPE_WEBHOOK_SECRET", "whsec_dummy");

    const { handler } = await import("../routes/api/stripe-webhook.ts");

    const req = new Request("https://example.com/api/stripe-webhook", {
      method: "POST",
      body: "{}", // body content irrelevant for this branch
    });

    const res = await handler.POST!(req, {} as any);
    assertEquals(res.status, 400);
    assertEquals(await res.text(), "No signature");
  },
});
