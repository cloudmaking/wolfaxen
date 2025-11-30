import CircuitBoard from "../islands/CircuitBoard.tsx";
import ScrollReveal from "../islands/ScrollReveal.tsx";
import MagneticCard from "../islands/MagneticCard.tsx";
import StaggeredGrid from "../islands/StaggeredGrid.tsx";

const HIGHLIGHTS = [
  {
    title: "Hands-on delivery",
    copy:
      "Every engagement runs directly through Ali—no anonymous delivery team or hand-offs.",
  },
  {
    title: "Open systems",
    copy:
      "Process maps, automations, and AI are delivered with documentation and zero lock-in.",
  },
  {
    title: "Proof-first",
    copy:
      "Engagements centre around measurable process wins: clearer ownership, less manual effort.",
  },
];

const PHILOSOPHY_POINTS = [
  {
    heading: "Own every component",
    copy:
      "Architecture diagrams, SOPs, and repo access are standard. If we build it, you can maintain it.",
  },
  {
    heading: "Solve the right problem",
    copy:
      "Discovery starts by mapping the current reality so automation reinforces good practice instead of masking chaos.",
  },
  {
    heading: "Ship fast, document faster",
    copy:
      "Short build cycles paired with loom walk-throughs and admin handovers so teams run without babysitting.",
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
              Built on engineering, integrity, and transparency
            </p>
            <h1 class="text-4xl md:text-6xl font-display font-bold text-warm-beige mb-6 leading-tight relative">
              Systems that companies can understand, trust, and operate.
            </h1>
            <p class="text-lg md:text-xl text-warm-beige/70 leading-relaxed">
              Wolfaxen is a lean systems practice led by Ali Raza. We map,
              automate, and instrument operations for leaders who are tired of
              duct-tape processes and shadow IT.
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
                A builder’s perspective, not an agency wrapper.
              </h3>
              <p class="text-warm-beige/80 text-lg leading-relaxed mb-8">
                When you hire Wolfaxen you work directly with the engineer who
                scopes, builds, automates, and documents the system. No layers,
                no vague account updates.
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
                        Wolfaxen is currently a one-person operation. When you
                        hire Wolfaxen, you hire Ali directly—full attention,
                        full accountability.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </MagneticCard>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
