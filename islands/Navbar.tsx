import { useRef, useState } from "preact/hooks";
import Button from "../components/Button.tsx";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsServicesOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 300);
  };

  const serviceLinks = [
    { name: "Process Mapping", href: "/services/process-mapping" },
    { name: "Salesforce Automation", href: "/services/salesforce-automation" },
    { name: "AI Chatbots", href: "/services/ai-chatbots" },
    { name: "Systems Integration", href: "/services/systems-integration" },
    { name: "AI Consulting", href: "/services/ai-automation-consulting" },
  ];

  const navLinks = [
    { name: "Case Studies", href: "/case-studies" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav class="sticky top-0 z-50 w-full bg-oreo-black/80 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          <div class="flex-shrink-0">
            <a href="/" class="flex items-center gap-3 group">
              <div class="w-8 h-8 bg-muted-gold rounded-sm rotate-45 group-hover:rotate-0 transition-transform duration-500 shadow-[0_0_15px_rgba(185,176,123,0.3)]" />
              <span class="font-display font-bold text-xl tracking-wide text-warm-beige group-hover:text-muted-gold transition-colors duration-300">
                WOLFAXEN
              </span>
            </a>
          </div>

          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-8">
              <div
                class="relative group"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <a
                  href="/services"
                  class="text-sm font-medium text-warm-beige/70 hover:text-muted-gold transition-colors duration-200 relative flex items-center gap-1"
                >
                  Services
                  <svg
                    class={`w-4 h-4 transition-transform duration-200 ${
                      isServicesOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-muted-gold transition-all duration-300 group-hover:w-full" />
                </a>

                <div
                  class={`absolute left-0 mt-2 w-56 rounded-xl shadow-lg bg-oreo-black border border-white/10 ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-200 origin-top-left ${
                    isServicesOpen
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                  }`}
                >
                  <div class="py-1">
                    {serviceLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        class="block px-4 py-3 text-sm text-warm-beige/70 hover:bg-white/5 hover:text-muted-gold transition-colors"
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  class="text-sm font-medium text-warm-beige/70 hover:text-muted-gold transition-colors duration-200 relative group"
                >
                  {link.name}
                  <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-muted-gold transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
              <Button href="/contactus" variant="primary" className="ml-4">
                Book a Call
              </Button>
            </div>
          </div>

          <div class="md:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              class="inline-flex items-center justify-center p-2 rounded-md text-warm-beige hover:text-muted-gold hover:bg-white/5 focus:outline-none transition-colors"
            >
              <span class="sr-only">Open main menu</span>
              {!isOpen
                ? (
                  <svg
                    class="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )
                : (
                  <svg
                    class="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div class="md:hidden bg-oreo-black border-b border-white/10">
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div class="px-3 py-2 text-base font-medium text-gray-300">
              Services
            </div>
            {serviceLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                class="block px-3 py-2 pl-6 rounded-md text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10"
              >
                {link.name}
              </a>
            ))}
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10"
              >
                {link.name}
              </a>
            ))}
            <div class="pt-4">
              <Button href="/contactus" variant="primary" className="w-full">
                Book a Call
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
