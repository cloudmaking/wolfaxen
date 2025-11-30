import { useEffect, useRef, useState } from "preact/hooks";
import anime from "https://esm.sh/animejs@3.2.2";

export default function FloatingWidgets() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = useState({
    cpu: 45,
    memory: 62,
    requests: 1247,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    anime({
      targets: ".widget-card",
      translateY: [50, 0],
      opacity: [0, 1],
      scale: [0.9, 1],
      easing: "easeOutElastic(1, .6)",
      duration: 1200,
      delay: anime.stagger(100),
    });

    anime({
      targets: ".widget-card",
      translateY: (_el: Element, i: number) => [0, i % 2 === 0 ? -8 : 8],
      duration: 3000 + Math.random() * 1000,
      easing: "easeInOutSine",
      direction: "alternate",
      loop: true,
      delay: anime.stagger(200),
    });

    anime({
      targets: ".chart-bar",
      scaleY: [0, 1],
      easing: "easeOutElastic(1, .5)",
      duration: 1500,
      delay: anime.stagger(50, { start: 500 }),
    });

    anime({
      targets: ".progress-fill",
      width: (_el: Element) => _el.getAttribute("data-value") + "%",
      easing: "easeOutExpo",
      duration: 2000,
      delay: anime.stagger(200, { start: 800 }),
    });

    anime({
      targets: ".pulse-indicator",
      scale: [1, 1.2, 1],
      opacity: [1, 0.5, 1],
      easing: "easeInOutQuad",
      duration: 1500,
      loop: true,
      delay: anime.stagger(300),
    });

    anime({
      targets: ".data-point",
      translateY: (_el: Element, _i: number) => [0, anime.random(-5, 5)],
      duration: 2000,
      easing: "easeInOutSine",
      direction: "alternate",
      loop: true,
      delay: anime.stagger(100),
    });

    const metricsInterval = setInterval(() => {
      setMetrics({
        cpu: Math.floor(30 + Math.random() * 40),
        memory: Math.floor(50 + Math.random() * 30),
        requests: Math.floor(1000 + Math.random() * 500),
      });
    }, 2000);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      container.querySelectorAll(".widget-card").forEach((card, i) => {
        const depth = 1 + (i * 0.2);
        anime({
          targets: card,
          translateX: x * 15 * depth,
          rotateY: x * 5,
          rotateX: -y * 5,
          duration: 400,
          easing: "easeOutQuad",
        });
      });
    };

    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      clearInterval(metricsInterval);
    };
  }, []);

  const chartData = [65, 45, 80, 55, 70, 40, 85, 60];

  return (
    <div
      ref={containerRef}
      class="relative w-full h-full p-4"
      style={{ perspective: "1000px" }}
    >
      <div
        class="widget-card absolute top-4 left-4 w-36 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-3 opacity-0"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div class="flex items-center justify-between mb-2">
          <span class="text-[10px] font-mono text-warm-beige/60 uppercase">
            CPU
          </span>
          <span class="pulse-indicator w-2 h-2 rounded-full bg-deep-olive">
          </span>
        </div>
        <div class="text-2xl font-bold text-warm-beige">{metrics.cpu}%</div>
        <div class="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            class="progress-fill h-full bg-gradient-to-r from-deep-olive to-muted-gold rounded-full"
            data-value={metrics.cpu}
            style={{ width: "0%" }}
          >
          </div>
        </div>
      </div>

      <div
        class="widget-card absolute top-4 right-4 w-36 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-3 opacity-0"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div class="flex items-center justify-between mb-2">
          <span class="text-[10px] font-mono text-warm-beige/60 uppercase">
            Memory
          </span>
          <span class="pulse-indicator w-2 h-2 rounded-full bg-muted-gold">
          </span>
        </div>
        <div class="text-2xl font-bold text-warm-beige">{metrics.memory}%</div>
        <div class="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            class="progress-fill h-full bg-gradient-to-r from-muted-gold to-oxide-red rounded-full"
            data-value={metrics.memory}
            style={{ width: "0%" }}
          >
          </div>
        </div>
      </div>

      <div
        class="widget-card absolute bottom-4 left-4 w-44 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-3 opacity-0"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div class="flex items-center justify-between mb-3">
          <span class="text-[10px] font-mono text-warm-beige/60 uppercase">
            Activity
          </span>
          <span class="text-[10px] font-mono text-deep-olive">LIVE</span>
        </div>
        <div class="flex items-end gap-1 h-12">
          {chartData.map((value, i) => (
            <div
              key={i}
              class="chart-bar flex-1 bg-gradient-to-t from-muted-gold/50 to-muted-gold rounded-t origin-bottom"
              style={{ height: `${value}%`, transform: "scaleY(0)" }}
            >
            </div>
          ))}
        </div>
      </div>

      <div
        class="widget-card absolute bottom-4 right-4 w-40 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-3 opacity-0"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div class="flex items-center justify-between mb-2">
          <span class="text-[10px] font-mono text-warm-beige/60 uppercase">
            Requests
          </span>
          <span class="pulse-indicator w-2 h-2 rounded-full bg-oxide-red">
          </span>
        </div>
        <div class="text-2xl font-bold text-warm-beige font-mono">
          {metrics.requests.toLocaleString()}
        </div>
        <div class="mt-2 flex gap-1">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              class="data-point w-1 h-3 bg-oxide-red/60 rounded-full"
            >
            </div>
          ))}
        </div>
      </div>

      <div
        class="widget-card absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-black/40 backdrop-blur-md border border-muted-gold/30 rounded-full flex items-center justify-center opacity-0"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div class="text-center">
          <div class="text-3xl font-bold text-muted-gold">98%</div>
          <div class="text-[10px] font-mono text-warm-beige/60 uppercase">
            Uptime
          </div>
        </div>
        <svg
          class="absolute inset-0 w-full h-full -rotate-90"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#ffffff10"
            strokeWidth="2"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#C0B283"
            strokeWidth="2"
            strokeDasharray="283"
            strokeDashoffset="6"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div
        class="absolute top-1/2 left-2 -translate-y-1/2 font-mono text-[8px] text-warm-beige/30 writing-mode-vertical"
        style={{ writingMode: "vertical-rl" }}
      >
        SYSTEM_MONITOR_v3.2
      </div>
    </div>
  );
}
