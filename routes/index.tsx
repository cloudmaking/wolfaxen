import ScrollReveal from "../islands/ScrollReveal.tsx";
import HeroAnimations from "../islands/HeroAnimations.tsx";
import AnimatedButton from "../islands/AnimatedButton.tsx";
import NeuralGrid from "../islands/NeuralGrid.tsx";
import StaggeredGrid from "../islands/StaggeredGrid.tsx";
import ParticleField from "../islands/ParticleField.tsx";
import CircuitBoard from "../islands/CircuitBoard.tsx";
import OrbitingNodes from "../islands/OrbitingNodes.tsx";
import ProcessNode from "../islands/ProcessNode.tsx";
import MagneticCard from "../islands/MagneticCard.tsx";
import ChatAssistant from "../islands/ChatAssistant.tsx";
import Sheen from "../components/Sheen.tsx";

const BENEFIT_CARDS = [
  {
    title: "Stop paying for busywork",
    copy:
      "Don't pay a human to do robot work. We automate the boring stuff so your team can do the real work.",
    icon: "💸",
    accent: "bg-muted-gold/10 group-hover:bg-muted-gold/20",
    border: "hover:border-muted-gold/30",
  },
  {
    title: "Remove human error",
    copy:
      "Manual processes break. Code doesn't. Get consistency in your data, onboarding and reporting.",
    icon: "🎯",
    accent: "bg-deep-olive/20 group-hover:bg-deep-olive/30",
    border: "hover:border-deep-olive/40",
  },
  {
    title: "Grow without hiring",
    copy:
      "Handle 10x the volume without adding headcount. Your systems should grow with you, not slow you down.",
    icon: "📈",
    accent: "bg-oxide-red/20 group-hover:bg-oxide-red/30",
    border: "hover:border-oxide-red/40",
  },
  {
    title: "See the full picture",
    copy:
      "You can't fix what you can't see. Our Process Mapper visualizes your entire workflow to spot hidden bottlenecks.",
    icon: "🗺️",
    accent: "bg-light-gold/10 group-hover:bg-light-gold/20",
    border: "hover:border-light-gold/30",
  },
  {
    title: "Own your data",
    copy:
      "Stop relying on scattered spreadsheets. We build unified systems where your data is secure and accessible.",
    icon: "🔒",
    accent: "bg-warm-beige/10 group-hover:bg-warm-beige/20",
    border: "hover:border-warm-beige/30",
  },
];

const SERVICES_LIST = [
  {
    title: "AI Agents & Automations",
    desc: "Custom chatbots, assistants, lead handlers, workflow automations.",
  },
  {
    title: "Process Mapping & Optimisation",
    desc: "AI-assisted mapping, bottleneck detection, performance insights.",
  },
  {
    title: "Systems & Infrastructure Administration",
    desc:
      "Device management, cloud infrastructure, compliance, onboarding flows.",
  },
  {
    title: "System Integrations & Migrations",
    desc: "Salesforce, payment platforms, booking systems, internal tools.",
  },
  {
    title: "Custom Web Tools & Internal Apps",
    desc:
      "Tailored systems for your operations, built quickly on modern frameworks.",
  },
  {
    title: "Consulting & Technical Strategy",
    desc: "Technical direction, architecture planning, and solution design.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section class="relative pt-32 pb-40 overflow-hidden">
        {/* Background Effects */}
        <div class="absolute inset-0 z-0">
          <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-oreo-black to-black opacity-90">
          </div>
          <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-muted-gold/10 blur-[120px] rounded-full pointer-events-none animate-pulse-slow">
          </div>
          <div class="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-deep-olive/10 blur-[150px] rounded-full pointer-events-none">
          </div>
          {/* Interactive Particle Field */}
          <ParticleField />
          {/* Anime.js Animations */}
          <HeroAnimations />
          <NeuralGrid />
        </div>

        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div class="inline-block mb-6 px-4 py-1.5 rounded-full border border-muted-gold/30 bg-muted-gold/10 backdrop-blur-md">
              <span class="text-muted-gold text-sm font-medium tracking-wider uppercase">
                AI • Process • Systems
              </span>
            </div>
            <div class="mb-8">
              <h1 class="sr-only">
                Wolfaxen - AI Automation and Process Optimisation Consultancy
              </h1>
              <span class="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight leading-tight text-warm-beige block animate-fade-in">
                Stop doing work <br />
                a robot could do.
              </span>
              <p class="text-xl md:text-2xl text-warm-beige/80 max-w-3xl mx-auto mt-8 leading-relaxed block animate-fade-in delay-100">
                We map your workflow. We find the waste. We build the
                automations to fix it.
              </p>
            </div>

            <div class="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
              <AnimatedButton disabled variant="primary">
                Map your process (Coming Soon)
              </AnimatedButton>
              <AnimatedButton href="/contactus" variant="outline">
                Book a consultation
              </AnimatedButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Process Mapper CTA Section */}
      <section class="py-24 bg-white/5 relative overflow-hidden border-y border-white/10">
        <div class="absolute inset-0 bg-gradient-to-r from-indigo-900/20 to-purple-900/20 pointer-events-none">
        </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 class="text-3xl lg:text-5xl font-display font-bold text-warm-beige mb-6">
            Where are you burning cash?
          </h2>
          <p class="text-xl text-warm-beige/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Tell us how you work. We'll map it. You'll see the waste.
          </p>

          <div class="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 max-w-3xl mx-auto mb-10">
            <div class="flex flex-col md:flex-row gap-4 items-center">
              <div class="flex-1 text-left">
                <div class="text-sm text-gray-400 mb-2">Example Input:</div>
                <div class="font-mono text-indigo-300 bg-indigo-900/20 p-3 rounded border border-indigo-500/30">
                  "When a lead comes in from the website, I copy it to Excel,
                  then I email them manually..."
                </div>
              </div>
              <div class="hidden md:block text-2xl text-gray-500">→</div>
              <div class="flex-1 text-left">
                <div class="text-sm text-gray-400 mb-2">We Generate:</div>
                <div class="flex items-center gap-2 text-green-400 bg-green-900/20 p-3 rounded border border-green-500/30">
                  <span class="text-xl">🗺️</span> Visual Map +{" "}
                  <span class="font-bold">Automation Plan</span>
                </div>
              </div>
            </div>
          </div>

          <AnimatedButton disabled variant="primary">
            Start Mapping Now (Coming Soon)
          </AnimatedButton>
        </div>
      </section>

      {/* AI Voice Interface Section */}
      <section
        id="consultant"
        class="py-24 relative overflow-hidden"
      >
        <div class="absolute inset-0 bg-gradient-to-b from-oreo-black via-deep-olive/5 to-oreo-black pointer-events-none">
        </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 class="text-3xl lg:text-4xl font-display font-bold text-warm-beige mb-6">
                Tell us about your growing pains.
              </h2>
              <p class="text-lg text-warm-beige/60 mb-8 leading-relaxed">
                No long forms. Just chat with Flow, our AI. It'll analyze your
                bottlenecks, and start mapping a solution.
              </p>

              <div class="space-y-6">
                <div class="flex gap-4">
                  <div class="flex-shrink-0 w-12 h-12 bg-muted-gold/10 rounded-lg flex items-center justify-center text-muted-gold border border-muted-gold/20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-bold text-warm-beige text-lg">
                      Natural Conversation
                    </h4>
                    <p class="text-warm-beige/60">
                      Chat naturally. Just like messaging a human consultant.
                    </p>
                  </div>
                </div>

                <div class="flex gap-4">
                  <div class="flex-shrink-0 w-12 h-12 bg-deep-olive/20 rounded-lg flex items-center justify-center text-light-gold border border-deep-olive/30">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-bold text-warm-beige text-lg">
                      Instant Capture
                    </h4>
                    <p class="text-warm-beige/60">
                      The AI automatically turns your inputs into a formal
                      inquiry.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="relative">
              <ChatAssistant />
              <div class="absolute -inset-4 bg-gradient-to-r from-muted-gold/20 to-deep-olive/20 rounded-3xl opacity-30 blur-xl -z-10">
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section (What We Solve) */}
      <section class="py-32 relative">
        <div class="absolute inset-0 bg-gradient-to-b from-oreo-black via-deep-olive/5 to-oreo-black">
        </div>

        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-20">
            <h2 class="text-3xl md:text-4xl font-display font-bold text-warm-beige mb-6">
              What We Solve
            </h2>
            <p class="text-warm-beige/60 max-w-2xl mx-auto text-lg">
              We don't just build software. We solve problems.
            </p>
          </div>

          <StaggeredGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {BENEFIT_CARDS.map((card) => (
              <MagneticCard key={card.title} intensity={15}>
                <div
                  class={`h-full group p-8 rounded-2xl bg-white/5 border border-white/10 ${card.border} transition-all duration-500 hover:shadow-[0_20px_40px_-20px_rgba(185,176,123,0.2)] relative overflow-hidden`}
                >
                  {/* Animated accent background on hover */}
                  <div
                    class={`absolute inset-0 ${card.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  >
                  </div>
                  <Sheen />

                  <div class="relative z-10">
                    <div
                      class={`w-12 h-12 ${card.accent} rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
                    >
                      <span class="text-2xl group-hover:scale-125 transition-transform duration-300">
                        {card.icon}
                      </span>
                    </div>
                    <h3 class="text-2xl font-display font-bold text-warm-beige mb-4 group-hover:text-muted-gold transition-colors">
                      {card.title}
                    </h3>
                    <p class="text-warm-beige/60 leading-relaxed group-hover:text-warm-beige/80 transition-colors">
                      {card.copy}
                    </p>
                  </div>
                </div>
              </MagneticCard>
            ))}
          </StaggeredGrid>
        </div>
      </section>

      {/* How Wolfaxen Works Section */}
      <section class="py-32 relative overflow-hidden bg-white/[0.02]">
        <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent">
        </div>
        <div class="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent">
        </div>

        {/* Orbiting Nodes Visualization */}
        <div class="absolute inset-0 opacity-20 pointer-events-none">
          <OrbitingNodes />
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div class="text-center mb-20">
              <h2 class="text-3xl md:text-5xl font-display font-bold text-warm-beige mb-6">
                How Wolfaxen Works
              </h2>
            </div>
          </ScrollReveal>
          <StaggeredGrid className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div class="group relative p-6 rounded-2xl border border-white/10 bg-oreo-black/50 backdrop-blur-sm h-full hover:border-muted-gold/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-20px_rgba(185,176,123,0.2)] overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-br from-muted-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              </div>
              <div class="text-5xl font-bold text-white/5 absolute top-4 right-4 group-hover:text-white/10 transition-colors">
                01
              </div>
              <div class="relative z-10">
                <div class="w-10 h-10 bg-muted-gold/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <ProcessNode />
                </div>
                <h3 class="text-xl font-bold text-light-gold mb-4 group-hover:text-muted-gold transition-colors">
                  We map it
                </h3>
                <p class="text-warm-beige/70 text-sm leading-relaxed group-hover:text-warm-beige/90 transition-colors">
                  Use our AI process mapper to see how work actually flows in
                  your business.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div class="group relative p-6 rounded-2xl border border-white/10 bg-oreo-black/50 backdrop-blur-sm h-full hover:border-deep-olive/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-20px_rgba(100,130,100,0.2)] overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-br from-deep-olive/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              </div>
              <div class="text-5xl font-bold text-white/5 absolute top-4 right-4 group-hover:text-white/10 transition-colors">
                02
              </div>
              <div class="relative z-10">
                <div class="w-10 h-10 bg-deep-olive/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <ProcessNode />
                </div>
                <h3 class="text-xl font-bold text-light-gold mb-4 group-hover:text-muted-gold transition-colors">
                  We find the gaps
                </h3>
                <p class="text-warm-beige/70 text-sm leading-relaxed group-hover:text-warm-beige/90 transition-colors">
                  We analyse your map and highlight where automation or
                  integration will have the biggest impact.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div class="group relative p-6 rounded-2xl border border-white/10 bg-oreo-black/50 backdrop-blur-sm h-full hover:border-oxide-red/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-20px_rgba(180,100,80,0.2)] overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-br from-oxide-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              </div>
              <div class="text-5xl font-bold text-white/5 absolute top-4 right-4 group-hover:text-white/10 transition-colors">
                03
              </div>
              <div class="relative z-10">
                <div class="w-10 h-10 bg-oxide-red/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <ProcessNode />
                </div>
                <h3 class="text-xl font-bold text-light-gold mb-4 group-hover:text-muted-gold transition-colors">
                  We build the fix
                </h3>
                <p class="text-warm-beige/70 text-sm leading-relaxed group-hover:text-warm-beige/90 transition-colors">
                  From AI chatbots to workflow automations, we build exactly
                  what your business needs.
                </p>
              </div>
            </div>
          </StaggeredGrid>
        </div>
      </section>

      {/* Services Overview */}
      <section class="py-24 relative bg-black/40">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-display font-bold text-warm-beige mb-6">
              Services Overview
            </h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_LIST.map((service, idx) => (
              service.title === "Systems & Infrastructure Administration"
                ? (
                  <a
                    key={idx}
                    href="/services/system-administration"
                    class="block p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors group"
                  >
                    <h3 class="text-lg font-bold text-muted-gold mb-2 group-hover:text-light-gold transition-colors">
                      {service.title}
                    </h3>
                    <p class="text-warm-beige/60 text-sm">{service.desc}</p>
                  </a>
                )
                : (
                  <div
                    key={idx}
                    class="p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
                  >
                    <h3 class="text-lg font-bold text-muted-gold mb-2">
                      {service.title}
                    </h3>
                    <p class="text-warm-beige/60 text-sm">{service.desc}</p>
                  </div>
                )
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals Section */}
      <section class="py-20 relative border-t border-white/5">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-2xl md:text-3xl font-display font-bold text-warm-beige mb-8">
            We build systems that save time.
          </h2>
          <p class="text-warm-beige/60 mb-12">
            Here are some recent projects across IT, operations and automation.
          </p>
          <AnimatedButton href="/about" variant="outline">
            View Case Studies
          </AnimatedButton>
        </div>
      </section>

      {/* CTA Section */}
      <section class="py-28 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-b from-oreo-black via-transparent to-oreo-black pointer-events-none z-10">
        </div>
        <div class="absolute inset-0 opacity-30">
          <CircuitBoard />
        </div>
        <div class="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="bg-black/60 border border-white/10 rounded-3xl px-8 py-12 text-center shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur-sm">
            <h2 class="text-3xl md:text-5xl font-display font-bold text-warm-beige mb-6">
              Ready to stop the busywork?
            </h2>
            <p class="text-warm-beige/70 text-lg mb-10">
              Book a free call — or speak to our AI assistant right now.
            </p>
            <div class="flex flex-col sm:flex-row gap-6 justify-center">
              <AnimatedButton
                href="/contactus"
                variant="primary"
              >
                Book a free call
              </AnimatedButton>
              <AnimatedButton
                href="#consultant"
                variant="outline"
              >
                Chat with AI Assistant
              </AnimatedButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
