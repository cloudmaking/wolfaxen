import Button from "../components/Button.tsx";
import AnimatedButton from "../islands/AnimatedButton.tsx";
import ProcessNode from "../islands/ProcessNode.tsx";
import ScrollReveal from "../islands/ScrollReveal.tsx";
import StaggeredGrid from "../islands/StaggeredGrid.tsx";
import WireframeBlueprint from "../islands/WireframeBlueprint.tsx";
import DataFlowPipeline from "../islands/DataFlowPipeline.tsx";
import OrbitingNodes from "../islands/OrbitingNodes.tsx";
import FloatingWidgets from "../islands/FloatingWidgets.tsx";
import TerminalTyping from "../islands/TerminalTyping.tsx";
import PixelRobot from "../islands/PixelRobot.tsx";
import ParticleField from "../islands/ParticleField.tsx";

export default function Services() {
  return (
    <div class="py-20 relative overflow-hidden">
      {/* Background Particle Field */}
      <div class="fixed inset-0 z-0">
        <ParticleField />
      </div>

      {/* Background Effects */}
      <div class="absolute top-0 right-0 w-[50%] h-[50%] bg-deep-olive/10 blur-[150px] rounded-full pointer-events-none">
      </div>
      <div class="absolute bottom-0 left-0 w-[50%] h-[50%] bg-oxide-red/10 blur-[150px] rounded-full pointer-events-none">
      </div>

      {/* Header */}
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 text-center relative z-10">
        <ScrollReveal>
          <p class="text-sm uppercase tracking-[0.4em] text-muted-gold mb-5">
            Services
          </p>
          <h1 class="text-4xl md:text-6xl font-display font-bold text-warm-beige mb-6">
            What We Do
          </h1>
          <p class="text-xl text-warm-beige/60 max-w-2xl mx-auto">
            We don't sell hours. We build systems. We map your reality and
            rebuild it for scale.
          </p>
        </ScrollReveal>
      </div>

      {/* Process Mapping & Workflow Design */}
      <section id="mapping" class="py-20 border-t border-white/5 relative z-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <div class="w-16 h-16 bg-muted-gold/10 rounded-2xl flex items-center justify-center mb-8 border border-muted-gold/20">
                  <span class="text-3xl">🗺️</span>
                </div>
                <h2 class="text-3xl font-display font-bold text-warm-beige mb-6">
                  Process Mapping & Workflow Design
                </h2>
                <p class="text-warm-beige/70 mb-8 leading-relaxed text-lg">
                  We see how your business actually works—every step, every
                  bottleneck. Then we turn it into a visual system you can
                  actually use.
                </p>
                <h3 class="text-xl font-bold text-light-gold mb-4">
                  Deliverables:
                </h3>
                <StaggeredGrid className="space-y-4 mb-10">
                  <div class="flex items-center gap-4 text-warm-beige/80">
                    <ProcessNode /> End-to-end process maps
                  </div>
                  <div class="flex items-center gap-4 text-warm-beige/80">
                    <ProcessNode /> Efficiency audit (finding the waste)
                  </div>
                  <div class="flex items-center gap-4 text-warm-beige/80">
                    <ProcessNode /> Standard Operating Procedures (SOPs)
                  </div>
                </StaggeredGrid>
                <AnimatedButton
                  href="/services/process-mapping"
                  variant="outline"
                >
                  Start Mapping
                </AnimatedButton>
              </div>
              <div class="relative h-[400px] bg-black/40 rounded-3xl border border-white/10 overflow-hidden group backdrop-blur-sm">
                <div class="absolute inset-0 bg-gradient-to-br from-muted-gold/5 to-transparent">
                </div>
                <WireframeBlueprint />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Automation & Systems Engineering */}
      <section
        id="automation"
        class="py-20 border-t border-white/5 relative z-10"
      >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center md:flex-row-reverse">
              <div class="order-2 md:order-1 relative h-[400px] bg-black/40 rounded-3xl border border-white/10 overflow-hidden backdrop-blur-sm">
                <div class="absolute inset-0 bg-gradient-to-bl from-deep-olive/10 to-transparent">
                </div>
                <DataFlowPipeline />
              </div>
              <div class="order-1 md:order-2">
                <div class="w-16 h-16 bg-deep-olive/20 rounded-2xl flex items-center justify-center mb-8 border border-deep-olive/30">
                  <span class="text-3xl">⚡</span>
                </div>
                <h2 class="text-3xl font-display font-bold text-warm-beige mb-6">
                  Automation & Systems Engineering
                </h2>
                <p class="text-warm-beige/70 mb-8 leading-relaxed text-lg">
                  We connect your tools. Data flows automatically. No more
                  copy-pasting. No more "I forgot".
                </p>
                <h3 class="text-xl font-bold text-light-gold mb-4">
                  Common Use Cases:
                </h3>
                <StaggeredGrid className="space-y-4 mb-10">
                  <div class="flex items-center gap-4 text-warm-beige/80">
                    <ProcessNode /> Lead capture to CRM sync
                  </div>
                  <div class="flex items-center gap-4 text-warm-beige/80">
                    <ProcessNode /> Automated invoicing & follow-ups
                  </div>
                  <div class="flex items-center gap-4 text-warm-beige/80">
                    <ProcessNode /> Project onboarding workflows
                  </div>
                </StaggeredGrid>
                <AnimatedButton
                  href="/services/salesforce-automation"
                  variant="outline"
                >
                  Automate Now
                </AnimatedButton>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* AI Solutions */}
      <section id="ai" class="py-20 border-t border-white/5 relative z-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <div class="w-16 h-16 bg-oxide-red/20 rounded-2xl flex items-center justify-center mb-8 border border-oxide-red/30">
                  <span class="text-3xl">🤖</span>
                </div>
                <h2 class="text-3xl font-display font-bold text-warm-beige mb-6">
                  AI Solutions
                </h2>
                <p class="text-warm-beige/70 mb-8 leading-relaxed text-lg">
                  Real AI. No hype. We build agents that read your docs, answer
                  your customers, and do the work.
                </p>
                <h3 class="text-xl font-bold text-light-gold mb-4">
                  Capabilities:
                </h3>
                <StaggeredGrid className="space-y-4 mb-10">
                  <div class="flex items-center gap-4 text-warm-beige/80">
                    <ProcessNode /> Custom Chatbots (trained on your data)
                  </div>
                  <div class="flex items-center gap-4 text-warm-beige/80">
                    <ProcessNode /> Document Analysis & Extraction
                  </div>
                  <div class="flex items-center gap-4 text-warm-beige/80">
                    <ProcessNode /> Intelligent Email Triage
                  </div>
                </StaggeredGrid>
                <AnimatedButton href="/services/ai-chatbots" variant="outline">
                  Deploy AI
                </AnimatedButton>
              </div>
              <div class="relative h-[400px] bg-black/40 rounded-3xl border border-white/10 overflow-hidden backdrop-blur-sm">
                <div class="absolute inset-0 bg-gradient-to-br from-oxide-red/10 to-transparent">
                </div>
                <OrbitingNodes />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Systems Integration */}
      <section
        id="integration"
        class="py-20 border-t border-white/5 relative z-10"
      >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div class="order-1 md:order-2">
                <div class="w-16 h-16 bg-muted-gold/10 rounded-2xl flex items-center justify-center mb-8 border border-muted-gold/20">
                  <svg
                    class="w-8 h-8 text-muted-gold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h2 class="text-3xl font-display font-bold text-warm-beige mb-6">
                  Systems Integration
                </h2>
                <p class="text-warm-beige/70 mb-8 leading-relaxed text-lg">
                  We link your platforms. CRM, finance, projects. Everything in
                  sync. No more double entry.
                </p>
                <h3 class="text-xl font-bold text-light-gold mb-4">
                  Typical Use Cases:
                </h3>
                <StaggeredGrid className="space-y-4 mb-10">
                  <div class="flex items-start gap-4 text-warm-beige/80">
                    <span class="text-light-gold mt-1">✓</span>{" "}
                    Salesforce CRM ↔ site ↔ email ↔ calendar
                  </div>
                  <div class="flex items-start gap-4 text-warm-beige/80">
                    <span class="text-light-gold mt-1">✓</span>{" "}
                    Microsoft 365 or Google Workspace migrations
                  </div>
                  <div class="flex items-start gap-4 text-warm-beige/80">
                    <span class="text-light-gold mt-1">✓</span>{" "}
                    Finance stack + payment gateways
                  </div>
                  <div class="flex items-start gap-4 text-warm-beige/80">
                    <span class="text-light-gold mt-1">✓</span>{" "}
                    Executive dashboards stitched from internal data
                  </div>
                </StaggeredGrid>
                <AnimatedButton
                  href="/services/systems-integration"
                  variant="outline"
                >
                  Integrate My Stack
                </AnimatedButton>
              </div>
              <div class="order-2 md:order-1 relative h-[400px] bg-black/40 rounded-3xl border border-white/10 overflow-hidden backdrop-blur-sm">
                <FloatingWidgets />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Web Development */}
      <section id="webdev" class="py-20 border-t border-white/5 relative z-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <div class="w-16 h-16 bg-deep-olive/20 rounded-2xl flex items-center justify-center mb-8 border border-deep-olive/30">
                <svg
                  class="w-8 h-8 text-light-gold"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <h2 class="text-3xl font-display font-bold text-warm-beige mb-6">
                Web Development & Hosting
              </h2>
              <p class="text-warm-beige/70 mb-8 leading-relaxed text-lg">
                Modern web apps for real business needs. Fast. Clean. Built to
                last.
              </p>
              <h3 class="text-xl font-bold text-light-gold mb-4">
                Tech Stack:
              </h3>
              <ul class="space-y-4 mb-10">
                <li class="flex items-start gap-4 text-warm-beige/80">
                  <span class="text-terra-cotta mt-1">✓</span>{" "}
                  Deno / Typescript / Fresh
                </li>
                <li class="flex items-start gap-4 text-warm-beige/80">
                  <span class="text-terra-cotta mt-1">✓</span>{" "}
                  Supabase & Secure backend APIs
                </li>
                <li class="flex items-start gap-4 text-warm-beige/80">
                  <span class="text-terra-cotta mt-1">✓</span>{" "}
                  Static + interactive sites
                </li>
              </ul>
              <Button href="/contactus" variant="outline">
                Start Building
              </Button>
            </div>
            <div class="relative h-[400px] bg-black/40 rounded-3xl border border-white/10 overflow-hidden backdrop-blur-sm">
              <TerminalTyping />
            </div>
          </div>
        </div>
      </section>

      {/* System Administration */}
      <section
        id="sysadmin"
        class="py-20 border-t border-white/5 relative z-10"
      >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center md:flex-row-reverse">
              <div class="order-2 md:order-1 relative h-[400px] bg-black/40 rounded-3xl border border-white/10 overflow-hidden backdrop-blur-sm">
                <div class="absolute inset-0 bg-gradient-to-bl from-muted-gold/10 to-transparent">
                </div>
                {/* Reusing CircuitBoard or similar tech visual */}
                <div class="absolute inset-0 opacity-50">
                  <DataFlowPipeline />
                </div>
              </div>
              <div class="order-1 md:order-2">
                <div class="w-16 h-16 bg-muted-gold/20 rounded-2xl flex items-center justify-center mb-8 border border-muted-gold/30">
                  <span class="text-3xl">🛡️</span>
                </div>
                <h2 class="text-3xl font-display font-bold text-warm-beige mb-6">
                  System Administration
                </h2>
                <p class="text-warm-beige/70 mb-8 leading-relaxed text-lg">
                  We manage your devices and security. You don't have to worry
                  about it.
                </p>
                <h3 class="text-xl font-bold text-light-gold mb-4">
                  We Handle:
                </h3>
                <StaggeredGrid className="space-y-4 mb-10">
                  <div class="flex items-center gap-4 text-warm-beige/80">
                    <ProcessNode /> Device Management (MDM / Intune)
                  </div>
                  <div class="flex items-center gap-4 text-warm-beige/80">
                    <ProcessNode /> User Onboarding & Offboarding
                  </div>
                  <div class="flex items-center gap-4 text-warm-beige/80">
                    <ProcessNode /> Security & Compliance Audits
                  </div>
                </StaggeredGrid>
                <AnimatedButton
                  href="/services/system-administration"
                  variant="outline"
                >
                  View Details
                </AnimatedButton>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Fun Robot Section */}
      <section class="py-20 border-t border-white/5 relative z-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div class="text-center mb-12">
              <h2 class="text-3xl font-display font-bold text-warm-beige mb-4">
                Meet your new assistant
              </h2>
              <p class="text-warm-beige/60 max-w-xl mx-auto">
                Our systems work 24/7 to keep your business running.
              </p>
            </div>
            <div class="relative h-[300px] bg-black/40 rounded-3xl border border-white/10 overflow-hidden backdrop-blur-sm max-w-md mx-auto">
              <div class="absolute inset-0 bg-gradient-to-br from-muted-gold/5 via-transparent to-deep-olive/5">
              </div>
              <PixelRobot />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
