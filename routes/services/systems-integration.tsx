import { Head } from "$fresh/runtime.ts";
import AnimatedButton from "../../islands/AnimatedButton.tsx";

export default function SystemsIntegration() {
  return (
    <>
      <Head>
        <title>Systems Integration & Data Pipelines | Wolfaxen</title>
        <meta
          name="description"
          content="Connect your disjointed business tools with robust systems integration and data pipelines. We ensure your data flows seamlessly between platforms."
        />
      </Head>
      <div class="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h1 class="text-4xl md:text-6xl font-display font-bold mb-6 text-warm-beige">
            Systems Integration & Data Pipelines
          </h1>
          <p class="text-xl text-warm-beige/70 max-w-3xl mx-auto">
            Eliminate data silos. We build the bridges that let your software
            stack talk to each other in real-time.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 class="text-3xl font-display font-bold mb-4 text-muted-gold">
              Unified Data Ecosystem
            </h2>
            <p class="text-lg text-warm-beige/80 mb-6 leading-relaxed">
              Your business runs on multiple SaaS tools. If they aren't
              connected, you're wasting time moving data manually. We design and
              build robust APIs, webhooks, and ETL pipelines to keep everything
              in sync.
            </p>
            <ul class="space-y-4 mb-8">
              <li class="flex items-start">
                <span class="text-muted-gold mr-2">✓</span>
                <span>Custom API development and integration</span>
              </li>
              <li class="flex items-start">
                <span class="text-muted-gold mr-2">✓</span>
                <span>Real-time data synchronisation</span>
              </li>
              <li class="flex items-start">
                <span class="text-muted-gold mr-2">✓</span>
                <span>Secure and scalable architecture</span>
              </li>
            </ul>
            <AnimatedButton href="/contactus" variant="primary">
              Connect Your Systems
            </AnimatedButton>
          </div>
          <div class="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h3 class="text-2xl font-bold mb-4 text-light-gold">
              Integration Expertise
            </h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="p-4 bg-black/20 rounded text-center border border-white/5">
                <span class="block text-2xl mb-2">☁️</span>
                <span class="text-warm-beige font-bold">Cloud APIs</span>
              </div>
              <div class="p-4 bg-black/20 rounded text-center border border-white/5">
                <span class="block text-2xl mb-2">🗄️</span>
                <span class="text-warm-beige font-bold">Legacy SQL</span>
              </div>
              <div class="p-4 bg-black/20 rounded text-center border border-white/5">
                <span class="block text-2xl mb-2">🛍️</span>
                <span class="text-warm-beige font-bold">E-commerce</span>
              </div>
              <div class="p-4 bg-black/20 rounded text-center border border-white/5">
                <span class="block text-2xl mb-2">💳</span>
                <span class="text-warm-beige font-bold">
                  Payment Gateways
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center bg-white/5 rounded-3xl p-12 border border-white/10">
          <h2 class="text-3xl font-display font-bold mb-6 text-warm-beige">
            Stop the manual copy-paste
          </h2>
          <p class="text-lg text-warm-beige/70 mb-8 max-w-2xl mx-auto">
            Let your systems do the heavy lifting.
          </p>
          <AnimatedButton href="/contactus" variant="primary">
            Build a Pipeline
          </AnimatedButton>
        </div>
      </div>
    </>
  );
}
