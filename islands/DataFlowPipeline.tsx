import { useEffect, useRef } from "preact/hooks";
import anime from "https://esm.sh/animejs@3.2.2";

export default function DataFlowPipeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createParticle = (
      pathClass: string,
      delay: number,
      color: string,
    ) => {
      const particle = document.createElement("div");
      particle.className = `absolute w-2 h-2 rounded-full ${color} shadow-lg`;
      particle.style.filter = "blur(1px)";
      container.querySelector(".particles-container")?.appendChild(particle);

      const path = container.querySelector(pathClass) as SVGPathElement;
      if (!path) return;

      const pathLength = path.getTotalLength();

      anime({
        targets: particle,
        translateX: (_el: Element, _i: number, _t: number) => {
          return anime.setDashoffset;
        },
        easing: "linear",
        duration: 3000,
        delay: delay,
        loop: true,
        update: function (anim) {
          const progress = anim.progress / 100;
          const point = path.getPointAtLength(progress * pathLength);
          particle.style.left = `${(point.x / 400) * 100}%`;
          particle.style.top = `${(point.y / 250) * 100}%`;
          particle.style.opacity = `${
            0.5 + Math.sin(progress * Math.PI) * 0.5
          }`;
        },
      });
    };

    anime({
      targets: ".pipeline-path",
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: "easeInOutSine",
      duration: 2000,
      delay: anime.stagger(200),
    });

    anime({
      targets: ".node-box",
      scale: [0.8, 1],
      opacity: [0, 1],
      easing: "easeOutElastic(1, .6)",
      duration: 1000,
      delay: anime.stagger(150, { start: 500 }),
    });

    setTimeout(() => {
      for (let i = 0; i < 5; i++) {
        createParticle(".path-1", i * 600, "bg-muted-gold");
        createParticle(".path-2", i * 600 + 300, "bg-deep-olive");
        createParticle(".path-3", i * 600 + 150, "bg-oxide-red");
      }
    }, 1500);

    anime({
      targets: ".status-dot",
      scale: [1, 1.3, 1],
      opacity: [0.5, 1, 0.5],
      easing: "easeInOutQuad",
      duration: 1000,
      loop: true,
      delay: anime.stagger(200),
    });

    anime({
      targets: ".data-stream",
      backgroundPosition: ["0% 0%", "100% 0%"],
      easing: "linear",
      duration: 2000,
      loop: true,
    });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      anime({
        targets: ".pipeline-layer",
        rotateY: x * 8,
        rotateX: -y * 8,
        duration: 400,
        easing: "easeOutQuad",
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      class="relative w-full h-full"
      style={{ perspective: "800px" }}
    >
      <div
        class="pipeline-layer w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        <svg viewBox="0 0 400 250" class="w-full h-full">
          <defs>
            <linearGradient id="pipeGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C0B283" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#C0B283" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#C0B283" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="pipeGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#606c38" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#606c38" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#606c38" stopOpacity="0.3" />
            </linearGradient>
            <filter id="pipeGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            class="pipeline-path path-1"
            d="M20,50 Q100,50 120,80 T200,80 Q280,80 300,50 T380,50"
            fill="none"
            stroke="url(#pipeGrad1)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            class="pipeline-path path-2"
            d="M20,125 L100,125 Q130,125 150,150 T200,150 Q250,150 270,125 T380,125"
            fill="none"
            stroke="url(#pipeGrad2)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            class="pipeline-path path-3"
            d="M20,200 Q80,200 100,180 T200,180 Q300,180 320,200 T380,200"
            fill="none"
            stroke="#bc6c25"
            strokeWidth="3"
            strokeOpacity="0.6"
            strokeLinecap="round"
          />

          <g class="node-box" opacity="0">
            <rect
              x="5"
              y="35"
              width="30"
              height="30"
              fill="#1a1a1a"
              stroke="#C0B283"
              strokeWidth="1"
              rx="4"
            />
            <circle cx="20" cy="50" r="3" class="status-dot" fill="#C0B283" />
            <text
              x="20"
              y="75"
              textAnchor="middle"
              fill="#C0B283"
              fontSize="8"
              opacity="0.7"
            >
              IN
            </text>
          </g>

          <g class="node-box" opacity="0">
            <rect
              x="185"
              y="65"
              width="30"
              height="30"
              fill="#1a1a1a"
              stroke="#606c38"
              strokeWidth="1"
              rx="4"
            />
            <circle cx="200" cy="80" r="3" class="status-dot" fill="#606c38" />
            <text
              x="200"
              y="105"
              textAnchor="middle"
              fill="#606c38"
              fontSize="8"
              opacity="0.7"
            >
              PROC
            </text>
          </g>

          <g class="node-box" opacity="0">
            <rect
              x="365"
              y="35"
              width="30"
              height="30"
              fill="#1a1a1a"
              stroke="#C0B283"
              strokeWidth="1"
              rx="4"
            />
            <circle cx="380" cy="50" r="3" class="status-dot" fill="#C0B283" />
            <text
              x="380"
              y="75"
              textAnchor="middle"
              fill="#C0B283"
              fontSize="8"
              opacity="0.7"
            >
              OUT
            </text>
          </g>

          <g class="node-box" opacity="0">
            <rect
              x="5"
              y="110"
              width="30"
              height="30"
              fill="#1a1a1a"
              stroke="#606c38"
              strokeWidth="1"
              rx="4"
            />
            <circle cx="20" cy="125" r="3" class="status-dot" fill="#606c38" />
          </g>

          <g class="node-box" opacity="0">
            <rect
              x="185"
              y="135"
              width="30"
              height="30"
              fill="#1a1a1a"
              stroke="#bc6c25"
              strokeWidth="1"
              rx="4"
            />
            <circle cx="200" cy="150" r="3" class="status-dot" fill="#bc6c25" />
            <text
              x="200"
              y="175"
              textAnchor="middle"
              fill="#bc6c25"
              fontSize="8"
              opacity="0.7"
            >
              AI
            </text>
          </g>

          <g class="node-box" opacity="0">
            <rect
              x="365"
              y="110"
              width="30"
              height="30"
              fill="#1a1a1a"
              stroke="#606c38"
              strokeWidth="1"
              rx="4"
            />
            <circle cx="380" cy="125" r="3" class="status-dot" fill="#606c38" />
          </g>

          <g class="node-box" opacity="0">
            <rect
              x="5"
              y="185"
              width="30"
              height="30"
              fill="#1a1a1a"
              stroke="#bc6c25"
              strokeWidth="1"
              rx="4"
            />
            <circle cx="20" cy="200" r="3" class="status-dot" fill="#bc6c25" />
          </g>

          <g class="node-box" opacity="0">
            <rect
              x="365"
              y="185"
              width="30"
              height="30"
              fill="#1a1a1a"
              stroke="#bc6c25"
              strokeWidth="1"
              rx="4"
            />
            <circle cx="380" cy="200" r="3" class="status-dot" fill="#bc6c25" />
          </g>
        </svg>

        <div class="particles-container absolute inset-0 pointer-events-none">
        </div>
      </div>

      <div class="absolute top-2 left-2 font-mono text-[10px] text-warm-beige/40">
        <span class="text-muted-gold">●</span> DATA_FLOW
      </div>
      <div class="absolute top-2 right-2 font-mono text-[10px] text-warm-beige/40">
        THROUGHPUT: <span class="text-deep-olive">2.4K/s</span>
      </div>
      <div class="absolute bottom-2 left-2 font-mono text-[10px] text-warm-beige/40">
        LATENCY: <span class="text-oxide-red">12ms</span>
      </div>
    </div>
  );
}
