import MagneticButton from "../islands/MagneticButton.tsx";
import ParticleField from "../islands/ParticleField.tsx";
import DecodeText from "../islands/DecodeText.tsx";
import NeuralGrid from "../islands/NeuralGrid.tsx";
import ScrollReveal from "../islands/ScrollReveal.tsx";
import StaggeredGrid from "../islands/StaggeredGrid.tsx";
import CircuitBoard from "../islands/CircuitBoard.tsx";
import ProcessNode from "../islands/ProcessNode.tsx";
import MagneticCard from "../islands/MagneticCard.tsx";
import GlowingBorder from "../islands/GlowingBorder.tsx";
import Sheen from "../components/Sheen.tsx";

const PROJECT_RANGES = [
  {
    title: "Process Mapping",
    price: "£350 – £1,200",
    description: "End-to-end mapping, efficiency analysis, and blueprinting.",
    icon: "🗺️",
    accent: "bg-muted-gold/10 group-hover:bg-muted-gold/20",
    border: "hover:border-muted-gold/40",
  },
  {
    title: "Automation Setup",
    price: "£500 – £4,000",
    description: "Zapier/n8n flows, API integrations, and background workers.",
    icon: "⚡",
    accent: "bg-deep-olive/10 group-hover:bg-deep-olive/20",
    border: "hover:border-deep-olive/40",
  },
  {
    title: "AI Chatbot (RAG)",
    price: "£700 – £3,000",
    description:
      "Custom chatbots trained on your data. No monthly token markups.",
    icon: "🤖",
    accent: "bg-oxide-red/10 group-hover:bg-oxide-red/20",
    border: "hover:border-oxide-red/40",
  },
  {
    title: "Systems Integration",
    price: "£800 – £5,000",
    description: "Connecting CRMs, payment gateways, and internal tools.",
    icon: "🔗",
    accent: "bg-muted-gold/10 group-hover:bg-muted-gold/20",
    border: "hover:border-muted-gold/40",
  },
  {
    title: "Custom Web App",
    price: "£1,000 – £8,000",
    description: "Modern, fast web applications built on Deno/Fresh.",
    icon: "💻",
    accent: "bg-deep-olive/10 group-hover:bg-deep-olive/20",
    border: "hover:border-deep-olive/40",
  },
  {
    title: "Migrations",
    price: "£800 – £6,000",
    description: "Workspace data migrations (Google, Microsoft, etc.).",
    icon: "📦",
    accent: "bg-oxide-red/10 group-hover:bg-oxide-red/20",
    border: "hover:border-oxide-red/40",
  },
];

export default function Pricing() {
  return (
    <div class="py-20 relative overflow-hidden">
      {/* Background Animated Effects */}
      <div class="fixed inset-0 z-0">
        <ParticleField />
      </div>
      <div class="absolute inset-0 z-0 opacity-20">
        <NeuralGrid />
      </div>

      {/* Gradient Glows */}
      <div class="absolute top-[-10%] left-1/2 transform -translate-x-1/2 w-[60%] h-[60%] bg-muted-gold/10 blur-[120px] rounded-full pointer-events-none animate-pulse-slow">
      </div>
      <div class="absolute bottom-[30%] right-[10%] w-[40%] h-[40%] bg-deep-olive/10 blur-[120px] rounded-full pointer-events-none">
      </div>

      {/* Hero Section */}
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20 relative z-10">
        <ScrollReveal>
          <div class="inline-block mb-6 px-4 py-1.5 rounded-full border border-muted-gold/30 bg-muted-gold/10 backdrop-blur-md">
            <span class="text-muted-gold text-sm font-medium tracking-wider uppercase">
              Transparent Pricing • No Hidden Fees
            </span>
          </div>
          <div class="mb-8">
            <DecodeText
              text="Pricing Overview"
              scramble
              className="text-4xl md:text-6xl font-display font-bold text-warm-beige block"
            />
          </div>
          <p class="text-xl text-warm-beige/60 max-w-2xl mx-auto">
            Wolfaxen works on project-based quotes, tailored to your needs.
            <br />
            <span class="text-muted-gold">
              No long-term commitments, no forced subscriptions.
            </span>
          </p>
        </ScrollReveal>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Project Ranges */}
        <div class="mb-24">
          <ScrollReveal>
            <h2 class="text-2xl font-display font-bold text-warm-beige mb-10 text-center">
              Typical Project Ranges
            </h2>
          </ScrollReveal>
          <StaggeredGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECT_RANGES.map((project) => (
              <MagneticCard key={project.title} intensity={20}>
                <div
                  class={`h-full group bg-white/5 border border-white/10 ${project.border} rounded-2xl p-6 hover:bg-white/[0.07] transition-all duration-500 relative overflow-hidden`}
                >
                  {/* Animated accent background */}
                  <div
                    class={`absolute inset-0 ${project.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  >
                  </div>
                  <Sheen />

                  <div class="relative z-10">
                    <div class="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span class="text-2xl">{project.icon}</span>
                    </div>
                    <h3 class="text-lg font-bold text-light-gold mb-2 group-hover:text-muted-gold transition-colors">
                      {project.title}
                    </h3>
                    <p class="text-3xl font-bold text-white mb-4">
                      {project.price}
                    </p>
                    <p class="text-warm-beige/60 text-sm group-hover:text-warm-beige/80 transition-colors">
                      {project.description}
                    </p>
                  </div>
                </div>
              </MagneticCard>
            ))}
          </StaggeredGrid>
          <p class="text-center text-warm-beige/50 mt-8 text-sm">
            *These ranges are guides. After understanding your requirements, we
            give a fixed quote so you always know what you're paying.
          </p>
        </div>

        {/* Retainers */}
        <div class="mb-24">
          <ScrollReveal>
            <h2 class="text-2xl font-display font-bold text-warm-beige mb-10 text-center">
              Optional Retainers
            </h2>
          </ScrollReveal>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic */}
            <ScrollReveal delay={100}>
              <MagneticCard intensity={10}>
                <div class="h-full group bg-oreo-black border border-white/10 rounded-3xl p-8 flex flex-col hover:border-white/20 transition-all duration-500 relative overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  </div>
                  <Sheen />
                  <div class="relative z-10 h-full flex flex-col">
                    <div class="mb-4">
                      <h3 class="text-xl font-bold text-warm-beige">
                        Basic Retainer
                      </h3>
                      <p class="text-3xl font-bold text-white mt-4">
                        £150<span class="text-sm text-warm-beige/50 font-normal">
                          /month
                        </span>
                      </p>
                    </div>
                    <ul class="space-y-4 mb-8 flex-grow">
                      <li class="flex items-start gap-3 text-warm-beige/80 text-sm">
                        <ProcessNode /> Up to 3 small updates
                      </li>
                      <li class="flex items-start gap-3 text-warm-beige/80 text-sm">
                        <ProcessNode /> Priority response times
                      </li>
                    </ul>
                    <MagneticButton
                      href="/contactus"
                      variant="outline"
                      className="w-full"
                    >
                      Select Basic
                    </MagneticButton>
                  </div>
                </div>
              </MagneticCard>
            </ScrollReveal>

            {/* Growth - Recommended */}
            <ScrollReveal delay={200}>
              <MagneticCard intensity={25} glowColor="rgba(185, 176, 123, 0.3)">
                <GlowingBorder className="h-full rounded-3xl" color="#B9B07B">
                  <div class="h-full group bg-oreo-black border border-white/10 rounded-3xl p-8 flex flex-col hover:border-white/20 transition-all duration-500 relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    </div>
                    <Sheen />
                    {/* Badge */}
                    <div class="absolute top-6 right-6 bg-muted-gold text-oreo-black text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg animate-pulse-slow z-20">
                      Recommended
                    </div>

                    <div class="relative z-10 h-full flex flex-col">
                      <div class="mb-4">
                        <h3 class="text-xl font-bold text-warm-beige">
                          Growth Retainer
                        </h3>
                        <p class="text-3xl font-bold text-white mt-4">
                          £350<span class="text-sm text-warm-beige/50 font-normal">
                            /month
                          </span>
                        </p>
                      </div>
                      <ul class="space-y-4 mb-8 flex-grow">
                        <li class="flex items-start gap-3 text-warm-beige/80 text-sm">
                          <ProcessNode /> Regular optimisation
                        </li>
                        <li class="flex items-start gap-3 text-warm-beige/80 text-sm">
                          <ProcessNode /> Small feature add-ons
                        </li>
                        <li class="flex items-start gap-3 text-warm-beige/80 text-sm">
                          <ProcessNode /> Monthly analytics review
                        </li>
                      </ul>
                      <MagneticButton
                        href="/contactus"
                        variant="primary"
                        className="w-full"
                      >
                        Select Growth
                      </MagneticButton>
                    </div>
                  </div>
                </GlowingBorder>
              </MagneticCard>
            </ScrollReveal>

            {/* Technical Partner */}
            <ScrollReveal delay={300}>
              <MagneticCard intensity={10}>
                <div class="h-full group bg-oreo-black border border-white/10 rounded-3xl p-8 flex flex-col hover:border-white/20 transition-all duration-500 relative overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  </div>
                  <Sheen />
                  <div class="relative z-10 h-full flex flex-col">
                    <div class="mb-4">
                      <h3 class="text-xl font-bold text-warm-beige">
                        Technical Partner
                      </h3>
                      <p class="text-3xl font-bold text-white mt-4">
                        £650+<span class="text-sm text-warm-beige/50 font-normal">
                          /month
                        </span>
                      </p>
                    </div>
                    <ul class="space-y-4 mb-8 flex-grow">
                      <li class="flex items-start gap-3 text-warm-beige/80 text-sm">
                        <ProcessNode /> Continuous improvement
                      </li>
                      <li class="flex items-start gap-3 text-warm-beige/80 text-sm">
                        <ProcessNode /> Automation monitoring
                      </li>
                      <li class="flex items-start gap-3 text-warm-beige/80 text-sm">
                        <ProcessNode /> AI model maintenance
                      </li>
                      <li class="flex items-start gap-3 text-warm-beige/80 text-sm">
                        <ProcessNode /> Roadmapping + consulting
                      </li>
                    </ul>
                    <MagneticButton
                      href="/contactus"
                      variant="outline"
                      className="w-full"
                    >
                      Contact Us
                    </MagneticButton>
                  </div>
                </div>
              </MagneticCard>
            </ScrollReveal>
          </div>
        </div>

        {/* Pricing Philosophy Section */}
        <div class="mt-24 border-t border-white/5 pt-16 relative">
          {/* Circuit Board Background */}
          <div class="absolute inset-0 opacity-10 pointer-events-none">
            <CircuitBoard />
          </div>

          <ScrollReveal>
            <div class="text-center relative z-10">
              <h3 class="text-2xl font-display font-bold text-warm-beige mb-8">
                Our Pricing Philosophy
              </h3>
              <p class="text-xl text-warm-beige/80 max-w-3xl mx-auto mb-12">
                Fair, transparent, quote-based, and never exploitative.
              </p>
            </div>
          </ScrollReveal>

          <StaggeredGrid className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto relative z-10">
            <MagneticCard intensity={5}>
              <div class="group text-center p-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 relative overflow-hidden">
                <Sheen />
                <div class="w-12 h-12 bg-muted-gold/10 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                  <span class="text-2xl">🔓</span>
                </div>
                <h4 class="text-muted-gold font-bold mb-3">No Lock-in</h4>
                <p class="text-warm-beige/60 text-sm leading-relaxed">
                  You own everything we build. We don't hold your data or
                  systems hostage.
                </p>
              </div>
            </MagneticCard>
            <MagneticCard intensity={5}>
              <div class="group text-center p-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300">
                <div class="w-12 h-12 bg-deep-olive/10 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                  <span class="text-2xl">💎</span>
                </div>
                <h4 class="text-muted-gold font-bold mb-3">No Hidden Fees</h4>
                <p class="text-warm-beige/60 text-sm leading-relaxed">
                  What we quote is what you pay. No surprise "enterprise"
                  charges.
                </p>
              </div>
            </MagneticCard>
            <MagneticCard intensity={5}>
              <div class="group text-center p-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300">
                <div class="w-12 h-12 bg-oxide-red/10 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                  <span class="text-2xl">🎯</span>
                </div>
                <h4 class="text-muted-gold font-bold mb-3">
                  Optional Retainers
                </h4>
                <p class="text-warm-beige/60 text-sm leading-relaxed">
                  You only pay for what you need. Ongoing support is completely
                  optional.
                </p>
              </div>
            </MagneticCard>
          </StaggeredGrid>
        </div>
      </div>
    </div>
  );
}
