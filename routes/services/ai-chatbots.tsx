import { Head } from "$fresh/runtime.ts";
import AnimatedButton from "../../islands/AnimatedButton.tsx";

export default function AIChatbots() {
  return (
    <>
      <Head>
        <title>
          AI Chatbots for Customer Service & Internal Ops | Wolfaxen
        </title>
        <meta
          name="description"
          content="Custom AI chatbots that understand your business. Enhance customer service and streamline internal knowledge retrieval with our tailored AI solutions."
        />
      </Head>
      <div class="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h1 class="text-4xl md:text-6xl font-display font-bold mb-6 text-warm-beige">
            AI Chatbots for Business
          </h1>
          <p class="text-xl text-warm-beige/70 max-w-3xl mx-auto">
            More than just a chat bubble. We build intelligent agents trained on
            your data to solve real problems.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 class="text-3xl font-display font-bold mb-4 text-muted-gold">
              24/7 Intelligent Support
            </h2>
            <p class="text-lg text-warm-beige/80 mb-6 leading-relaxed">
              Customers expect instant answers. Our AI chatbots deliver
              accurate, context-aware responses instantly, day or night, without
              the robotic feel of old-school bots.
            </p>
            <ul class="space-y-4 mb-8">
              <li class="flex items-start">
                <span class="text-muted-gold mr-2">✓</span>
                <span>
                  Trained on your specific knowledge base and documents
                </span>
              </li>
              <li class="flex items-start">
                <span class="text-muted-gold mr-2">✓</span>
                <span>Seamless handoff to human agents when needed</span>
              </li>
              <li class="flex items-start">
                <span class="text-muted-gold mr-2">✓</span>
                <span>Multi-channel deployment (Web, WhatsApp, Slack)</span>
              </li>
            </ul>
            <AnimatedButton href="/contactus" variant="primary">
              Build Your Bot
            </AnimatedButton>
          </div>
          <div class="bg-white/5 rounded-2xl p-8 border border-white/10 relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-muted-gold/10 blur-[50px] rounded-full pointer-events-none">
            </div>
            <h3 class="text-2xl font-bold mb-6 text-light-gold">
              Capabilities
            </h3>
            <div class="grid grid-cols-1 gap-4">
              <div class="p-4 border border-white/10 rounded-lg bg-black/20">
                <h4 class="font-bold text-warm-beige mb-1">
                  Customer Service
                </h4>
                <p class="text-sm text-warm-beige/60">
                  Handle FAQs, order tracking and troubleshooting instantly.
                </p>
              </div>
              <div class="p-4 border border-white/10 rounded-lg bg-black/20">
                <h4 class="font-bold text-warm-beige mb-1">
                  Internal Knowledge Base
                </h4>
                <p class="text-sm text-warm-beige/60">
                  Help employees find policy info or technical docs in seconds.
                </p>
              </div>
              <div class="p-4 border border-white/10 rounded-lg bg-black/20">
                <h4 class="font-bold text-warm-beige mb-1">
                  Lead Qualification
                </h4>
                <p class="text-sm text-warm-beige/60">
                  Engage visitors, ask qualifying questions, and book meetings.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center bg-white/5 rounded-3xl p-12 border border-white/10">
          <h2 class="text-3xl font-display font-bold mb-6 text-warm-beige">
            Deploy your digital workforce
          </h2>
          <p class="text-lg text-warm-beige/70 mb-8 max-w-2xl mx-auto">
            Enhance your team's capabilities with custom AI agents.
          </p>
          <AnimatedButton href="/contactus" variant="primary">
            Get a Demo
          </AnimatedButton>
        </div>
      </div>
    </>
  );
}
