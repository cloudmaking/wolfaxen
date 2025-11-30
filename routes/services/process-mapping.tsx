import { Head } from "$fresh/runtime.ts";
import AnimatedButton from "../../islands/AnimatedButton.tsx";

export default function ProcessMapping() {
  return (
    <>
      <Head>
        <title>Business Process Mapping & Workflow Design | Wolfaxen</title>
        <meta
          name="description"
          content="Visualise your operations with expert business process mapping. We identify bottlenecks and design optimised workflows for maximum efficiency."
        />
      </Head>
      <div class="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h1 class="text-4xl md:text-6xl font-display font-bold mb-6 text-warm-beige">
            Business Process Mapping & Workflow Design
          </h1>
          <p class="text-xl text-warm-beige/70 max-w-3xl mx-auto">
            You can't automate what you don't understand. We map your entire
            operation to find the hidden inefficiencies.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div class="order-2 md:order-1 bg-white/5 rounded-2xl p-8 border border-white/10">
            <h3 class="text-2xl font-bold mb-4 text-light-gold">
              Our Process
            </h3>
            <div class="space-y-6">
              <div class="flex gap-4">
                <div class="w-8 h-8 rounded-full bg-muted-gold/20 flex items-center justify-center text-muted-gold font-bold">
                  1
                </div>
                <div>
                  <h4 class="font-bold text-warm-beige">
                    Discovery Workshops
                  </h4>
                  <p class="text-sm text-warm-beige/60">
                    We sit down with your team to understand how work actually
                    gets done.
                  </p>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="w-8 h-8 rounded-full bg-muted-gold/20 flex items-center justify-center text-muted-gold font-bold">
                  2
                </div>
                <div>
                  <h4 class="font-bold text-warm-beige">Visual Mapping</h4>
                  <p class="text-sm text-warm-beige/60">
                    Creating detailed flowcharts that expose bottlenecks and
                    redundancies.
                  </p>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="w-8 h-8 rounded-full bg-muted-gold/20 flex items-center justify-center text-muted-gold font-bold">
                  3
                </div>
                <div>
                  <h4 class="font-bold text-warm-beige">
                    Optimisation Strategy
                  </h4>
                  <p class="text-sm text-warm-beige/60">
                    Designing the "To-Be" state with streamlined workflows and
                    clear ownership.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="order-1 md:order-2">
            <h2 class="text-3xl font-display font-bold mb-4 text-muted-gold">
              Clarity is Power
            </h2>
            <p class="text-lg text-warm-beige/80 mb-6 leading-relaxed">
              Most businesses run on tribal knowledge and "the way we've always
              done it." Process mapping brings everything into the light,
              allowing you to scale without chaos.
            </p>
            <ul class="space-y-4 mb-8">
              <li class="flex items-start">
                <span class="text-muted-gold mr-2">✓</span>
                <span>Standardise operations across teams</span>
              </li>
              <li class="flex items-start">
                <span class="text-muted-gold mr-2">✓</span>
                <span>Onboard new hires faster with clear documentation</span>
              </li>
              <li class="flex items-start">
                <span class="text-muted-gold mr-2">✓</span>
                <span>Prepare your business for automation</span>
              </li>
            </ul>
            <AnimatedButton href="/contactus" variant="primary">
              Map Your Processes
            </AnimatedButton>
          </div>
        </div>

        <div class="text-center bg-white/5 rounded-3xl p-12 border border-white/10">
          <h2 class="text-3xl font-display font-bold mb-6 text-warm-beige">
            See the full picture
          </h2>
          <p class="text-lg text-warm-beige/70 mb-8 max-w-2xl mx-auto">
            Get a clear blueprint of your business operations.
          </p>
          <AnimatedButton href="/contactus" variant="primary">
            Get Started
          </AnimatedButton>
        </div>
      </div>
    </>
  );
}
