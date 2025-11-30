import { useEffect, useRef, useState } from "preact/hooks";
import anime from "https://esm.sh/animejs@3.2.2";

interface GlitchTextProps {
  text: string;
  className?: string;
}

export default function GlitchText({ text, className = "" }: GlitchTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [glitchText, setGlitchText] = useState(text);
  const chars =
    "!@#$%^&*()_+-=[]{}|;:,.<>?0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newText = text.split("").map((char, _i) => {
          if (char === " ") return " ";
          if (Math.random() > 0.85) {
            return chars[Math.floor(Math.random() * chars.length)];
          }
          return char;
        }).join("");
        setGlitchText(newText);

        setTimeout(() => setGlitchText(text), 50 + Math.random() * 100);
      }
    }, 2000);

    anime({
      targets: ".glitch-layer-1",
      translateX: [-2, 2, -1, 0],
      opacity: [0.8, 0.5, 0.8, 0],
      duration: 200,
      easing: "steps(4)",
      loop: true,
      delay: () => anime.random(2000, 5000),
    });

    anime({
      targets: ".glitch-layer-2",
      translateX: [2, -2, 1, 0],
      opacity: [0.8, 0.5, 0.8, 0],
      duration: 200,
      easing: "steps(4)",
      loop: true,
      delay: () => anime.random(2000, 5000),
    });

    anime({
      targets: ".scanline",
      translateY: ["-100%", "200%"],
      easing: "linear",
      duration: 8000,
      loop: true,
    });

    return () => clearInterval(glitchInterval);
  }, [text]);

  return (
    <div ref={containerRef} class={`relative inline-block ${className}`}>
      <span
        class="glitch-layer-1 absolute inset-0 text-oxide-red opacity-0"
        style={{ clipPath: "inset(10% 0 60% 0)" }}
      >
        {glitchText}
      </span>
      <span
        class="glitch-layer-2 absolute inset-0 text-deep-olive opacity-0"
        style={{ clipPath: "inset(60% 0 10% 0)" }}
      >
        {glitchText}
      </span>
      <span class="relative z-10">{glitchText}</span>
      <span class="scanline absolute inset-0 w-full h-[2px] bg-white/10 pointer-events-none">
      </span>
    </div>
  );
}
