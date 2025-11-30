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
import VoiceAssistant from "../islands/VoiceAssistant.tsx";
import Sheen from "../components/Sheen.tsx";

const SERVICE_CARDS = [
  {
    title: "Process Mapping",
    copy:
      "Visualise the entire operation, spot bottlenecks, and rebuild flows with clear ownership.",
    icon: "🗺️",
    accent: "bg-muted-gold/10 group-hover:bg-muted-gold/20",
    border: "hover:border-muted-gold/30",
  },
  {
    title: "Automation",
    copy:
      "Connect SaaS tools and APIs so data moves without duct tape or endless Zapier hacks.",
    icon: "⚡",
    accent: "bg-deep-olive/20 group-hover:bg-deep-olive/30",
    border: "hover:border-deep-olive/40",
  },
  {
    title: "AI Solutions",
    copy:
      "Deploy practical AI agents for support, ops, and enablement on top of your own knowledge.",
    icon: "🤖",
    accent: "bg-oxide-red/20 group-hover:bg-oxide-red/30",
    border: "hover:border-oxide-red/40",
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
                AI Automation Consultancy • Process Optimisation • Systems
                Integration
              </span>
            </div>
            <div class="mb-8">
              <h1 class="sr-only">
                Wolfaxen - AI Automation and Process Optimisation Consultancy
              </h1>
              <span class="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight leading-tight text-warm-beige block animate-fade-in">
                Wolfaxen is an AI Automation
              </span>
              <span class="block text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-muted-gold via-light-gold to-muted-gold animate-gradient-x">
                & Process Consultancy
              </span>
              <p class="text-xl md:text-2xl text-warm-beige/80 max-w-3xl mx-auto mt-8 leading-relaxed block animate-fade-in delay-100">
                We build custom AI chatbots, integrate business systems, and
                automate workflows.
              </p>
            </div>
            <p class="text-lg md:text-xl text-warm-beige/60 max-w-2xl mx-auto mb-12 leading-relaxed">
              Stop drowning in admin. We map processes end-to-end and build
              software that gives you your time back.
              <span class="block mt-2 text-muted-gold">
                No bloat. No agencies. Just code that works.
              </span>
            </p>
            <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <AnimatedButton href="/contactus" variant="primary">
                Book a Discovery Call
              </AnimatedButton>
              <AnimatedButton href="/services" variant="outline">
                View Services
              </AnimatedButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* AI Voice Interface Section */}
      <section
        id="consultant"
        class="py-24 bg-white/5 relative overflow-hidden"
      >
        <div class="absolute inset-0 bg-gradient-to-b from-oreo-black via-deep-olive/5 to-oreo-black pointer-events-none">
        </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 class="text-3xl lg:text-4xl font-display font-bold text-warm-beige mb-6">
                Tell us about your process challenges.
              </h2>
              <p class="text-lg text-warm-beige/60 mb-8 leading-relaxed">
                Skip the long forms. Our AI consultant, Flow, is ready to
                interview you. It will analyze your spoken responses to
                understand your operational structure and bottlenecks
                immediately.
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
                      Speak naturally as if you were talking to a human
                      consultant.
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
                      The AI automatically structures your inputs into a formal
                      inquiry.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="relative">
              <VoiceAssistant />
              <div class="absolute -inset-4 bg-gradient-to-r from-muted-gold/20 to-deep-olive/20 rounded-3xl opacity-30 blur-xl -z-10">
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview (What We Do) */}
      <section class="py-32 relative">
        <div class="absolute inset-0 bg-gradient-to-b from-oreo-black via-deep-olive/5 to-oreo-black">
        </div>

        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-20">
            <h2 class="text-3xl md:text-4xl font-display font-bold text-warm-beige mb-6">
              What We Build
            </h2>
            <p class="text-warm-beige/60 max-w-2xl mx-auto text-lg">
              Replace manual spreadsheets and disjointed tools with unified
              systems.
            </p>
          </div>

          <StaggeredGrid className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICE_CARDS.map((card) => (
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

      {/* How We Work Section */}
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
                How We Work
              </h2>
              <p class="text-warm-beige/60 max-w-2xl mx-auto text-lg">
                A clear, proven process that turns chaos into clarity
              </p>
            </div>
          </ScrollReveal>
          <StaggeredGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                  Understanding
                </h3>
                <p class="text-warm-beige/70 text-sm leading-relaxed group-hover:text-warm-beige/90 transition-colors">
                  We map your existing processes, gather requirements, and
                  identify whether the goal is efficiency, automation, or a full
                  rebuild.
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
                  Designing
                </h3>
                <p class="text-warm-beige/70 text-sm leading-relaxed group-hover:text-warm-beige/90 transition-colors">
                  We propose a solution architecture—selecting the right tools
                  (No-Code vs Code) and designing the data flow.
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
                  Building
                </h3>
                <p class="text-warm-beige/70 text-sm leading-relaxed group-hover:text-warm-beige/90 transition-colors">
                  We implement the system, connect the APIs, build the
                  automations, and test rigorously.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div class="group relative p-6 rounded-2xl border border-white/10 bg-oreo-black/50 backdrop-blur-sm h-full hover:border-muted-gold/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-20px_rgba(185,176,123,0.2)] overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-br from-muted-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              </div>
              <div class="text-5xl font-bold text-white/5 absolute top-4 right-4 group-hover:text-white/10 transition-colors">
                04
              </div>
              <div class="relative z-10">
                <div class="w-10 h-10 bg-muted-gold/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <ProcessNode />
                </div>
                <h3 class="text-xl font-bold text-light-gold mb-4 group-hover:text-muted-gold transition-colors">
                  Support
                </h3>
                <p class="text-warm-beige/70 text-sm leading-relaxed group-hover:text-warm-beige/90 transition-colors">
                  We hand over the keys with full documentation, training, and a
                  warranty period.
                </p>
              </div>
            </div>
          </StaggeredGrid>
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
            <p class="text-sm uppercase tracking-[0.4em] text-muted-gold mb-4">
              Let's rebuild the way your team works
            </p>
            <h2 class="text-3xl md:text-5xl font-display font-bold text-warm-beige mb-6">
              Ready for a process audit?
            </h2>
            <p class="text-warm-beige/70 text-lg mb-10">
              Show us what feels broken. We'll map it, fix it, and document
              every part so you own the system going forward.
            </p>
            <div class="flex flex-col sm:flex-row gap-6 justify-center">
              <AnimatedButton
                href="/contactus"
                variant="primary"
              >
                Start Your Inquiry
              </AnimatedButton>
              <AnimatedButton
                href="/pricing"
                variant="outline"
              >
                See Pricing
              </AnimatedButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
