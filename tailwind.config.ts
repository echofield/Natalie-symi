import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#f5efe3",
        "bg-alt": "#eee6d4",
        "bg-deep": "#e3dccc",
        ink: "#1a1612",
        "ink-soft": "#3d342a",
        "ink-mute": "#8a7e6e",
        pompette: "#c94a2e",
        "pompette-deep": "#9c3820",
        "pompette-soft": "#e88968",
        warm: "#b8956a",
        "warm-deep": "#8c6a44",
        "warm-soft": "#d4b892",
        line: "#d8cebb",
        go: "#2a6d4e",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
