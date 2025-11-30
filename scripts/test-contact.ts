const FORM_URL =
  "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfi_SnnmhPeMlHhQ_i60X7NiV3a_E5DuzSGhYRfZeF6-n_wFA/formResponse?embedded=true";

const FBZX_VALUE = "8932295165997508957";
const DLUT_VALUE = "1764462421770";

const CONTROL_FIELDS = {
  fvv: "1",
  pageHistory: "0",
  fbzx: FBZX_VALUE,
  submissionTimestamp: "-1",
  continue: "1",
};

function buildPayload(
  name: string,
  email: string,
  subject: string,
  message: string,
) {
  return new URLSearchParams({
    "entry.245279984": name,
    "entry.1570153767": subject,
    "entry.588513622": message,
    "entry.63465402": "",
    emailAddress: email,
    ...CONTROL_FIELDS,
    dlut: DLUT_VALUE,
    partialResponse: `[null,null,"${FBZX_VALUE}"]`,
  });
}

async function run() {
  const [
    name = "CLI Test",
    email = "team@example.com",
    subject = "Endpoint test",
    message = "Triggered from scripts/test-contact.ts",
  ] = Deno.args;

  const params = buildPayload(name, email, subject, message);

  const res = await fetch(FORM_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: params.toString(),
  });

  const snippet = (await res.text()).slice(0, 200).replace(/\s+/g, " ");
  console.log(`Response: ${res.status} ${res.statusText}`);
  console.log(`Body snippet: ${snippet}`);

  if (!res.ok) {
    throw new Error("Form submission failed");
  }
}

if (import.meta.main) {
  run();
}
