import { useEffect, useRef } from "preact/hooks";
import anime from "https://esm.sh/animejs@3.2.2";

export default function OrbitingNodes() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    anime({
      targets: ".center-core",
      scale: [0, 1],
      opacity: [0, 1],
      easing: "easeOutElastic(1, .5)",
      duration: 1500,
    });

    anime({
      targets: ".core-pulse",
      scale: [1, 2],
      opacity: [0.5, 0],
      easing: "easeOutExpo",
      duration: 2000,
      loop: true,
    });

    anime({
      targets: ".orbit-ring",
      strokeDashoffset: [anime.setDashoffset, 0],
      opacity: [0, 0.3],
      easing: "easeInOutSine",
      duration: 2000,
      delay: anime.stagger(300),
    });

    const orbitSpeeds = [8000, 12000, 16000];
    container.querySelectorAll(".orbit-group").forEach((group, i) => {
      anime({
        targets: group,
        rotate: 360,
        easing: "linear",
        duration: orbitSpeeds[i],
        loop: true,
      });
    });

    container.querySelectorAll(".orbit-node").forEach((node, i) => {
      anime({
        targets: node,
        scale: [0, 1],
        opacity: [0, 1],
        easing: "easeOutBack",
        duration: 800,
        delay: 500 + i * 100,
      });

      anime({
        targets: node,
        scale: [1, 1.2, 1],
        easing: "easeInOutQuad",
        duration: 2000 + i * 200,
        direction: "alternate",
        loop: true,
      });
    });

    anime({
      targets: ".connection-line",
      strokeDashoffset: [anime.setDashoffset, 0],
      opacity: [0, 0.4, 0],
      easing: "easeInOutSine",
      duration: 3000,
      delay: anime.stagger(500),
      loop: true,
    });

    anime({
      targets: ".data-spark",
      translateX: (_el: Element) => anime.random(-100, 100),
      translateY: (_el: Element) => anime.random(-100, 100),
      scale: [0, 1, 0],
      opacity: [0, 1, 0],
      easing: "easeOutExpo",
      duration: 2000,
      delay: anime.stagger(200),
      loop: true,
    });

    anime({
      targets: ".neural-link",
      opacity: [0.1, 0.5, 0.1],
      easing: "easeInOutSine",
      duration: 1500,
      delay: anime.stagger(100),
      loop: true,
    });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      anime({
        targets: ".orbit-container",
        rotateX: -y * 20,
        rotateY: x * 20,
        duration: 400,
        easing: "easeOutQuad",
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const nodes = [
    { orbit: 1, angle: 0, label: "NLP", color: "#C0B283" },
    { orbit: 1, angle: 120, label: "CV", color: "#606c38" },
    { orbit: 1, angle: 240, label: "ML", color: "#bc6c25" },
    { orbit: 2, angle: 45, label: "DATA", color: "#C0B283" },
    { orbit: 2, angle: 135, label: "API", color: "#606c38" },
    { orbit: 2, angle: 225, label: "ETL", color: "#bc6c25" },
    { orbit: 2, angle: 315, label: "RAG", color: "#C0B283" },
    { orbit: 3, angle: 30, label: "GPT", color: "#606c38" },
    { orbit: 3, angle: 90, label: "LLM", color: "#C0B283" },
    { orbit: 3, angle: 150, label: "VEC", color: "#bc6c25" },
    { orbit: 3, angle: 210, label: "EMB", color: "#606c38" },
    { orbit: 3, angle: 270, label: "AGT", color: "#C0B283" },
    { orbit: 3, angle: 330, label: "KG", color: "#bc6c25" },
  ];

  const orbitRadii = [60, 95, 130];

  return (
    <div
      ref={containerRef}
      class="relative w-full h-full flex items-center justify-center"
      style={{ perspective: "800px" }}
    >
      <div
        class="orbit-container relative w-72 h-72"
        style={{ transformStyle: "preserve-3d" }}
      >
        <svg viewBox="0 0 300 300" class="absolute inset-0 w-full h-full">
          <defs>
            <radialGradient id="coreGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#C0B283" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#606c38" stopOpacity="0.2" />
            </radialGradient>
            <filter id="orbitGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {orbitRadii.map((r, i) => (
            <circle
              key={i}
              cx="150"
              cy="150"
              r={r}
              fill="none"
              stroke="#C0B283"
              strokeWidth="1"
              strokeDasharray="4 4"
              class="orbit-ring"
              opacity="0"
            />
          ))}

          {[...Array(12)].map((_, i) => (
            <line
              key={i}
              x1="150"
              y1="150"
              x2={150 + Math.cos(i * 30 * Math.PI / 180) * 130}
              y2={150 + Math.sin(i * 30 * Math.PI / 180) * 130}
              stroke="#C0B283"
              strokeWidth="0.5"
              class="neural-link"
              opacity="0.1"
            />
          ))}

          <circle
            cx="150"
            cy="150"
            r="35"
            class="core-pulse"
            fill="url(#coreGradient)"
          />
          <circle
            cx="150"
            cy="150"
            r="25"
            class="center-core"
            fill="url(#coreGradient)"
            filter="url(#orbitGlow)"
          />
          <text
            x="150"
            y="155"
            textAnchor="middle"
            fill="#0a0a0f"
            fontSize="10"
            fontWeight="bold"
            class="center-core"
          >
            AI
          </text>

          {[1, 2, 3].map((orbitNum) => (
            <g
              key={orbitNum}
              class="orbit-group"
              style={{ transformOrigin: "150px 150px" }}
            >
              {nodes.filter((n) => n.orbit === orbitNum).map((node, i) => {
                const r = orbitRadii[node.orbit - 1];
                const x = 150 + Math.cos(node.angle * Math.PI / 180) * r;
                const y = 150 + Math.sin(node.angle * Math.PI / 180) * r;
                return (
                  <g
                    key={i}
                    class="orbit-node"
                    style={{ transformOrigin: `${x}px ${y}px` }}
                  >
                    <circle
                      cx={x}
                      cy={y}
                      r="12"
                      fill="#0a0a0f"
                      stroke={node.color}
                      strokeWidth="1.5"
                      filter="url(#orbitGlow)"
                    />
                    <text
                      x={x}
                      y={y + 3}
                      textAnchor="middle"
                      fill={node.color}
                      fontSize="6"
                      fontWeight="bold"
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </g>
          ))}

          {[...Array(8)].map((_, i) => (
            <circle
              key={i}
              cx="150"
              cy="150"
              r="2"
              class="data-spark"
              fill="#C0B283"
            />
          ))}
        </svg>
      </div>

      <div class="absolute bottom-2 left-2 font-mono text-[8px] text-warm-beige/30">
        NEURAL_NETWORK_v2.1
      </div>
      <div class="absolute bottom-2 right-2 font-mono text-[8px] text-deep-olive/50">
        ● ACTIVE
      </div>
    </div>
  );
}
