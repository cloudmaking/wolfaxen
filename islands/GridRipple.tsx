import { useEffect, useRef } from "preact/hooks";
import anime from "https://esm.sh/animejs@3.2.2";

export default function GridRipple() {
  const gridRef = useRef<HTMLDivElement>(null);
  const rows = 8;
  const cols = 12;

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    grid.innerHTML = ""; // Reset

    // Generate dots with data attributes
    for (let i = 0; i < rows * cols; i++) {
      const dot = document.createElement("div");
      dot.className =
        "dot w-1.5 h-1.5 bg-white/10 rounded-full cursor-pointer transition-colors hover:bg-muted-gold/80";
      dot.dataset.index = i.toString();

      dot.addEventListener("mouseenter", () => {
        anime({
          targets: grid.children,
          scale: [
            { value: 2, easing: "easeOutSine", duration: 200 },
            { value: 1, easing: "easeInOutQuad", duration: 500 },
          ],
          // The magic: Stagger from the hovered index
          delay: anime.stagger(50, { grid: [cols, rows], from: i }),
        });
      });

      grid.appendChild(dot);
    }
  }, []);

  return (
    <div
      ref={gridRef}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      class="grid gap-6 w-fit mx-auto p-10 opacity-50"
    >
    </div>
  );
}
