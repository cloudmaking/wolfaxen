import { useEffect, useRef } from "preact/hooks";
import anime from "https://esm.sh/animejs@3.2.2";

export default function HeroAnimations() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Flow Lines
    const lines = containerRef.current.querySelectorAll(".flow-line");
    anime({
      targets: lines,
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: "easeInOutSine",
      duration: 3000,
      delay: function (_el, i) {
        return i * 250;
      },
      direction: "alternate",
      loop: true,
    });

    // Floating Particles
    const particles = containerRef.current.querySelectorAll(".particle");
    particles.forEach((particle) => {
      anime({
        targets: particle,
        translateX: () => anime.random(-50, 50),
        translateY: () => anime.random(-50, 50),
        scale: [0.8, 1.2],
        opacity: [0.3, 0.8],
        easing: "easeInOutQuad",
        duration: () => anime.random(3000, 5000),
        direction: "alternate",
        loop: true,
      });
    });
  }, []);

  return (
    <div
      ref={containerRef}
      class="absolute inset-0 pointer-events-none overflow-hidden"
    >
      {/* Flow Lines SVG */}
      <svg
        class="absolute top-0 left-0 w-full h-full opacity-10"
        viewBox="0 0 1440 800"
        preserveAspectRatio="none"
      >
        <path
          class="flow-line"
          fill="none"
          stroke="#C0B283" // Muted Gold
          strokeWidth="2"
          d="M0,200 C300,100 600,300 1440,150"
        />
        <path
          class="flow-line"
          fill="none"
          stroke="#C0B283"
          strokeWidth="2"
          d="M0,400 C400,300 800,500 1440,350"
        />
        <path
          class="flow-line"
          fill="none"
          stroke="#C0B283"
          strokeWidth="2"
          d="M0,600 C500,500 900,700 1440,550"
        />
      </svg>

      {/* Floating Particles */}
      <div class="particle absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-deep-olive blur-[1px]">
      </div>
      <div class="particle absolute top-1/3 right-1/3 w-3 h-3 rounded-full bg-muted-gold blur-[1px]">
      </div>
      <div class="particle absolute bottom-1/4 left-1/2 w-2 h-2 rounded-full bg-warm-beige blur-[1px]">
      </div>
    </div>
  );
}
