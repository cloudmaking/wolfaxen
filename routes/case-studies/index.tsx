import { Head } from "$fresh/runtime.ts";
import AnimatedButton from "../../islands/AnimatedButton.tsx";

export default function CaseStudies() {
  return (
    <>
      <Head>
        <title>Case Studies | Wolfaxen</title>
        <meta
          name="description"
          content="See how Wolfaxen has helped businesses transform their operations with AI automation, process mapping, and systems integration."
        />
      </Head>
      <div class="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h1 class="text-4xl md:text-6xl font-display font-bold mb-6 text-warm-beige">
            Case Studies
          </h1>
          <p class="text-xl text-warm-beige/70 max-w-3xl mx-auto">
            Real results from real projects. See how we solve complex business
            problems.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Case Study 1 */}
          <div class="group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-muted-gold/30 transition-all duration-500">
            <div class="absolute inset-0 bg-gradient-to-br from-muted-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            </div>
            <div class="p-8 relative z-10">
              <div class="text-sm text-muted-gold font-bold uppercase tracking-wider mb-2">
                Internal Tool
              </div>
              <h2 class="text-2xl font-display font-bold mb-4 text-warm-beige group-hover:text-light-gold transition-colors">
                Wolfaxen Internal AI Chatbot
              </h2>
              <p class="text-warm-beige/70 mb-6 leading-relaxed">
                We built a custom AI agent to handle initial client inquiries
                and qualify leads on our own website. This reduced response time
                to under 5 seconds and increased qualified lead capture.
              </p>
              <div class="flex flex-wrap gap-2 mb-6">
                <span class="px-3 py-1 bg-black/30 rounded-full text-xs border border-white/10">
                  AI Agents
                </span>
                <span class="px-3 py-1 bg-black/30 rounded-full text-xs border border-white/10">
                  Automation
                </span>
                <span class="px-3 py-1 bg-black/30 rounded-full text-xs border border-white/10">
                  Deno Fresh
                </span>
              </div>
              {/* Placeholder for link if we had a detailed page */}
              {/* <span class="text-muted-gold font-bold group-hover:underline">Read Case Study →</span> */}
            </div>
          </div>

          {/* Case Study 2 */}
          <div class="group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-deep-olive/30 transition-all duration-500">
            <div class="absolute inset-0 bg-gradient-to-br from-deep-olive/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            </div>
            <div class="p-8 relative z-10">
              <div class="text-sm text-deep-olive font-bold uppercase tracking-wider mb-2">
                Financial Services
              </div>
              <h2 class="text-2xl font-display font-bold mb-4 text-warm-beige group-hover:text-light-gold transition-colors">
                Budget Calculator & PDF Generator
              </h2>
              <p class="text-warm-beige/70 mb-6 leading-relaxed">
                Developed a complex, client-side budget calculator with
                real-time PDF generation. Replaced a manual spreadsheet process,
                allowing clients to self-serve and generate professional reports
                instantly.
              </p>
              <div class="flex flex-wrap gap-2 mb-6">
                <span class="px-3 py-1 bg-black/30 rounded-full text-xs border border-white/10">
                  Web App
                </span>
                <span class="px-3 py-1 bg-black/30 rounded-full text-xs border border-white/10">
                  PDF Generation
                </span>
                <span class="px-3 py-1 bg-black/30 rounded-full text-xs border border-white/10">
                  React/Preact
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-20 text-center">
          <p class="text-warm-beige/60 mb-6">
            More case studies coming soon.
          </p>
          <AnimatedButton href="/contactus" variant="outline">
            Become our next success story
          </AnimatedButton>
        </div>
      </div>
    </>
  );
}
