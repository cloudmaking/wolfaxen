import { Handlers } from "$fresh/server.ts";

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeFPC47yWY58pLCgq0mdvZ3bDRHHtGh6DDCTA7mXDg_SSLlYg/formResponse";
const FBZX_VALUE = "8932295165997508957"; // Keep existing, might need update if strict
const _DLUT_VALUE = "1764462421770"; // Keep existing for future use

const _CONTROL_FIELDS = {
  fvv: "1",
  pageHistory: "0",
  fbzx: FBZX_VALUE,
  submissionTimestamp: "-1",
  continue: "1",
};

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  donationId?: string;
}

function formatPayload(body: Partial<ContactPayload>) {
  return new URLSearchParams({
    "entry.1455405538": (body.name ?? "").trim(), // Name
    "entry.1612667603": (body.email ?? "").trim(), // Email
    "entry.610310285": (body.subject ?? "").trim(), // Subject
    "entry.1755670710": (body.message ?? "").trim(), // Message
    // Donation ID seems missing in new form link, omitting or keeping if unsure.
    // User didn't provide it in the link, but code handles it.
    // Let's assume it's not in the new form for now or use the old ID if it exists?
    // User only gave 4 IDs. I will comment out donation for now to avoid errors.
    // "entry.63465402": (body.donationId ?? "").trim(),
  });
}

async function parseBody(req: Request): Promise<ContactPayload> {
  const contentType = req.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const json = await req.json();
    return {
      name: json.name ?? "",
      email: json.email ?? "",
      subject: json.subject ?? "",
      message: json.message ?? "",
      donationId: json.donationId ?? "",
    };
  }

  if (contentType.includes("application/x-www-form-urlencoded")) {
    const form = await req.formData();
    return {
      name: form.get("name")?.toString() ?? "",
      email: form.get("email")?.toString() ?? "",
      subject: form.get("subject")?.toString() ?? "",
      message: form.get("problem")?.toString() ?? "",
      donationId: form.get("donationId")?.toString() ?? "",
    };
  }

  throw new Error("Unsupported content type");
}

export const handler: Handlers = {
  async POST(req) {
    try {
      const body = await parseBody(req);

      const params = formatPayload({
        name: body.name,
        subject: body.subject,
        message: body.message,
        email: body.email,
        donationId: body.donationId,
      });

      const response = await fetch(FORM_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: params.toString(),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Google Form error", response.status, text.slice(0, 200));
        return new Response(
          JSON.stringify({ success: false, error: "Submit failed" }),
          {
            status: 502,
            headers: { "content-type": "application/json" },
          },
        );
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { "content-type": "application/json" },
      });
    } catch (error) {
      console.error("Contact proxy error", error);
      return new Response(
        JSON.stringify({ success: false, error: "Invalid payload" }),
        {
          status: 400,
          headers: { "content-type": "application/json" },
        },
      );
    }
  },
};
