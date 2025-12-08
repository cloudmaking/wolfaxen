import CircuitBoard from "../islands/CircuitBoard.tsx";
import ScrollReveal from "../islands/ScrollReveal.tsx";
import MagneticCard from "../islands/MagneticCard.tsx";
import StaggeredGrid from "../islands/StaggeredGrid.tsx";

const HIGHLIGHTS = [
  {
    title: "Hands-on delivery",
    copy: "You work with Ali. No middle managers. No hand-offs.",
  },
  {
    title: "Open systems",
    copy: "We give you the keys. Documentation, code, everything. No lock-in.",
  },
  {
    title: "Proof-first",
    copy: "We focus on one thing: measurable wins. Less work, more ownership.",
  },
];

const PHILOSOPHY_POINTS = [
  {
    heading: "Own every component",
    copy:
      "You get the blueprints. Diagrams, SOPs, repo access. If we build it, you can run it.",
  },
  {
    heading: "Solve the right problem",
    copy: "We map reality first. Automation should fix chaos, not hide it.",
  },
  {
    heading: "Ship fast, document faster",
    copy:
      "Fast builds. Video guides. Complete handovers. Your team runs it without us.",
  },
];

export default function About() {
  return (
    <div class="relative overflow-hidden pt-32 pb-28">
      <div class="absolute inset-0 bg-gradient-to-b from-black via-oreo-black to-black opacity-90">
      </div>
      <div class="absolute top-0 left-0 w-[45%] h-[45%] bg-muted-gold/10 blur-[160px]">
      </div>
      <div class="absolute bottom-0 right-0 w-[45%] h-[45%] bg-oxide-red/10 blur-[180px]">
      </div>

      <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        <ScrollReveal>
          <div class="text-center max-w-4xl mx-auto">
            <p class="text-sm uppercase tracking-[0.4em] text-muted-gold mb-5">
              Built on engineering, integrity and transparency
            </p>
            <h1 class="text-4xl md:text-6xl font-display font-bold text-warm-beige mb-6 leading-tight relative">
              Systems you can actually understand.
            </h1>
            <p class="text-lg md:text-xl text-warm-beige/70 leading-relaxed">
              Wolfaxen is a systems practice led by Ali Raza. We fix operations
              for leaders tired of duct-tape solutions.
            </p>
          </div>
        </ScrollReveal>

        <div class="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
          <ScrollReveal className="order-2 lg:order-1">
            <div class="bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-md shadow-[0_30px_60px_-40px_rgba(0,0,0,0.9)]">
              <h2 class="text-3xl font-display text-warm-beige mb-8">
                The Operating System Behind Wolfaxen
              </h2>
              <StaggeredGrid className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {HIGHLIGHTS.map((item) => (
                  <MagneticCard key={item.title} intensity={10}>
                    <div class="h-full rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition-colors duration-300">
                      <p class="text-xs uppercase tracking-[0.3em] text-muted-gold mb-2">
                        {item.title}
                      </p>
                      <p class="text-warm-beige/80 text-sm leading-relaxed">
                        {item.copy}
                      </p>
                    </div>
                  </MagneticCard>
                ))}
              </StaggeredGrid>
            </div>
          </ScrollReveal>

          <ScrollReveal className="order-1 lg:order-2">
            <MagneticCard intensity={20}>
              <div class="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur h-full">
                <CircuitBoard />
              </div>
            </MagneticCard>
          </ScrollReveal>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ScrollReveal>
            <div class="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-md h-full">
              <p class="text-sm uppercase tracking-[0.4em] text-muted-gold mb-4">
                Philosophy
              </p>
              <h3 class="text-3xl font-display font-bold text-warm-beige mb-6">
                A builder, not an agency.
              </h3>
              <p class="text-warm-beige/80 text-lg leading-relaxed mb-8">
                You hire the engineer, not the sales guy. I scope it, I build
                it, I document it.
              </p>
              <div class="space-y-6">
                {PHILOSOPHY_POINTS.map((point) => (
                  <div class="flex gap-4 group" key={point.heading}>
                    <div class="h-10 w-10 rounded-full bg-muted-gold/15 border border-muted-gold/30 flex items-center justify-center text-muted-gold text-sm font-semibold group-hover:scale-110 group-hover:bg-muted-gold/30 transition-all duration-300">
                      ●
                    </div>
                    <div>
                      <p class="text-warm-beige font-semibold group-hover:text-light-gold transition-colors">
                        {point.heading}
                      </p>
                      <p class="text-warm-beige/70">{point.copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <MagneticCard intensity={15}>
              <div class="h-full bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden group hover:border-muted-gold/30 transition-colors duration-500">
                <div class="absolute top-0 right-0 w-32 h-32 bg-muted-gold/10 blur-[50px] rounded-full pointer-events-none">
                </div>

                <div class="flex flex-col md:flex-row gap-8 items-start relative z-10">
                  <div class="flex-shrink-0 mx-auto md:mx-0 relative">
                    <div class="absolute inset-0 bg-muted-gold/20 blur-xl rounded-full">
                    </div>
                    <img
                      src="/founder-avatar.webp"
                      alt="Ali Raza - Founder"
                      class="w-32 h-32 rounded-2xl border-2 border-muted-gold/50 shadow-lg relative z-10 transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <p class="mb-4 text-warm-beige">
                      <strong class="text-light-gold">Ali Raza</strong>{" "}
                      is a systems engineer and automation specialist with a
                      first-class honors degree and a track record with
                      organisations like Active Travel Group and Waltham Forest
                      College.
                    </p>
                    <p class="mb-6 text-warm-beige/80">
                      He focuses on measurable outcomes: reducing manual
                      workload, removing bottlenecks, and building workflows
                      teams can trust. Expertise spans Microsoft 365,
                      Salesforce, AI tooling, and project delivery.
                    </p>
                    <div class="bg-deep-olive/20 border-l-4 border-muted-gold p-5 rounded-r-xl group-hover:bg-deep-olive/30 transition-colors duration-300">
                      <p class="text-sm text-warm-beige/60 italic">
                        <strong class="text-muted-gold not-italic">
                          Transparency Note:
                        </strong>{" "}
                        Wolfaxen is just me, Ali. You get my full attention and
                        full accountability.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </MagneticCard>
          </ScrollReveal>
        </div>

        <div class="pt-20">
          <ScrollReveal>
            <div class="text-center mb-16">
              <p class="text-sm uppercase tracking-[0.4em] text-muted-gold mb-4">
                Track Record
              </p>
              <h2 class="text-3xl md:text-5xl font-display font-bold text-warm-beige mb-6">
                Recent Case Studies
              </h2>
              <p class="text-xl text-warm-beige/70 max-w-3xl mx-auto">
                Real results. Real projects.
              </p>
            </div>
          </ScrollReveal>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                category: "IT Infrastructure Project",
                title:
                  "Microsoft Intune Autopilot Rollout & Device Modernisation",
                subtitle: "Modern Endpoint Management & Compliance Overhaul",
                description:
                  "We moved 500+ unmanaged laptops to a modern, secure setup using Microsoft Intune. New devices now ship directly to staff, turn on, and set themselves up. No manual work required.",
                result:
                  "Near-zero onboarding time, Cyber Essentials compliance, and a fully standardised IT estate.",
                tags: [
                  "Intune",
                  "Autopilot",
                  "IT Infrastructure",
                  "Compliance",
                ],
                accent: "muted-gold",
                border: "hover:border-muted-gold/30",
                bgGradient: "from-muted-gold/5",
              },
              {
                category: "Salesforce Project",
                title: "Salesforce Automation Audit & Flow Migration",
                subtitle: "Legacy Workflow Cleanup & Modern Flow Architecture",
                description:
                  "We cleaned up the client’s Salesforce setup. We killed the useless rules and moved everything to modern Flows. It's faster, cleaner, and easier to manage.",
                result:
                  "Faster platform performance and a cleaner, future-proof automation layer.",
                tags: [
                  "Salesforce",
                  "Automation",
                  "Flow Builder",
                  "Org Optimisation",
                ],
                accent: "deep-olive",
                border: "hover:border-deep-olive/30",
                bgGradient: "from-deep-olive/5",
              },
              {
                category: "System Integration",
                title: "Custom Payment Link Generator (Salesforce Integration)",
                subtitle: "Real-Time Payment Links Directly Inside Salesforce",
                description:
                  "We built a button in Salesforce. One click generates a secure payment link. Staff love it, and it saves hours of admin.",
                result:
                  "Faster payment turnaround and a measurable reduction in admin time.",
                tags: [
                  "Salesforce",
                  "API Integration",
                  "Payments",
                  "Automation",
                ],
                accent: "oxide-red",
                border: "hover:border-oxide-red/30",
                bgGradient: "from-oxide-red/5",
              },
              {
                category: "Communications Automation",
                title: "Automated Client Service Emails",
                subtitle: "Intelligent Customer Assignment & Welcome Emails",
                description:
                  "We built a system that automatically picks the best agent for each booking and introduces them to the client. No more manual emails.",
                result:
                  "Fully automated client introductions and significant workload reduction for the service team.",
                tags: ["Email Automation", "Salesforce", "Efficiency"],
                accent: "light-gold",
                border: "hover:border-light-gold/30",
                bgGradient: "from-light-gold/5",
              },
              {
                category: "AI & Automation Project",
                title: "AI Voice Chatbot for 24/7 Lead Handling",
                subtitle:
                  "Always-Available Customer Engagement & Automated Booking Intake",
                description:
                  "We replaced a 9-5 live chat with a 24/7 AI voice bot. It talks to customers, understands what they need, and books the lead. It just works.",
                result:
                  "A fully autonomous, 24/7 enquiry-capturing assistant that increased qualified leads, removed dependency on live agents, and provided customers with immediate, accurate responses at any time.",
                tags: [
                  "AI",
                  "Automation",
                  "Voice Chatbot",
                  "Lead Handling",
                  "Customer Experience",
                ],
                accent: "muted-gold",
                border: "hover:border-muted-gold/30",
                bgGradient: "from-muted-gold/5",
              },
              {
                category: "Web Tools & Automation",
                title:
                  "Lightweight CMS for Book Catalogue & Dynamic QR Pricing",
                subtitle:
                  "Custom Micro-CMS Built on Google Sheets for Instant Price Updates",
                description:
                  "We built a simple system where the client manages book prices in a Google Sheet. The website updates instantly. Simple, effective, and zero maintenance.",
                result:
                  "Instant price updates, simplified content management, and a flexible, long-lasting system powered entirely by a Google Sheet.",
                tags: [
                  "CMS",
                  "Automation",
                  "Low-Code",
                  "Web Tools",
                  "Google Sheets Integration",
                ],
                accent: "deep-olive",
                border: "hover:border-deep-olive/30",
                bgGradient: "from-deep-olive/5",
              },
            ].map((study, index) => (
              <ScrollReveal key={index}>
                <div
                  class={`group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 ${study.border} transition-all duration-500 h-full flex flex-col`}
                >
                  <div
                    class={`absolute inset-0 bg-gradient-to-br ${study.bgGradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  >
                  </div>
                  <div class="p-8 relative z-10 flex flex-col h-full">
                    <div
                      class={`text-sm text-${study.accent} font-bold uppercase tracking-wider mb-2`}
                    >
                      {study.category}
                    </div>
                    <h3 class="text-2xl font-display font-bold mb-2 text-warm-beige group-hover:text-light-gold transition-colors">
                      {study.title}
                    </h3>
                    <h4 class="text-lg text-warm-beige/80 mb-4 font-medium">
                      {study.subtitle}
                    </h4>
                    <p class="text-warm-beige/70 mb-6 leading-relaxed flex-grow">
                      {study.description}
                    </p>
                    <div class="mb-6 p-4 bg-black/20 rounded-lg border border-white/5">
                      <span class="text-sm font-bold text-muted-gold block mb-1">
                        Result:
                      </span>
                      <span class="text-sm text-warm-beige/90">
                        {study.result}
                      </span>
                    </div>
                    <div class="flex flex-wrap gap-2 mt-auto">
                      {study.tags.map((tag) => (
                        <span
                          key={tag}
                          class="px-3 py-1 bg-black/30 rounded-full text-xs border border-white/10 text-warm-beige/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
