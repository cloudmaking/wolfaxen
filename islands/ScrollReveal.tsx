import { useEffect, useRef } from "preact/hooks";
import anime from "https://esm.sh/animejs@3.2.2";
import { ComponentChildren } from "preact";

interface ScrollRevealProps {
  children: ComponentChildren;
  className?: string;
  delay?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: elementRef.current,
              opacity: [0, 1],
              translateY: [20, 0],
              duration: 900,
              delay: delay,
              easing: "easeOutQuad",
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    if (elementRef.current) {
      // Set initial state
      elementRef.current.style.opacity = "0";
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={elementRef} class={className}>
      {children}
    </div>
  );
}
