import { useEffect, useRef } from "preact/hooks";
import anime from "https://esm.sh/animejs@3.2.2";

export default function NeuralGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gridEl = gridRef.current;
    if (!gridEl) return;

    // Clear previous content
    gridEl.innerHTML = "";

    // Create 10x10 Grid
    for (let i = 0; i < 100; i++) {
      const dot = document.createElement("div");
      dot.className = "w-1.5 h-1.5 bg-muted-gold/30 rounded-full";
      gridEl.appendChild(dot);
    }

    // Anime.js Animation
    anime({
      targets: gridEl.children,
      scale: [
        { value: 0.1, easing: "easeOutSine", duration: 500 },
        { value: 1, easing: "easeInOutQuad", duration: 1200 },
      ],
      delay: anime.stagger(200, { grid: [10, 10], from: "center" }),
      loop: true,
      direction: "alternate",
    });
  }, []);

  return (
    <div
      ref={gridRef}
      class="grid grid-cols-10 gap-4 w-fit mx-auto opacity-30 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
    >
      {/* Dots injected here */}
    </div>
  );
}
