import { useRef } from "preact/hooks";
import anime from "https://esm.sh/animejs@3.2.2";
import { JSX } from "preact";

interface AnimatedButtonProps extends JSX.HTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "secondary" | "outline";
  href?: string;
}

export default function AnimatedButton(props: AnimatedButtonProps) {
  const { variant = "primary", className = "", children, ...rest } = props;
  const lineRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    anime({
      targets: lineRef.current,
      width: ["0%", "100%"],
      easing: "easeOutCubic",
      duration: 400,
    });
  };

  const handleMouseLeave = () => {
    anime({
      targets: lineRef.current,
      width: ["100%", "0%"],
      easing: "easeOutCubic",
      duration: 400,
    });
  };

  const baseStyles =
    "relative inline-flex items-center justify-center px-8 py-3 text-sm font-medium transition-all duration-300 rounded-lg overflow-hidden group";

  const variants = {
    primary: "bg-muted-gold text-oreo-black hover:bg-light-gold",
    secondary: "bg-deep-olive text-warm-beige hover:bg-deep-olive/80",
    outline: "border border-muted-gold text-muted-gold hover:text-light-gold",
  };

  return (
    <a
      {...rest}
      class={`${baseStyles} ${variants[variant]} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span class="relative z-10">{children}</span>
      {/* Underline Sweep Element */}
      <div
        ref={lineRef}
        class="absolute bottom-0 left-0 h-[2px] bg-white/30 w-0"
      >
      </div>
    </a>
  );
}
