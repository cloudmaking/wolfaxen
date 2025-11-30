import { useEffect, useRef } from "preact/hooks";
import anime from "https://esm.sh/animejs@3.2.2";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export default function HeroPointerField() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const trackerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const field = fieldRef.current;
    const tracker = trackerRef.current;
    if (!field || !tracker) return;

    let bounds = field.getBoundingClientRect();
    const refreshBounds = () => {
      bounds = field.getBoundingClientRect();
    };

    const animateTo = (x: number, y: number) => {
      anime.remove(stateRef.current);
      anime({
        targets: stateRef.current,
        x,
        y,
        duration: 500,
        easing: "easeOutCubic",
        update: () => {
          tracker.style.transform =
            `translate(-50%, -50%) translate3d(${stateRef.current.x}px, ${stateRef.current.y}px, 0)`;
        },
      });
    };

    const handlePointerMove = (event: PointerEvent) => {
      const { left, top, width, height } = bounds;
      const hw = width / 2;
      const hh = height / 2;
      const localX = clamp(event.clientX - left - hw, -hw, hw);
      const localY = clamp(event.clientY - top - hh, -hh, hh);
      animateTo(localX, localY);
    };

    const handlePointerLeave = () => animateTo(0, 0);

    tracker.style.transform = "translate(-50%, -50%)";
    field.addEventListener("pointermove", handlePointerMove);
    field.addEventListener("pointerleave", handlePointerLeave);
    globalThis.addEventListener("resize", refreshBounds);

    return () => {
      field.removeEventListener("pointermove", handlePointerMove);
      field.removeEventListener("pointerleave", handlePointerLeave);
      globalThis.removeEventListener("resize", refreshBounds);
      anime.remove(stateRef.current);
    };
  }, []);

  return (
    <div
      ref={fieldRef}
      class="group relative mx-auto max-w-4xl h-64 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-transparent to-white/5 overflow-hidden backdrop-blur-md"
    >
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.06),_transparent_65%)]">
      </div>
      <div class="absolute inset-4 rounded-2xl border border-white/5 [mask-image:radial-gradient(circle,_rgba(255,255,255,0.9),_transparent_70%)]">
        <div class="absolute inset-0 bg-[linear-gradient(45deg,_rgba(255,255,255,0.03)_25%,_transparent_25%,_transparent_50%,_rgba(255,255,255,0.03)_50%,_rgba(255,255,255,0.03)_75%,_transparent_75%,_transparent)] bg-[length:20px_20px] opacity-60 animate-pulse">
        </div>
      </div>

      <div class="absolute top-6 left-6 text-xs uppercase tracking-[0.4em] text-muted-gold">
        Telemetry
      </div>
      <div class="absolute bottom-6 right-6 flex gap-6 text-right text-sm text-warm-beige/60">
        <div>
          <p class="text-xs uppercase tracking-[0.3em] text-muted-gold">
            Cycle
          </p>
          <p class="text-2xl font-display text-warm-beige">0.72s</p>
        </div>
        <div>
          <p class="text-xs uppercase tracking-[0.3em] text-muted-gold">
            Uptime
          </p>
          <p class="text-2xl font-display text-warm-beige">99.3%</p>
        </div>
      </div>

      <div
        ref={trackerRef}
        class="absolute top-1/2 left-1/2 w-48 h-48 rounded-2xl border border-muted-gold/40 bg-muted-gold/10 shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition-shadow duration-300"
      >
        <div class="absolute inset-0 bg-gradient-to-br from-muted-gold/40 via-transparent to-white/10 opacity-70">
        </div>
        <div class="absolute inset-5 rounded-xl border border-white/10 bg-oreo-black/40 backdrop-blur-xl p-4 flex flex-col justify-between">
          <div>
            <p class="text-xs uppercase tracking-[0.4em] text-muted-gold mb-1">
              Signal
            </p>
            <p class="text-3xl font-display text-warm-beige">Flow 01</p>
          </div>
          <div class="grid grid-cols-2 gap-2 text-xs">
            <div>
              <p class="text-muted-gold">Latency</p>
              <p class="text-warm-beige text-lg font-semibold">42ms</p>
            </div>
            <div>
              <p class="text-muted-gold">Load</p>
              <p class="text-warm-beige text-lg font-semibold">0.64</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
