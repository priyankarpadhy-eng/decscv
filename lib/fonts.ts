import {
  Bricolage_Grotesque,
  Instrument_Serif,
  Familjen_Grotesk,
  JetBrains_Mono,
  Unbounded,
  Space_Grotesk,
  Fraunces,
  IBM_Plex_Mono,
  Manrope,
  Archivo_Black,
  DM_Serif_Display,
  Press_Start_2P,
  VT323,
  Syne,
} from "next/font/google";

export const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["700", "800"],
});

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif-accent",
  display: "swap",
  weight: ["400"],
  style: ["italic", "normal"],
});

export const familjenGrotesk = Familjen_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "600"],
});

// Fonts for individual portfolio styles
export const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  display: "swap",
  weight: ["700", "800", "900"],
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "600", "700"],
});

export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex",
  display: "swap",
  weight: ["400", "600"],
});

export const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "600", "700"],
});

export const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  weight: ["400"],
});

export const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
  weight: ["400"],
});

export const pressStart2P = Press_Start_2P({
  subsets: ["latin"],
  variable: "--font-arcade",
  display: "swap",
  weight: ["400"],
});

export const vt323 = VT323({
  subsets: ["latin"],
  variable: "--font-vt323",
  display: "swap",
  weight: ["400"],
});

export const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["600", "700", "800"],
});

export const fontVariables = `${bricolage.variable} ${instrumentSerif.variable} ${familjenGrotesk.variable} ${jetbrainsMono.variable} ${unbounded.variable} ${spaceGrotesk.variable} ${fraunces.variable} ${ibmPlexMono.variable} ${manrope.variable} ${archivoBlack.variable} ${dmSerifDisplay.variable} ${pressStart2P.variable} ${vt323.variable} ${syne.variable}`;
