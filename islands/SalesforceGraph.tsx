import { useEffect, useRef } from "preact/hooks";
import anime from "https://esm.sh/animejs@3.2.2";

export default function SalesforceGraph() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Animation logic
    const timeline = anime.timeline({
      loop: true,
      easing: "easeInOutSine",
    });

    timeline
      .add({
        targets: ".data-packet",
        translateX: [0, 200],
        opacity: [0, 1, 0],
        delay: anime.stagger(500),
        duration: 2000,
      });
  }, []);

  return (
    <div
      ref={containerRef}
      class="relative w-full h-64 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden"
    >
      <div class="absolute inset-0 bg-grid-white/[0.02]"></div>

      {/* Central Node (Salesforce) */}
      <div class="relative z-10 w-16 h-16 bg-[#00A1E0]/20 rounded-xl border border-[#00A1E0]/50 flex items-center justify-center shadow-[0_0_30px_rgba(0,161,224,0.3)]">
        <svg
          class="w-8 h-8 text-[#00A1E0]"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17.2 12.8c0-.4.1-.8.1-1.2 0-3.6-2.9-6.5-6.5-6.5-1.7 0-3.3.7-4.5 1.8C5.6 6.3 5 5.7 4.2 5.7c-1.6 0-2.9 1.3-2.9 2.9 0 .4.1.8.2 1.1C.6 10.4 0 11.4 0 12.5c0 2.5 2 4.5 4.5 4.5h12.7c2.7 0 4.8-2.2 4.8-4.8 0-2.4-1.8-4.4-4.2-4.7-.1.5-.3.9-.6 1.3z" />
        </svg>
      </div>

      {/* Connected Nodes */}
      <div class="absolute left-10 top-10 w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
        <span class="text-xs text-white/60">ERP</span>
      </div>
      <div class="absolute right-10 bottom-10 w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
        <span class="text-xs text-white/60">Slack</span>
      </div>

      {/* Data Packets (Animated) */}
      <div class="data-packet absolute w-2 h-2 bg-muted-gold rounded-full blur-[1px]">
      </div>
      <div class="data-packet absolute w-2 h-2 bg-muted-gold rounded-full blur-[1px]">
      </div>
    </div>
  );
}
