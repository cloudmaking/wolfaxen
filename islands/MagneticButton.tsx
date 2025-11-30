import { useRef } from "preact/hooks";
import anime from "https://esm.sh/animejs@3.2.2";

interface MagneticButtonProps {
  children: preact.ComponentChildren;
  href?: string;
  className?: string;
  variant?: "primary" | "outline";
}

export default function MagneticButton({
  children,
  href,
  className = "",
  variant = "primary",
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (!btnRef.current) return;
    const btn = btnRef.current;
    const rect = btn.getBoundingClientRect();

    // Calculate distance from center of button
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    // Move the button partially towards the mouse (0.4 friction)
    anime({
      targets: btn,
      translateX: x * 0.4,
      translateY: y * 0.4,
      duration: 50,
      easing: "linear",
    });
  };

  const handleMouseLeave = () => {
    // Snap back to center using spring physics
    anime({
      targets: btnRef.current,
      translateX: 0,
      translateY: 0,
      duration: 1200,
      easing: "easeOutElastic(1, .5)",
    });
  };

  const baseStyles =
    "inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 relative z-10";
  const variants = {
    primary:
      "bg-muted-gold text-oreo-black hover:bg-light-gold shadow-lg hover:shadow-muted-gold/50",
    outline: "border border-muted-gold text-muted-gold hover:bg-muted-gold/10",
  };

  const Component = href ? "a" : "button";

  return (
    <div class="p-4 flex justify-center">
      <Component
        ref={btnRef}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        class={`${baseStyles} ${variants[variant]} ${className}`}
      >
        {children}
      </Component>
    </div>
  );
}
