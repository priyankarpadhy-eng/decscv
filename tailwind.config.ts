import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{js,ts,jsx,tsx,mdx}",
    "./resume/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        canvas: "var(--canvas)",
        "canvas-subtle": "var(--canvas-subtle)",
        surface: "var(--surface)",
        "surface-subtle": "var(--surface-subtle)",
        ink: {
          DEFAULT: "var(--ink)",
          soft: "var(--ink-soft)",
          muted: "var(--ink-muted)",
        },
        border: {
          subtle: "var(--border-subtle)",
          DEFAULT: "var(--border-default)",
          strong: "var(--border-strong)",
        },
        brand: {
          purple: "var(--brand-purple)",
          "purple-light": "var(--brand-purple-light)",
          coral: "var(--brand-coral)",
          "coral-light": "var(--brand-coral-light)",
          emerald: "var(--brand-emerald)",
          "emerald-light": "var(--brand-emerald-light)",
          amber: "var(--brand-amber)",
          "amber-light": "var(--brand-amber-light)",
          sky: "var(--brand-sky)",
          "sky-light": "var(--brand-sky-light)",
        },
        // Backwards compatibility for existing tokens
        paper: "var(--canvas)",
        "paper-2": "var(--canvas-subtle)",
        "ink-soft": "var(--ink-soft)",
        signal: "var(--brand-coral)",
        acid: "var(--brand-emerald-light)",
        sky: "var(--brand-sky)",
        line: "var(--border-default)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        serifAccent: ["var(--font-serif-accent)", "serif"],
        sans: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(0, 0, 0, 0.03), 0 6px 16px -2px rgba(0, 0, 0, 0.04)",
        hover: "0 2px 6px rgba(0, 0, 0, 0.04), 0 12px 28px -4px rgba(0, 0, 0, 0.08)",
        float: "0 8px 32px -4px rgba(17, 24, 39, 0.08)",
        dropdown: "0 4px 20px -2px rgba(17, 24, 39, 0.1)",
        // subtle soft button shadows
        btn: "0 2px 8px -1px rgba(110, 68, 255, 0.35)",
        "btn-coral": "0 2px 8px -1px rgba(255, 87, 34, 0.35)",
        // Retain hard shadows for styles that need it
        hard: "0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(0, 0, 0, 0.03)",
        "hard-sm": "0 1px 2px rgba(0, 0, 0, 0.04)",
        "hard-lg": "0 8px 24px -4px rgba(0, 0, 0, 0.08)",
      },
      borderRadius: {
        card: "16px",
        "card-lg": "20px",
        xl: "12px",
        pill: "9999px",
      },
      borderWidth: {
        ink: "1px",
      },
    },
  },
  plugins: [],
};

export default config;
