import { Head } from "$fresh/runtime.ts";
import AnimatedButton from "../../islands/AnimatedButton.tsx";
import SalesforceGraph from "../../islands/SalesforceGraph.tsx";
import MetricCard from "../../islands/MetricCard.tsx";
import StaggeredGrid from "../../islands/StaggeredGrid.tsx";

export default function SalesforceAutomation() {
  return (
    <>
      <Head>
        <title>Salesforce Automation & Integrations | Wolfaxen</title>
        <meta
          name="description"
          content="Unlock the full potential of Salesforce with custom automation and system design. We streamline your CRM to drive sales and efficiency."
        />
      </Head>

      {/* Hero Section */}
      <div class="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
        <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00A1E0]/10 blur-[150px] rounded-full pointer-events-none">
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <div class="inline-block mb-6 px-4 py-1.5 rounded-full border border-[#00A1E0]/30 bg-[#00A1E0]/10 backdrop-blur-md">
              <span class="text-[#00A1E0] text-sm font-medium tracking-wider uppercase">
                Salesforce Certified Experts
              </span>
            </div>
            <h1 class="text-4xl md:text-6xl font-display font-bold mb-6 text-warm-beige leading-tight">
              Turn Salesforce into a{" "}
              <span class="text-muted-gold">Growth Engine</span>
            </h1>
            <p class="text-xl text-warm-beige/70 mb-8 leading-relaxed">
              Stop using Salesforce as just a database. We build custom
              automations that handle lead routing, invoicing, and data sync—so
              your team can focus on closing deals.
            </p>
            <div class="flex gap-4">
              <AnimatedButton href="/contactus" variant="primary">
                Audit My Instance
              </AnimatedButton>
              <AnimatedButton href="#features" variant="outline">
                Explore Features
              </AnimatedButton>
            </div>
          </div>
          <div class="relative">
            <SalesforceGraph />
          </div>
        </div>

        {/* Metrics Section */}
        <div class="mb-24">
          <StaggeredGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
              value="30%"
              label="Efficiency Gain"
              trend="Average client result"
              delay={100}
            />
            <MetricCard
              value="10h+"
              label="Saved Per Week"
              trend="Per admin user"
              delay={200}
            />
            <MetricCard
              value="0%"
              label="Data Duplication"
              trend="With proper validation"
              delay={300}
            />
          </StaggeredGrid>
        </div>

        {/* Features Section */}
        <div
          id="features"
          class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20"
        >
          <div class="order-2 md:order-1 bg-white/5 rounded-3xl p-10 border border-white/10 backdrop-blur-sm">
            <h3 class="text-2xl font-bold mb-8 text-light-gold font-display">
              Technical Capabilities
            </h3>
            <ul class="space-y-6">
              <li class="group">
                <div class="flex items-center gap-4 mb-2">
                  <div class="w-10 h-10 rounded-lg bg-[#00A1E0]/20 flex items-center justify-center text-[#00A1E0]">
                    ⚡
                  </div>
                  <strong class="text-lg text-warm-beige group-hover:text-[#00A1E0] transition-colors">
                    Custom Flow Builder
                  </strong>
                </div>
                <p class="text-warm-beige/60 pl-14">
                  Complex logic handled visually. We build flows that are easy
                  to maintain but powerful enough to replace code.
                </p>
              </li>
              <li class="group">
                <div class="flex items-center gap-4 mb-2">
                  <div class="w-10 h-10 rounded-lg bg-[#00A1E0]/20 flex items-center justify-center text-[#00A1E0]">
                    💻
                  </div>
                  <strong class="text-lg text-warm-beige group-hover:text-[#00A1E0] transition-colors">
                    Apex Development
                  </strong>
                </div>
                <p class="text-warm-beige/60 pl-14">
                  When standard tools hit their limit, we write clean,
                  test-driven Apex code for heavy data processing.
                </p>
              </li>
              <li class="group">
                <div class="flex items-center gap-4 mb-2">
                  <div class="w-10 h-10 rounded-lg bg-[#00A1E0]/20 flex items-center justify-center text-[#00A1E0]">
                    🔗
                  </div>
                  <strong class="text-lg text-warm-beige group-hover:text-[#00A1E0] transition-colors">
                    3rd Party Integrations
                  </strong>
                </div>
                <p class="text-warm-beige/60 pl-14">
                  Seamlessly connect Salesforce to Slack, Xero, HubSpot, or your
                  custom ERP.
                </p>
              </li>
            </ul>
          </div>
          <div class="order-1 md:order-2">
            <h2 class="text-3xl font-display font-bold mb-6 text-muted-gold">
              Fix the "Frankenstein" CRM
            </h2>
            <p class="text-lg text-warm-beige/80 mb-6 leading-relaxed">
              A poorly configured Salesforce instance is a massive drain on
              resources. We clean up technical debt, automate manual data entry,
              and ensure your sales team spends time selling, not clicking
              buttons.
            </p>
            <div class="bg-oreo-black/50 rounded-xl p-6 border border-white/10">
              <h4 class="font-bold text-warm-beige mb-4">Common Fixes:</h4>
              <ul class="space-y-3">
                <li class="flex items-center text-warm-beige/70">
                  <span class="w-2 h-2 rounded-full bg-green-500 mr-3"></span>
                  Automated lead routing (Round Robin)
                </li>
                <li class="flex items-center text-warm-beige/70">
                  <span class="w-2 h-2 rounded-full bg-green-500 mr-3"></span>
                  Quote-to-Cash automation
                </li>
                <li class="flex items-center text-warm-beige/70">
                  <span class="w-2 h-2 rounded-full bg-green-500 mr-3"></span>
                  Duplicate detection & merging
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div class="text-center bg-gradient-to-br from-white/5 to-transparent rounded-3xl p-12 border border-white/10 relative overflow-hidden">
          <div class="absolute inset-0 bg-[#00A1E0]/5 pointer-events-none">
          </div>
          <h2 class="text-3xl font-display font-bold mb-6 text-warm-beige relative z-10">
            Ready to optimize?
          </h2>
          <p class="text-lg text-warm-beige/70 mb-8 max-w-2xl mx-auto relative z-10">
            Book a free audit call. We'll look at your current setup and
            identify immediate wins.
          </p>
          <AnimatedButton href="/contactus" variant="primary">
            Book Audit Call
          </AnimatedButton>
        </div>
      </div>
    </>
  );
}
