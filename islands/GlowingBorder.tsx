import { ComponentChildren } from "preact";

interface GlowingBorderProps {
  children: ComponentChildren;
  className?: string;
  color?: string; // Main glow color (hex or tailwind class ref)
}

export default function GlowingBorder({
  children,
  className = "",
  color = "#B9B07B", // Default muted gold
}: GlowingBorderProps) {
  return (
    <div class={`relative group ${className}`}>
      {/* Animated Border Container */}
      <div class="absolute -inset-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-border-spin pointer-events-none" />

      {/* Moving Spotlight Border */}
      <div
        class="absolute -inset-[1px] rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
        style={{
          background:
            `conic-gradient(from 0deg at 50% 50%, transparent 0deg, ${color} 60deg, transparent 120deg)`,
          animation: "spin 4s linear infinite",
        }}
      />

      {/* Inner Content Mask - ensures content sits on top */}
      <div class="relative h-full w-full rounded-[inherit] bg-oreo-black z-10">
        {children}
      </div>

      <style>
        {`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}
      </style>
    </div>
  );
}
