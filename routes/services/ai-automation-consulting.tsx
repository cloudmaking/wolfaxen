import { Head } from "$fresh/runtime.ts";
import AnimatedButton from "../../islands/AnimatedButton.tsx";

export default function AIAutomationConsulting() {
  return (
    <>
      <Head>
        <title>AI Automation Consulting | Wolfaxen</title>
        <meta
          name="description"
          content="Expert AI automation consulting to streamline your business operations. We build custom AI solutions to save you time and money."
        />
      </Head>
      <div class="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h1 class="text-4xl md:text-6xl font-display font-bold mb-6 text-warm-beige">
            AI Automation Consulting
          </h1>
          <p class="text-xl text-warm-beige/70 max-w-3xl mx-auto">
            Stop wasting human potential on robotic tasks. We design and deploy
            intelligent automation systems that work 24/7.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 class="text-3xl font-display font-bold mb-4 text-muted-gold">
              Why Automate?
            </h2>
            <p class="text-lg text-warm-beige/80 mb-6 leading-relaxed">
              Manual data entry, repetitive emails, and disjointed workflows are
              silent killers of productivity. Our AI automation consulting
              services identify these bottlenecks and replace them with
              efficient, error-free automated systems.
            </p>
            <ul class="space-y-4 mb-8">
              <li class="flex items-start">
                <span class="text-muted-gold mr-2">✓</span>
                <span>Reduce operational costs by up to 40%</span>
              </li>
              <li class="flex items-start">
                <span class="text-muted-gold mr-2">✓</span>
                <span>Eliminate human error in data processing</span>
              </li>
              <li class="flex items-start">
                <span class="text-muted-gold mr-2">✓</span>
                <span>Free up your team for high-value strategic work</span>
              </li>
            </ul>
            <AnimatedButton href="/contactus" variant="primary">
              Book a Consultation
            </AnimatedButton>
          </div>
          <div class="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h3 class="text-2xl font-bold mb-4 text-light-gold">
              Common Use Cases
            </h3>
            <div class="space-y-4">
              <div class="p-4 bg-white/5 rounded-lg">
                <h4 class="font-bold text-warm-beige">
                  Intelligent Document Processing
                </h4>
                <p class="text-sm text-warm-beige/60">
                  Automatically extract data from invoices, contracts, and
                  forms.
                </p>
              </div>
              <div class="p-4 bg-white/5 rounded-lg">
                <h4 class="font-bold text-warm-beige">
                  Customer Support Triage
                </h4>
                <p class="text-sm text-warm-beige/60">
                  AI agents that categorize and draft responses to tickets.
                </p>
              </div>
              <div class="p-4 bg-white/5 rounded-lg">
                <h4 class="font-bold text-warm-beige">
                  Sales Outreach Automation
                </h4>
                <p class="text-sm text-warm-beige/60">
                  Personalized, at-scale outreach that feels human.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center bg-white/5 rounded-3xl p-12 border border-white/10">
          <h2 class="text-3xl font-display font-bold mb-6 text-warm-beige">
            Ready to reclaim your time?
          </h2>
          <p class="text-lg text-warm-beige/70 mb-8 max-w-2xl mx-auto">
            Let's discuss your specific challenges and how AI can solve them.
          </p>
          <AnimatedButton href="/contactus" variant="primary">
            Start Your Transformation
          </AnimatedButton>
        </div>
      </div>
    </>
  );
}
