import { useEffect, useRef } from "preact/hooks";
import anime from "https://esm.sh/animejs@3.2.2";

export default function CircuitBoard() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    anime({
      targets: svgRef.current.querySelectorAll(".circuit-path"),
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: "easeInOutSine",
      duration: 3000,
      delay: function (_el, i) {
        return i * 500;
      },
      direction: "alternate",
      loop: true,
    });
  }, []);

  return (
    <div class="w-full h-64 opacity-30">
      <svg
        ref={svgRef}
        viewBox="0 0 400 200"
        class="w-full h-full stroke-muted-gold stroke-1 fill-none"
      >
        {/* Circuit Paths */}
        <path class="circuit-path" d="M10,100 L50,100 L50,50 L100,50" />
        <path class="circuit-path" d="M100,50 L150,50 L150,150 L200,150" />
        <path class="circuit-path" d="M200,150 L250,150 L250,20 L300,20" />
        <path class="circuit-path" d="M300,20 L350,20 L350,180 L390,180" />

        {/* Secondary Paths */}
        <path class="circuit-path" d="M50,100 L50,150 L100,150" />
        <path class="circuit-path" d="M250,150 L250,180 L300,180" />

        {/* Nodes */}
        <circle cx="100" cy="50" r="3" class="fill-muted-gold" />
        <circle cx="200" cy="150" r="3" class="fill-muted-gold" />
        <circle cx="300" cy="20" r="3" class="fill-muted-gold" />
      </svg>
    </div>
  );
}
