import { useEffect, useRef } from "preact/hooks";
import anime from "https://esm.sh/animejs@3.2.2";

export default function ProcessNode() {
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!nodeRef.current) return;

    anime({
      targets: nodeRef.current,
      scale: [1, 1.2],
      opacity: [1, 0.6],
      duration: 1500,
      direction: "alternate",
      easing: "easeInOutSine",
      loop: true,
    });
  }, []);

  return (
    <div
      ref={nodeRef}
      class="w-3 h-3 rounded-full bg-muted-gold shadow-[0_0_10px_rgba(192,178,131,0.5)]"
    >
    </div>
  );
}
