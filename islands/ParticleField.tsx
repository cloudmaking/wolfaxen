import { useEffect, useRef } from "preact/hooks";
import anime from "https://esm.sh/animejs@3.2.2";

export default function ParticleField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const particlesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Mobile check
    const isMobile = globalThis.innerWidth < 768;
    const particleCount = isMobile ? 20 : 50;
    const particles: HTMLDivElement[] = [];
    let animationFrameId: number;
    let isVisible = true;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      const size = 2 + Math.random() * 4;
      const colors = ["#C0B283", "#606c38", "#bc6c25", "#F4E1D2"];
      const color = colors[Math.floor(Math.random() * colors.length)];

      particle.className = "absolute rounded-full pointer-events-none";
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = color;
      particle.style.opacity = `${0.3 + Math.random() * 0.4}`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.filter = `blur(${Math.random() > 0.7 ? 1 : 0}px)`;

      container.appendChild(particle);
      particles.push(particle);

      anime({
        targets: particle,
        translateX: () => anime.random(-30, 30),
        translateY: () => anime.random(-30, 30),
        scale: [1, 1.2 + Math.random() * 0.3, 1],
        opacity: [particle.style.opacity, 0.1, particle.style.opacity],
        duration: 3000 + Math.random() * 4000,
        easing: "easeInOutSine",
        direction: "alternate",
        loop: true,
        delay: Math.random() * 2000,
      });
    }

    particlesRef.current = particles;

    const lineCanvas = document.createElement("canvas");
    lineCanvas.className = "absolute inset-0 w-full h-full pointer-events-none";

    // Set canvas size
    const setCanvasSize = () => {
      lineCanvas.width = container.offsetWidth * 2;
      lineCanvas.height = container.offsetHeight * 2;
      lineCanvas.style.width = "100%";
      lineCanvas.style.height = "100%";
    };
    setCanvasSize();

    container.insertBefore(lineCanvas, container.firstChild);

    const ctx = lineCanvas.getContext("2d");

    const drawLines = () => {
      if (!ctx || !isVisible) return;
      ctx.clearRect(0, 0, lineCanvas.width, lineCanvas.height);

      const mouseX = mouseRef.current.x * lineCanvas.width;
      const mouseY = mouseRef.current.y * lineCanvas.height;

      particles.forEach((p1, i) => {
        const rect1 = p1.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const x1 = ((rect1.left - containerRect.left + rect1.width / 2) /
          containerRect.width) * lineCanvas.width;
        const y1 = ((rect1.top - containerRect.top + rect1.height / 2) /
          containerRect.height) * lineCanvas.height;

        const distToMouse = Math.sqrt((x1 - mouseX) ** 2 + (y1 - mouseY) ** 2);
        if (distToMouse < 150) {
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(192, 178, 131, ${0.3 - distToMouse / 500})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Only draw connections between particles on desktop to save perf
        if (!isMobile) {
          particles.slice(i + 1).forEach((p2) => {
            const rect2 = p2.getBoundingClientRect();
            const x2 = ((rect2.left - containerRect.left + rect2.width / 2) /
              containerRect.width) * lineCanvas.width;
            const y2 = ((rect2.top - containerRect.top + rect2.height / 2) /
              containerRect.height) * lineCanvas.height;

            const dist = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
            if (dist < 100) {
              ctx.beginPath();
              ctx.moveTo(x1, y1);
              ctx.lineTo(x2, y2);
              ctx.strokeStyle = `rgba(96, 108, 56, ${0.15 - dist / 800})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          });
        }
      });

      animationFrameId = requestAnimationFrame(drawLines);
    };

    drawLines();

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) return;
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };

      particles.forEach((particle) => {
        const pRect = particle.getBoundingClientRect();
        const px = (pRect.left - rect.left + pRect.width / 2) / rect.width;
        const py = (pRect.top - rect.top + pRect.height / 2) / rect.height;

        const dx = mouseRef.current.x - px;
        const dy = mouseRef.current.y - py;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 0.15) {
          anime({
            targets: particle,
            translateX: -dx * 50,
            translateY: -dy * 50,
            duration: 300,
            easing: "easeOutQuad",
          });
        }
      });
    };

    container.addEventListener("mousemove", handleMouseMove);

    // Observers
    const resizeObserver = new ResizeObserver(() => {
      setCanvasSize();
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          drawLines();
        } else {
          cancelAnimationFrame(animationFrameId);
        }
      });
    });
    intersectionObserver.observe(container);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      particles.forEach((p) => p.remove());
      lineCanvas.remove();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      class="absolute inset-0 overflow-hidden pointer-events-auto"
    >
      <div class="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-oreo-black/50 pointer-events-none">
      </div>
    </div>
  );
}
