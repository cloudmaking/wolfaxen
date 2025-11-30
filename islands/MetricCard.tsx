import { useEffect, useRef } from "preact/hooks";
import anime from "https://esm.sh/animejs@3.2.2";

interface MetricCardProps {
  value: string;
  label: string;
  trend?: string;
  delay?: number;
}

export default function MetricCard(
  { value, label, trend, delay = 0 }: MetricCardProps,
) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    anime({
      targets: card,
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800,
      delay: delay,
      easing: "easeOutExpo",
    });
  }, [delay]);

  return (
    <div
      ref={cardRef}
      class="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm opacity-0"
    >
      <div class="text-3xl md:text-4xl font-bold text-muted-gold mb-2 font-display">
        {value}
      </div>
      <div class="text-sm text-warm-beige/60 uppercase tracking-wider mb-4">
        {label}
      </div>
      {trend && (
        <div class="inline-flex items-center px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs">
          <svg
            class="w-3 h-3 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
          {trend}
        </div>
      )}
    </div>
  );
}
