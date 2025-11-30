import { useEffect, useRef, useState } from "preact/hooks";
import anime from "https://esm.sh/animejs@3.2.2";

export default function PixelRobot() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 });
  const robotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    anime({
      targets: ".robot-body",
      translateY: [-3, 3],
      duration: 1500,
      easing: "easeInOutSine",
      direction: "alternate",
      loop: true,
    });

    anime({
      targets: ".robot-antenna",
      rotate: [-5, 5],
      duration: 800,
      easing: "easeInOutQuad",
      direction: "alternate",
      loop: true,
    });

    anime({
      targets: ".antenna-light",
      opacity: [0.3, 1],
      scale: [0.8, 1.2],
      duration: 500,
      easing: "easeInOutQuad",
      direction: "alternate",
      loop: true,
    });

    anime({
      targets: ".robot-arm-left",
      rotate: [0, -10, 0],
      duration: 2000,
      easing: "easeInOutQuad",
      loop: true,
    });

    anime({
      targets: ".robot-arm-right",
      rotate: [0, 10, 0],
      duration: 2000,
      easing: "easeInOutQuad",
      loop: true,
      delay: 500,
    });

    anime({
      targets: ".chest-light",
      opacity: [0.5, 1, 0.5],
      duration: 1000,
      easing: "easeInOutSine",
      loop: true,
    });

    anime({
      targets: ".scan-line",
      translateY: [0, 60],
      opacity: [0.8, 0],
      duration: 2000,
      easing: "linear",
      loop: true,
    });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / rect.width;
      const deltaY = (e.clientY - centerY) / rect.height;

      setEyePos({
        x: Math.max(-3, Math.min(3, deltaX * 6)),
        y: Math.max(-2, Math.min(2, deltaY * 4)),
      });

      anime({
        targets: robotRef.current,
        rotateY: deltaX * 10,
        rotateX: -deltaY * 5,
        duration: 300,
        easing: "easeOutQuad",
      });
    };

    const handleMouseEnter = () => {
      anime({
        targets: ".robot-body",
        scale: 1.05,
        duration: 300,
        easing: "easeOutBack",
      });
    };

    const handleMouseLeave = () => {
      setEyePos({ x: 0, y: 0 });
      anime({
        targets: ".robot-body",
        scale: 1,
        rotateY: 0,
        rotateX: 0,
        duration: 500,
        easing: "easeOutQuad",
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      class="relative w-full h-full flex items-center justify-center cursor-pointer"
      style={{ perspective: "500px" }}
    >
      <div
        ref={robotRef}
        class="robot-body relative"
        style={{ transformStyle: "preserve-3d" }}
      >
        <svg viewBox="0 0 120 160" class="w-32 h-40">
          <defs>
            <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4a4a4a" />
              <stop offset="50%" stopColor="#6a6a6a" />
              <stop offset="100%" stopColor="#3a3a3a" />
            </linearGradient>
            <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1a1a2e" />
              <stop offset="100%" stopColor="#0a0a15" />
            </linearGradient>
            <filter id="robotGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g class="robot-antenna" style={{ transformOrigin: "60px 25px" }}>
            <rect
              x="57"
              y="5"
              width="6"
              height="20"
              fill="url(#metalGrad)"
              rx="2"
            />
            <circle
              cx="60"
              cy="5"
              r="6"
              class="antenna-light"
              fill="#C0B283"
              filter="url(#robotGlow)"
            />
          </g>

          <rect
            x="30"
            y="25"
            width="60"
            height="55"
            fill="url(#metalGrad)"
            rx="8"
          />
          <rect
            x="35"
            y="30"
            width="50"
            height="40"
            fill="url(#screenGrad)"
            rx="4"
          />

          <g class="robot-eyes">
            <rect x="40" y="38" width="14" height="10" fill="#0f0f0f" rx="2" />
            <rect x="66" y="38" width="14" height="10" fill="#0f0f0f" rx="2" />
            <rect
              x={44 + eyePos.x}
              y={40 + eyePos.y}
              width="6"
              height="6"
              fill="#C0B283"
              rx="1"
              filter="url(#robotGlow)"
            />
            <rect
              x={70 + eyePos.x}
              y={40 + eyePos.y}
              width="6"
              height="6"
              fill="#C0B283"
              rx="1"
              filter="url(#robotGlow)"
            />
          </g>

          <rect x="42" y="55" width="36" height="3" fill="#333" rx="1" />
          <rect
            x="45"
            y="55"
            width="6"
            height="3"
            fill="#C0B283"
            class="chest-light"
            rx="1"
          />
          <rect
            x="57"
            y="55"
            width="6"
            height="3"
            fill="#606c38"
            class="chest-light"
            rx="1"
          />
          <rect
            x="69"
            y="55"
            width="6"
            height="3"
            fill="#bc6c25"
            class="chest-light"
            rx="1"
          />

          <rect
            class="scan-line"
            x="36"
            y="31"
            width="48"
            height="2"
            fill="#C0B283"
            opacity="0.3"
            rx="1"
          />

          <rect
            x="35"
            y="85"
            width="50"
            height="45"
            fill="url(#metalGrad)"
            rx="6"
          />
          <circle
            cx="60"
            cy="100"
            r="8"
            class="chest-light"
            fill="#606c38"
            opacity="0.8"
            filter="url(#robotGlow)"
          />
          <rect x="45" y="112" width="30" height="4" fill="#333" rx="2" />
          <rect x="50" y="120" width="20" height="4" fill="#333" rx="2" />

          <g class="robot-arm-left" style={{ transformOrigin: "30px 90px" }}>
            <rect
              x="15"
              y="88"
              width="15"
              height="35"
              fill="url(#metalGrad)"
              rx="4"
            />
            <rect
              x="17"
              y="120"
              width="11"
              height="12"
              fill="url(#metalGrad)"
              rx="3"
            />
          </g>

          <g class="robot-arm-right" style={{ transformOrigin: "90px 90px" }}>
            <rect
              x="90"
              y="88"
              width="15"
              height="35"
              fill="url(#metalGrad)"
              rx="4"
            />
            <rect
              x="92"
              y="120"
              width="11"
              height="12"
              fill="url(#metalGrad)"
              rx="3"
            />
          </g>

          <rect
            x="40"
            y="132"
            width="15"
            height="25"
            fill="url(#metalGrad)"
            rx="4"
          />
          <rect
            x="65"
            y="132"
            width="15"
            height="25"
            fill="url(#metalGrad)"
            rx="4"
          />
          <rect x="38" y="155" width="19" height="5" fill="#333" rx="2" />
          <rect x="63" y="155" width="19" height="5" fill="#333" rx="2" />
        </svg>
      </div>

      <div class="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[10px] text-muted-gold/40">
        UNIT_WX-01
      </div>
    </div>
  );
}
