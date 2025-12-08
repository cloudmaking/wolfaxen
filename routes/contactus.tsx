import ContactPageTabs from "../islands/ContactPageTabs.tsx";
import MagneticCard from "../islands/MagneticCard.tsx";
import DecodeText from "../islands/DecodeText.tsx";
import Sheen from "../components/Sheen.tsx";

export default function ContactUs() {
  return (
    <div class="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div class="absolute top-1/4 right-0 w-[50%] h-[50%] bg-gradient-to-b from-muted-gold/5 to-transparent blur-[150px] rounded-full pointer-events-none">
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div>
            <h1 class="text-4xl md:text-6xl font-display font-bold text-warm-beige mb-8">
              <DecodeText text="Let's fix it." scramble />
            </h1>
            <p class="text-xl text-warm-beige/60 mb-12">
              Ready to stop the chaos? Book a call or just email me.
            </p>

            <div class="space-y-10 mb-12">
              <MagneticCard intensity={10}>
                <div class="flex items-start gap-6 group p-4 rounded-2xl hover:bg-white/5 transition-colors duration-300 relative overflow-hidden">
                  <Sheen />
                  <div class="w-14 h-14 bg-muted-gold/10 rounded-2xl flex items-center justify-center flex-shrink-0 border border-muted-gold/20 group-hover:bg-muted-gold/20 transition-colors duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <svg
                      class="w-7 h-7 text-muted-gold"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-warm-beige mb-1 group-hover:text-light-gold transition-colors">
                      Email me
                    </h3>
                    <a
                      href="mailto:info@wolfaxen.com"
                      class="text-warm-beige/60 hover:text-muted-gold transition-colors"
                    >
                      info@wolfaxen.com
                    </a>
                  </div>
                </div>
              </MagneticCard>

              <MagneticCard intensity={10}>
                <div class="flex items-start gap-6 group p-4 rounded-2xl hover:bg-white/5 transition-colors duration-300 relative overflow-hidden">
                  <Sheen />
                  <div class="w-14 h-14 bg-deep-olive/20 rounded-2xl flex items-center justify-center flex-shrink-0 border border-deep-olive/30 group-hover:bg-deep-olive/30 transition-colors duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <svg
                      class="w-7 h-7 text-light-gold"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-warm-beige mb-1 group-hover:text-light-gold transition-colors">
                      Call me
                    </h3>
                    <a
                      href="tel:07519244960"
                      class="text-warm-beige/60 hover:text-muted-gold transition-colors"
                    >
                      07519 244 960
                    </a>
                  </div>
                </div>
              </MagneticCard>

              <MagneticCard intensity={10}>
                <div class="flex items-start gap-6 group p-4 rounded-2xl hover:bg-white/5 transition-colors duration-300 relative overflow-hidden">
                  <Sheen />
                  <div class="w-14 h-14 bg-oxide-red/20 rounded-2xl flex items-center justify-center flex-shrink-0 border border-oxide-red/30 group-hover:bg-oxide-red/30 transition-colors duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <svg
                      class="w-7 h-7 text-terra-cotta"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-warm-beige mb-1 group-hover:text-light-gold transition-colors">
                      Book time
                    </h3>
                    <p class="text-warm-beige/60">
                      Free 30-minute chat. No sales pitch.
                    </p>
                  </div>
                </div>
              </MagneticCard>
            </div>
          </div>

          <ContactPageTabs />
        </div>
      </div>
    </div>
  );
}
