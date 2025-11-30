import { useEffect, useRef } from "preact/hooks";
import anime from "https://esm.sh/animejs@3.2.2";
import { ComponentChildren } from "preact";

interface StaggeredGridProps {
  children: ComponentChildren;
  className?: string;
}

export default function StaggeredGrid(
  { children, className = "" }: StaggeredGridProps,
) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: Array.from(containerRef.current!.children),
              opacity: [0, 1],
              translateY: [20, 0],
              easing: "easeOutExpo",
              duration: 800,
              delay: anime.stagger(150), // 150ms delay between each item
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    // Initial setup: hide children
    Array.from(containerRef.current.children).forEach((child) => {
      (child as HTMLElement).style.opacity = "0";
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} class={className}>
      {children}
    </div>
  );
}
