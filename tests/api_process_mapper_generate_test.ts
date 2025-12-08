import { assertEquals } from "$std/testing/asserts.ts";
import { handler } from "../routes/api/process-mapper/generate.ts";

Deno.test("process-mapper generate returns 401 without session", async () => {
  const req = new Request("https://example.com/api/process-mapper/generate", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ raw_input: "abc" }),
  });

  const res = await handler.POST!(req, { state: {} } as any);

  assertEquals(res.status, 401);
});

Deno.test("process-mapper generate requires input when no prior map", async () => {
  const supabaseStub = {
    from(table: string) {
      return {
        select() {
          return {
            eq() {
              return {
                async single() {
                  if (table === "profiles") {
                    return { data: { is_subscribed: false }, error: null };
                  }
                  if (table === "subscriptions") {
                    return {
                      data: { status: "free", free_generation_used: false },
                      error: null,
                    };
                  }
                  return { data: null, error: null };
                },
              };
            },
          };
        },
      };
    },
  };

  const req = new Request(
    "https://example.com/api/process-mapper/generate",
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({}),
    },
  );

  const res = await handler.POST!(req, {
    state: {
      session: { user: { id: "user-1" } },
      supabaseClient: supabaseStub,
    },
  } as any);

  assertEquals(res.status, 400);
  assertEquals(await res.text(), "Missing input");
});
