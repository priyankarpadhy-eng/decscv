import { StyleId } from "../lib/types";

export interface StyleMeta {
  id: StyleId;
  name: string;
  vibe: string;
  tags: string[];
  defaultAccent: string;
  defaultBg: string;
  defaultFg: string;
  supportsDark: boolean;
  fontPairs: {
    name: string;
    display: string;
    body: string;
  }[];
  palette: string[];
}

export const STYLES_REGISTRY: Record<StyleId, StyleMeta> = {
  noir: {
    id: "noir",
    name: "Noir Neon",
    vibe: "Dark, tactile, cursor spotlight with high contrast",
    tags: ["DARK", "DEV", "MINIMAL"],
    defaultAccent: "#C6FF3D",
    defaultBg: "#07070A",
    defaultFg: "#EDEDED",
    supportsDark: false,
    fontPairs: [
      { name: "Unbounded + Space", display: "var(--font-unbounded)", body: "var(--font-space)" },
      { name: "Unbounded + Mono", display: "var(--font-unbounded)", body: "var(--font-mono)" },
      { name: "Syne + Space", display: "var(--font-syne)", body: "var(--font-space)" },
    ],
    palette: ["#C6FF3D", "#FF2E88", "#00F0FF", "#FFE600", "#7000FF", "#FFFFFF"],
  },
  paper: {
    id: "paper",
    name: "Paper",
    vibe: "Quiet, literary minimal, editorial typography",
    tags: ["LIGHT", "WRITER", "CLEAN"],
    defaultAccent: "#C2410C",
    defaultBg: "#FAF7F0",
    defaultFg: "#1B1A17",
    supportsDark: false,
    fontPairs: [
      { name: "Fraunces + Familjen", display: "var(--font-fraunces)", body: "var(--font-body)" },
      { name: "DM Serif + Body", display: "var(--font-dm-serif)", body: "var(--font-body)" },
      { name: "Instrument + Mono", display: "var(--font-serif-accent)", body: "var(--font-mono)" },
    ],
    palette: ["#C2410C", "#991B1B", "#166534", "#1E3A8A", "#4C1D95", "#0F172A"],
  },
  terminal: {
    id: "terminal",
    name: "Terminal",
    vibe: "Interactive shell, CLI commands, ASCII stats",
    tags: ["DARK", "DEV", "CLI"],
    defaultAccent: "#39FF88",
    defaultBg: "#0B0F0C",
    defaultFg: "#C9F7D1",
    supportsDark: false,
    fontPairs: [
      { name: "JetBrains + IBM Plex", display: "var(--font-mono)", body: "var(--font-ibm-plex)" },
      { name: "Pure JetBrains", display: "var(--font-mono)", body: "var(--font-mono)" },
      { name: "Pure IBM Plex", display: "var(--font-ibm-plex)", body: "var(--font-ibm-plex)" },
    ],
    palette: ["#39FF88", "#FFB000", "#00FFFF", "#FF5252", "#E0E0E0", "#99FF99"],
  },
  bento: {
    id: "bento",
    name: "Bento",
    vibe: "Structured tile grid with card depth and clean hierarchy",
    tags: ["LIGHT", "DESIGN", "MODERN"],
    defaultAccent: "#3B82F6",
    defaultBg: "#EDEDE9",
    defaultFg: "#121212",
    supportsDark: true,
    fontPairs: [
      { name: "Bricolage + Manrope", display: "var(--font-display)", body: "var(--font-manrope)" },
      { name: "Syne + Manrope", display: "var(--font-syne)", body: "var(--font-manrope)" },
      { name: "Familjen + Space", display: "var(--font-body)", body: "var(--font-space)" },
    ],
    palette: ["#3B82F6", "#FF4D1C", "#10B981", "#8B5CF6", "#F59E0B", "#121212"],
  },
  brutal: {
    id: "brutal",
    name: "Brutal",
    vibe: "Neo-brutalist raw black borders, tilted badges, hard shadows",
    tags: ["LOUD", "MAKER", "BOLD"],
    defaultAccent: "#FFE600",
    defaultBg: "#FFFDF5",
    defaultFg: "#000000",
    supportsDark: false,
    fontPairs: [
      { name: "Archivo + Space", display: "var(--font-archivo)", body: "var(--font-space)" },
      { name: "Bricolage + Mono", display: "var(--font-display)", body: "var(--font-mono)" },
      { name: "Unbounded + Space", display: "var(--font-unbounded)", body: "var(--font-space)" },
    ],
    palette: ["#FFE600", "#FF5CAA", "#00D1FF", "#44E26A", "#FF4D1C", "#FFFFFF"],
  },
  gazette: {
    id: "gazette",
    name: "Gazette",
    vibe: "Editorial newspaper masthead with multi-column text",
    tags: ["EDITORIAL", "RESEARCH", "VINTAGE"],
    defaultAccent: "#B3261E",
    defaultBg: "#F1ECE1",
    defaultFg: "#161616",
    supportsDark: false,
    fontPairs: [
      { name: "DM Serif + Fraunces", display: "var(--font-dm-serif)", body: "var(--font-fraunces)" },
      { name: "Fraunces + Familjen", display: "var(--font-fraunces)", body: "var(--font-body)" },
      { name: "DM Serif + Mono", display: "var(--font-dm-serif)", body: "var(--font-mono)" },
    ],
    palette: ["#B3261E", "#1E3A8A", "#2E4B31", "#5C3D28", "#121212", "#D97706"],
  },
  arcade: {
    id: "arcade",
    name: "Arcade",
    vibe: "8-bit retro gaming HUD with quest logs and level select",
    tags: ["RETRO", "GAMER", "8-BIT"],
    defaultAccent: "#FFD23F",
    defaultBg: "#1A1033",
    defaultFg: "#F5F3FF",
    supportsDark: false,
    fontPairs: [
      { name: "Press Start + VT323", display: "var(--font-arcade)", body: "var(--font-vt323)" },
      { name: "VT323 Only", display: "var(--font-vt323)", body: "var(--font-vt323)" },
      { name: "Press Start + Mono", display: "var(--font-arcade)", body: "var(--font-mono)" },
    ],
    palette: ["#FFD23F", "#EE4266", "#3BCEAC", "#00E8C6", "#FFFFFF", "#FF5964"],
  },
  blueprint: {
    id: "blueprint",
    name: "Blueprint",
    vibe: "Architectural blueprint with title block and technical grid",
    tags: ["ENGINEERING", "TECHNICAL", "BLUEPRINT"],
    defaultAccent: "#FFD166",
    defaultBg: "#0D3B66",
    defaultFg: "#F4F9FF",
    supportsDark: false,
    fontPairs: [
      { name: "IBM Plex + Syne", display: "var(--font-syne)", body: "var(--font-ibm-plex)" },
      { name: "IBM Plex Pure", display: "var(--font-ibm-plex)", body: "var(--font-ibm-plex)" },
      { name: "Space + Mono", display: "var(--font-space)", body: "var(--font-mono)" },
    ],
    palette: ["#FFD166", "#FF6B6B", "#48CAE4", "#06D6A0", "#FFFFFF", "#FFB703"],
  },
};
