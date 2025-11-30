export default function Footer() {
  return (
    <footer class="bg-oreo-black border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
      {/* Background Glow */}
      <div class="absolute bottom-0 left-1/4 w-1/2 h-1/2 bg-oxide-red/5 blur-[100px] rounded-full pointer-events-none">
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div class="col-span-1 md:col-span-2">
            <a href="/" class="flex items-center gap-3 mb-6 group">
              <div class="w-6 h-6 bg-muted-gold rounded-sm rotate-45 group-hover:rotate-0 transition-transform duration-500">
              </div>
              <span class="font-display font-bold text-xl tracking-wide text-warm-beige">
                WOLFAXEN
              </span>
            </a>
            <p class="text-warm-beige/60 max-w-sm leading-relaxed">
              We map your processes, fix inefficiencies, build the automations,
              integrate the systems, and deliver AI solutions — all for a fair
              cost.
            </p>
          </div>

          <div>
            <h3 class="font-display font-bold text-lg mb-6 text-warm-beige">
              Services
            </h3>
            <ul class="space-y-4">
              <li>
                <a
                  href="/services#mapping"
                  class="text-warm-beige/60 hover:text-muted-gold transition-colors"
                >
                  Process Mapping
                </a>
              </li>
              <li>
                <a
                  href="/services#automation"
                  class="text-warm-beige/60 hover:text-muted-gold transition-colors"
                >
                  Automation
                </a>
              </li>
              <li>
                <a
                  href="/services#ai"
                  class="text-warm-beige/60 hover:text-muted-gold transition-colors"
                >
                  AI Solutions
                </a>
              </li>
              <li>
                <a
                  href="/services#integration"
                  class="text-warm-beige/60 hover:text-muted-gold transition-colors"
                >
                  Integrations
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="font-display font-bold text-lg mb-6 text-warm-beige">
              Company
            </h3>
            <ul class="space-y-4">
              <li>
                <a
                  href="/about"
                  class="text-warm-beige/60 hover:text-muted-gold transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/pricing"
                  class="text-warm-beige/60 hover:text-muted-gold transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="/contactus"
                  class="text-warm-beige/60 hover:text-muted-gold transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-warm-beige/40 text-sm">
            © {new Date().getFullYear()} Wolfaxen. All rights reserved.
          </p>
          <div class="flex gap-6">
            {
              /*
            <a
              href="#"
              class="text-warm-beige/40 hover:text-muted-gold transition-colors text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              class="text-warm-beige/40 hover:text-muted-gold transition-colors text-sm"
            >
              Terms of Service
            </a>
            */
            }
          </div>
        </div>
      </div>
    </footer>
  );
}
