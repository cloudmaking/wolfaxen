import { Head } from "$fresh/runtime.ts";
import Button from "../../components/Button.tsx";

export default function ProcessMappingService() {
  return (
    <>
      <Head>
        <title>AI Process Mapping - Wolfaxen</title>
        <meta
          name="description"
          content="Visualize and optimize your business workflows with our AI-powered Process Mapper."
        />
      </Head>
      <div class="min-h-screen bg-oreo-black text-warm-beige font-sans selection:bg-muted-gold selection:text-oreo-black">
        {/* Hero Section */}
        <section class="relative pt-32 pb-20 overflow-hidden">
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-muted-gold/10 via-transparent to-transparent opacity-50" />

          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="text-center max-w-3xl mx-auto">
              <h1 class="text-5xl md:text-7xl font-display font-bold text-warm-beige mb-6 leading-tight">
                Visualize Your <br />
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-muted-gold to-light-gold">
                  Workflow Intelligence
                </span>
              </h1>
              <p class="text-xl text-warm-beige/60 mb-10 leading-relaxed">
                Transform complex business operations into clear, actionable
                visual maps instantly. Identify bottlenecks, optimize
                efficiency, and scale with confidence using our AI-powered
                engine.
              </p>

              <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  disabled
                  variant="primary"
                  className="w-full sm:w-auto px-8 py-4 text-lg"
                >
                  Launch Process Mapper (Coming Soon)
                </Button>
                <Button
                  href="/contactus"
                  variant="secondary"
                  className="w-full sm:w-auto px-8 py-4 text-lg"
                >
                  Book a Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section class="py-20 bg-white/5 backdrop-blur-sm">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Instant Visualization",
                  desc:
                    "Turn text descriptions into professional flowcharts in seconds.",
                  icon: "⚡",
                },
                {
                  title: "Bottleneck Analysis",
                  desc:
                    "AI identifies inefficiencies and suggests actionable improvements.",
                  icon: "🔍",
                },
                {
                  title: "Strategic Insights",
                  desc:
                    "Get executive summaries and optimization strategies automatically.",
                  icon: "📈",
                },
              ].map((feature) => (
                <div class="p-8 rounded-2xl bg-oreo-black border border-white/10 hover:border-muted-gold/30 transition-all duration-300 group">
                  <div class="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 class="text-xl font-display font-bold text-warm-beige mb-3 group-hover:text-muted-gold transition-colors">
                    {feature.title}
                  </h3>
                  <p class="text-warm-beige/60 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
