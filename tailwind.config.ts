import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "oreo-black": "#111111",
        "muted-gold": "#B9B07B",
        "deep-olive": "#71744F",
        "warm-beige": "#D5C0A5",
        "light-gold": "#EDCE91",
        "oxide-red": "#5C2120",
        "terra-cotta": "#BA7770",
        "soft-cream": "#F7F4EF", // Keeping for legacy/fallback
        "steel-grey": "#2C2C2E", // Keeping for legacy/fallback
      },
      fontFamily: {
        sans: ["Inter", "Satoshi", "sans-serif"],
        display: ["Clash Display", "Sora", "Space Grotesk", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-glow":
          "conic-gradient(from 180deg at 50% 50%, #5C2120 0deg, #111111 180deg, #71744F 360deg)",
      },
    },
  },
} satisfies Config;
