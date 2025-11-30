import { useEffect, useRef } from "preact/hooks";
import anime from "https://esm.sh/animejs@3.2.2";

export default function WireframeBlueprint() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const paths = container.querySelectorAll(".blueprint-path");
    const nodes = container.querySelectorAll(".blueprint-node");
    const dataPackets = container.querySelectorAll(".data-packet");

    paths.forEach((path) => {
      const length = (path as SVGPathElement).getTotalLength();
      (path as SVGPathElement).style.strokeDasharray = `${length}`;
      (path as SVGPathElement).style.strokeDashoffset = `${length}`;
    });

    const timeline = anime.timeline({ loop: true });

    timeline
      .add({
        targets: paths,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: "easeInOutCubic",
        duration: 2000,
        delay: anime.stagger(300),
      })
      .add({
        targets: nodes,
        scale: [0, 1],
        opacity: [0, 1],
        easing: "easeOutElastic(1, .5)",
        duration: 800,
        delay: anime.stagger(100),
      }, "-=1000")
      .add({
        targets: dataPackets,
        opacity: [0, 1, 0],
        translateX: [0, 150],
        easing: "easeInOutQuad",
        duration: 1500,
        delay: anime.stagger(200),
        loop: true,
      }, "-=500");

    anime({
      targets: ".pulse-ring",
      scale: [1, 1.5],
      opacity: [0.5, 0],
      easing: "easeOutExpo",
      duration: 2000,
      loop: true,
      delay: anime.stagger(400),
    });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
      };

      anime({
        targets: ".interactive-layer",
        translateX: mouseRef.current.x * 20,
        translateY: mouseRef.current.y * 20,
        duration: 500,
        easing: "easeOutQuad",
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} class="relative w-full h-full cursor-crosshair">
      <svg viewBox="0 0 400 300" class="w-full h-full">
        <defs>
          <linearGradient
            id="blueprintGrad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#C0B283" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#606c38" stopOpacity="0.6" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g class="interactive-layer" filter="url(#glow)">
          <rect
            x="40"
            y="40"
            width="80"
            height="50"
            fill="none"
            stroke="url(#blueprintGrad)"
            strokeWidth="1"
            class="blueprint-path"
            rx="4"
          />
          <rect
            x="160"
            y="60"
            width="80"
            height="50"
            fill="none"
            stroke="url(#blueprintGrad)"
            strokeWidth="1"
            class="blueprint-path"
            rx="4"
          />
          <rect
            x="280"
            y="40"
            width="80"
            height="50"
            fill="none"
            stroke="url(#blueprintGrad)"
            strokeWidth="1"
            class="blueprint-path"
            rx="4"
          />
          <rect
            x="100"
            y="160"
            width="80"
            height="50"
            fill="none"
            stroke="url(#blueprintGrad)"
            strokeWidth="1"
            class="blueprint-path"
            rx="4"
          />
          <rect
            x="220"
            y="160"
            width="80"
            height="50"
            fill="none"
            stroke="url(#blueprintGrad)"
            strokeWidth="1"
            class="blueprint-path"
            rx="4"
          />
          <rect
            x="160"
            y="230"
            width="80"
            height="40"
            fill="none"
            stroke="url(#blueprintGrad)"
            strokeWidth="1"
            class="blueprint-path"
            rx="4"
          />

          <path
            d="M120 65 L160 85"
            fill="none"
            stroke="#C0B283"
            strokeWidth="1"
            class="blueprint-path"
          />
          <path
            d="M240 85 L280 65"
            fill="none"
            stroke="#C0B283"
            strokeWidth="1"
            class="blueprint-path"
          />
          <path
            d="M80 90 L140 160"
            fill="none"
            stroke="#C0B283"
            strokeWidth="1"
            class="blueprint-path"
          />
          <path
            d="M320 90 L260 160"
            fill="none"
            stroke="#C0B283"
            strokeWidth="1"
            class="blueprint-path"
          />
          <path
            d="M140 210 L200 230"
            fill="none"
            stroke="#C0B283"
            strokeWidth="1"
            class="blueprint-path"
          />
          <path
            d="M260 210 L200 230"
            fill="none"
            stroke="#C0B283"
            strokeWidth="1"
            class="blueprint-path"
          />

          <circle
            cx="80"
            cy="65"
            r="4"
            class="blueprint-node"
            fill="#C0B283"
            opacity="0"
          />
          <circle
            cx="200"
            cy="85"
            r="4"
            class="blueprint-node"
            fill="#C0B283"
            opacity="0"
          />
          <circle
            cx="320"
            cy="65"
            r="4"
            class="blueprint-node"
            fill="#C0B283"
            opacity="0"
          />
          <circle
            cx="140"
            cy="185"
            r="4"
            class="blueprint-node"
            fill="#606c38"
            opacity="0"
          />
          <circle
            cx="260"
            cy="185"
            r="4"
            class="blueprint-node"
            fill="#606c38"
            opacity="0"
          />
          <circle
            cx="200"
            cy="250"
            r="4"
            class="blueprint-node"
            fill="#bc6c25"
            opacity="0"
          />

          <circle
            cx="80"
            cy="65"
            r="8"
            class="pulse-ring"
            fill="none"
            stroke="#C0B283"
            strokeWidth="1"
          />
          <circle
            cx="200"
            cy="250"
            r="8"
            class="pulse-ring"
            fill="none"
            stroke="#bc6c25"
            strokeWidth="1"
          />

          <circle
            cx="120"
            cy="65"
            r="3"
            class="data-packet"
            fill="#C0B283"
            opacity="0"
          />
          <circle
            cx="80"
            cy="90"
            r="3"
            class="data-packet"
            fill="#606c38"
            opacity="0"
          />
          <circle
            cx="140"
            cy="210"
            r="3"
            class="data-packet"
            fill="#bc6c25"
            opacity="0"
          />
        </g>

        <text
          x="80"
          y="68"
          textAnchor="middle"
          fill="#C0B283"
          fontSize="8"
          opacity="0.7"
        >
          INPUT
        </text>
        <text
          x="200"
          y="88"
          textAnchor="middle"
          fill="#C0B283"
          fontSize="8"
          opacity="0.7"
        >
          PROCESS
        </text>
        <text
          x="320"
          y="68"
          textAnchor="middle"
          fill="#C0B283"
          fontSize="8"
          opacity="0.7"
        >
          VALIDATE
        </text>
        <text
          x="140"
          y="188"
          textAnchor="middle"
          fill="#606c38"
          fontSize="8"
          opacity="0.7"
        >
          TRANSFORM
        </text>
        <text
          x="260"
          y="188"
          textAnchor="middle"
          fill="#606c38"
          fontSize="8"
          opacity="0.7"
        >
          ROUTE
        </text>
        <text
          x="200"
          y="253"
          textAnchor="middle"
          fill="#bc6c25"
          fontSize="8"
          opacity="0.7"
        >
          OUTPUT
        </text>
      </svg>

      <div class="absolute top-2 left-2 font-mono text-[10px] text-muted-gold/50">
        BLUEPRINT_v2.4
      </div>
      <div class="absolute bottom-2 right-2 font-mono text-[10px] text-muted-gold/50">
        WOLFAXEN_SYS
      </div>
    </div>
  );
}
