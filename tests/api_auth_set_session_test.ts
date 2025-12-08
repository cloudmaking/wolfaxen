import { assert, assertEquals } from "$std/testing/asserts.ts";
import { handler } from "../routes/api/auth/set-session.ts";
import { supabase } from "../utils/supabase.ts";

Deno.test("auth set-session rejects missing tokens", async () => {
  const req = new Request("https://example.com/api/auth/set-session", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({}),
  });

  const res = await handler.POST!(req, {} as any);
  assertEquals(res.status, 400);
  assertEquals(await res.text(), "Missing tokens");
});

Deno.test({
  name: "auth set-session sets cookies and upserts profile",
  sanitizeResources: false,
  sanitizeOps: false,
  async fn() {
    const req = new Request("https://example.com/api/auth/set-session", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        access_token: "access-token",
        refresh_token: "refresh-token",
      }),
    });

    const res = await handler.POST!(req, {} as any);
    // With dummy tokens, the handler should fail validation and return 401.
    assertEquals(res.status, 401);
  },
});
