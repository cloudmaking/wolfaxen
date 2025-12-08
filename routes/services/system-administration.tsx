import { Head } from "$fresh/runtime.ts";
import AnimatedButton from "../../islands/AnimatedButton.tsx";

export default function SystemAdministration() {
  return (
    <>
      <Head>
        <title>System Administration & IT Infrastructure | Wolfaxen</title>
        <meta
          name="description"
          content="Secure, compliant, and scalable IT foundations. We manage your devices, cloud security, and user onboarding so you can focus on business."
        />
      </Head>
      <div class="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h1 class="text-4xl md:text-6xl font-display font-bold mb-6 text-warm-beige">
            System Administration
          </h1>
          <p class="text-xl text-warm-beige/70 max-w-3xl mx-auto">
            Secure, compliant, and scalable IT foundations for your business.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 class="text-3xl font-display font-bold mb-4 text-muted-gold">
              The Foundation of Your Business
            </h2>
            <p class="text-lg text-warm-beige/80 mb-6 leading-relaxed">
              Your business runs on devices, cloud services, and networks. If
              these aren't managed properly, they become security risks and
              productivity black holes. We take over the technical burden,
              ensuring your infrastructure is secure, updated and compliant
              without you lifting a finger.
            </p>
            <ul class="space-y-4 mb-8">
              <li class="flex items-start">
                <span class="text-muted-gold mr-2">✓</span>
                <span>
                  Zero-touch device provisioning (ship straight to employees)
                </span>
              </li>
              <li class="flex items-start">
                <span class="text-muted-gold mr-2">✓</span>
                <span>Enterprise-grade security policies & compliance</span>
              </li>
              <li class="flex items-start">
                <span class="text-muted-gold mr-2">✓</span>
                <span>Automated patch management & updates</span>
              </li>
            </ul>
            <AnimatedButton href="/contactus" variant="primary">
              Secure Your Stack
            </AnimatedButton>
          </div>
          <div class="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h3 class="text-2xl font-bold mb-4 text-light-gold">
              Core Services
            </h3>
            <div class="space-y-4">
              <div class="p-4 bg-white/5 rounded-lg">
                <h4 class="font-bold text-warm-beige">
                  Device Management (MDM)
                </h4>
                <p class="text-sm text-warm-beige/60">
                  Microsoft Intune / Jamf setup. Remote wipe, encryption, and
                  app deployment.
                </p>
              </div>
              <div class="p-4 bg-white/5 rounded-lg">
                <h4 class="font-bold text-warm-beige">
                  Onboarding Automation
                </h4>
                <p class="text-sm text-warm-beige/60">
                  New hires get their accounts, licenses, and apps automatically
                  on day one.
                </p>
              </div>
              <div class="p-4 bg-white/5 rounded-lg">
                <h4 class="font-bold text-warm-beige">
                  Cloud Security & Identity
                </h4>
                <p class="text-sm text-warm-beige/60">
                  SSO, MFA enforcement, and conditional access policies to keep
                  bad actors out.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center bg-white/5 rounded-3xl p-12 border border-white/10">
          <h2 class="text-3xl font-display font-bold mb-6 text-warm-beige">
            Stop playing IT support.
          </h2>
          <p class="text-lg text-warm-beige/70 mb-8 max-w-2xl mx-auto">
            Let us build a self-healing, secure infrastructure that scales with
            you.
          </p>
          <AnimatedButton href="/contactus" variant="primary">
            Get a Free Infrastructure Audit
          </AnimatedButton>
        </div>
      </div>
    </>
  );
}
