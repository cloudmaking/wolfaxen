import { useState } from "preact/hooks";

interface Props {
  name?: string;
  email?: string;
  company?: string;
}

export default function ProfileForm(
  { name = "", email = "", company = "" }: Props,
) {
  const [form, setForm] = useState({ name, email, company });
  const [status, setStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");
  const [error, setError] = useState("");

  const onChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setStatus("idle");
    setError("");
  };

  const onSubmit = async (e: Event) => {
    e.preventDefault();
    setStatus("saving");
    setError("");
    try {
      const res = await fetch("/api/profile/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const message = await res.text();
        setError(message || "Update failed");
        setStatus("error");
        return;
      }
      setStatus("saved");
    } catch (err) {
      console.error(err);
      setError("Network error");
      setStatus("error");
    }
  };

  return (
    <form
      class="space-y-4"
      onSubmit={onSubmit}
    >
      <div class="space-y-2">
        <label class="text-sm text-gray-400">Name</label>
        <input
          class="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-muted-gold"
          value={form.name}
          onInput={(e) => onChange("name", (e.target as HTMLInputElement).value)}
          placeholder="Your name"
        />
      </div>
      <div class="space-y-2">
        <label class="text-sm text-gray-400">Company</label>
        <input
          class="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-muted-gold"
          value={form.company}
          onInput={(e) =>
            onChange("company", (e.target as HTMLInputElement).value)}
          placeholder="Company"
        />
      </div>
      <div class="space-y-2">
        <label class="text-sm text-gray-400">Email</label>
        <input
          type="email"
          class="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-muted-gold"
          value={form.email}
          onInput={(e) => onChange("email", (e.target as HTMLInputElement).value)}
          placeholder="you@example.com"
        />
      </div>
      {error && (
        <div class="text-sm text-oxide-red bg-oxide-red/10 border border-oxide-red/30 rounded-lg px-3 py-2">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={status === "saving"}
        class="w-full bg-muted-gold hover:bg-light-gold text-oreo-black font-semibold py-2.5 rounded-lg transition disabled:opacity-60"
      >
        {status === "saving"
          ? "Saving..."
          : status === "saved"
          ? "Saved!"
          : "Save Profile"}
      </button>
      <p class="text-xs text-gray-500">
        Email changes will trigger Supabase auth email update for your account.
      </p>
    </form>
  );
}
