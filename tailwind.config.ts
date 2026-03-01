/**
 * tailwind.config.ts
 * Lumina Stays – Tailwind CSS configuration
 *
 * Design system overview:
 * - `brand`  : Primary teal palette used for CTAs, links, accents, navbar, footer
 * - `gold`   : Accent highlights (hero text, badges, logo accents)
 * - `sand`   : Warm neutral palette used for ALL page/section backgrounds (no harsh white)
 *              sand-50  (#f8f4ee) – soft parchment  → light sections
 *              sand-100 (#f0ece5) – warm linen       → body background
 *              sand-200 (#e8e2d8) – warm taupe       → deep/alternate sections
 *              sand-300 (#d4cbbf) – warm tan         → borders, dividers
 * - Fonts    : Inter (sans) for body, Playfair Display (serif) for headings
 * - Animations: fade-up / fade-in used in the hero section
 */
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#f0fafa",
          100: "#d0f0f0",
          200: "#a1e1e1",
          300: "#5ec9c9",
          400: "#2aacac",
          500: "#138f8f",
          600: "#0d7070",
          700: "#0a5656",
          800: "#083d3d",
          900: "#052525",
        },
        gold: {
          300: "#f0d080",
          400: "#e8b84b",
          500: "#c9952a",
        },
        sand: {
          50:  "#f8f4ee",
          100: "#f0ece5",
          200: "#e8e2d8",
          300: "#d4cbbf",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.55) 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease forwards",
        "fade-in": "fade-in 0.5s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
