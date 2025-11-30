import { useRef } from "preact/hooks";
import { ComponentChildren } from "preact";
import anime from "https://esm.sh/animejs@3.2.2";

interface MagneticCardProps {
  children: ComponentChildren;
  className?: string;
  intensity?: number; // How strong the tilt is (default 10)
  glowColor?: string; // Color of the spotlight glow
}

export default function MagneticCard({
  children,
  className = "",
  intensity = 10,
  glowColor: _glowColor = "rgba(255, 255, 255, 0.1)",
}: MagneticCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element.
    const y = e.clientY - rect.top; // y position within the element.

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -intensity;
    const rotateY = ((x - centerX) / centerX) * intensity;

    anime({
      targets: card,
      rotateX: rotateX,
      rotateY: rotateY,
      scale: 1.02,
      duration: 100,
      easing: "linear",
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    anime({
      targets: cardRef.current,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 800,
      easing: "easeOutElastic(1, .6)",
    });
  };

  return (
    <div class="perspective-1000 h-full">
      {/* Tailwind utility for 3D perspective */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        class={`h-full relative group transform-style-3d ${className}`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </div>
    </div>
  );
}
