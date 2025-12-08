import { assert, assertEquals } from "$std/testing/asserts.ts";
import { authMiddleware } from "../middleware/auth.ts";

function createCtx() {
  let nextCalled = false;
  return {
    state: { session: null },
    async next() {
      nextCalled = true;
      return new Response("ok");
    },
    get nextWasCalled() {
      return nextCalled;
    },
  };
}

Deno.test("authMiddleware redirects to login when unauthenticated dashboard access", async () => {
  const originalFactory = (globalThis as any).__supabaseCreateClient;
  (globalThis as any).__supabaseCreateClient = () => ({
    auth: {
      // deno-lint-ignore require-await
      async setSession() {
        return { data: { session: null }, error: null };
      },
      // deno-lint-ignore require-await
      async getUser() {
        return { data: { user: null }, error: null };
      },
    },
  });

  const ctx = createCtx();
  const req = new Request("https://example.com/dashboard", {
    headers: new Headers(),
  });

  try {
    const res = await authMiddleware(req, ctx as any);

    assertEquals(res?.status, 303);
    assertEquals(res?.headers.get("Location"), "/login");
    assertEquals(ctx.nextWasCalled, false);
  } finally {
    (globalThis as any).__supabaseCreateClient = originalFactory;
  }
});

Deno.test("authMiddleware restores session from cookies and calls next", async () => {
  const originalFactory = (globalThis as any).__supabaseCreateClient;
  const stubSession = { user: { id: "user-1" } };
  (globalThis as any).__supabaseCreateClient = () => ({
    auth: {
      // deno-lint-ignore require-await
      async setSession() {
        return { data: { session: stubSession }, error: null };
      },
      // deno-lint-ignore require-await
      async getUser() {
        return { data: { user: stubSession.user }, error: null };
      },
    },
  });

  try {
    const ctx = createCtx();
    const headers = new Headers({
      "cookie": "supa_access_token=abc; supa_refresh_token=def",
    });
    const req = new Request("https://example.com/dashboard", { headers });

    const res = await authMiddleware(req, ctx as any);

    assert(res);
    assertEquals(await res.text(), "ok");
    assertEquals(ctx.state.session, stubSession);
    assertEquals(ctx.nextWasCalled, true);
  } finally {
    (globalThis as any).__supabaseCreateClient = originalFactory;
  }
});
