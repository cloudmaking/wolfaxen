import { JSX } from "preact";
import { useState } from "preact/hooks";
import Button from "../components/Button.tsx";

export default function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data["entry.1455405538"],
          email: data["entry.1612667603"],
          subject: data["entry.610310285"],
          message: data["entry.1755670710"],
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMessage(
          result.error || "Something went wrong. Please try again.",
        );
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
      setErrorMessage("Network error. Please check your connection.");
    }
  };

  if (status === "success") {
    return (
      <div class="text-center py-16 px-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md animate-fade-in">
        <div class="w-16 h-16 bg-muted-gold/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-muted-gold/30">
          <svg
            class="w-8 h-8 text-muted-gold"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 class="text-2xl font-display font-bold text-warm-beige mb-4">
          Message Sent
        </h3>
        <p class="text-warm-beige/70 mb-8 max-w-md mx-auto">
          Thanks for reaching out. We've received your message and will get back
          to you shortly.
        </p>
        <Button
          variant="outline"
          onClick={() => setStatus("idle")}
          className="min-w-[150px]"
        >
          Send Another
        </Button>
      </div>
    );
  }

  return (
    <form
      class="space-y-6 relative z-10"
      onSubmit={handleSubmit}
    >
      {status === "error" && (
        <div class="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm text-center">
          {errorMessage}
        </div>
      )}
      <div>
        <label
          htmlFor="name"
          class="block text-sm font-medium text-warm-beige/80 mb-2"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="entry.1455405538"
          required
          class="w-full bg-oreo-black/50 border border-white/10 rounded-xl px-4 py-4 text-warm-beige focus:outline-none focus:border-muted-gold focus:ring-1 focus:ring-muted-gold transition-all placeholder-white/20"
          placeholder="Your name"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          class="block text-sm font-medium text-warm-beige/80 mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="entry.1612667603"
          required
          class="w-full bg-oreo-black/50 border border-white/10 rounded-xl px-4 py-4 text-warm-beige focus:outline-none focus:border-muted-gold focus:ring-1 focus:ring-muted-gold transition-all placeholder-white/20"
          placeholder="you@company.com"
        />
      </div>
      <div>
        <label
          htmlFor="subject"
          class="block text-sm font-medium text-warm-beige/80 mb-2"
        >
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="entry.610310285"
          required
          class="w-full bg-oreo-black/50 border border-white/10 rounded-xl px-4 py-4 text-warm-beige focus:outline-none focus:border-muted-gold focus:ring-1 focus:ring-muted-gold transition-all placeholder-white/20"
          placeholder="Project or topic"
        />
      </div>
      <div>
        <label
          htmlFor="problem"
          class="block text-sm font-medium text-warm-beige/80 mb-2"
        >
          How can we help?
        </label>
        <textarea
          id="problem"
          name="entry.1755670710"
          rows={4}
          required
          class="w-full bg-oreo-black/50 border border-white/10 rounded-xl px-4 py-4 text-warm-beige focus:outline-none focus:border-muted-gold focus:ring-1 focus:ring-muted-gold transition-all placeholder-white/20"
          placeholder="Tell us about your process challenges..."
        >
        </textarea>
      </div>
      <div class="space-y-3">
        <Button
          type="submit"
          variant="primary"
          disabled={status === "submitting"}
          className="w-full py-4 text-lg shadow-lg shadow-muted-gold/20"
        >
          {status === "submitting" ? "Sending..." : "Send Message"}
        </Button>
      </div>
    </form>
  );
}
