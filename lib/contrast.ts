/**
 * Calculates relative luminance and contrast ratio according to WCAG 2.1 specifications.
 */

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let clean = hex.replace("#", "");
  if (clean.length === 3) {
    clean = clean.split("").map((c) => c + c).join("");
  }
  const num = parseInt(clean, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return (
    "#" +
    [clamp(r), clamp(g), clamp(b)]
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("")
  );
}

function getLuminance(r: number, g: number, b: number): number {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export function getContrastRatio(hex1: string, hex2: string): number {
  try {
    const rgb1 = hexToRgb(hex1);
    const rgb2 = hexToRgb(hex2);
    const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  } catch {
    return 1;
  }
}

/**
 * Ensures a color meets minimum WCAG AA contrast against a background.
 * If contrast is below minRatio (default 4.5), it darkens or lightens the color incrementally.
 */
export function ensureContrast(
  accentHex: string,
  bgHex: string,
  minRatio: number = 4.5
): string {
  try {
    let currentHex = accentHex;
    let ratio = getContrastRatio(currentHex, bgHex);
    if (ratio >= minRatio) return currentHex;

    const bgRgb = hexToRgb(bgHex);
    const bgLum = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
    const shouldLighten = bgLum < 0.5;

    let { r, g, b } = hexToRgb(currentHex);

    for (let step = 0; step < 40; step++) {
      if (shouldLighten) {
        r = Math.min(255, r + 6);
        g = Math.min(255, g + 6);
        b = Math.min(255, b + 6);
      } else {
        r = Math.max(0, r - 6);
        g = Math.max(0, g - 6);
        b = Math.max(0, b - 6);
      }
      currentHex = rgbToHex(r, g, b);
      if (getContrastRatio(currentHex, bgHex) >= minRatio) {
        return currentHex;
      }
    }
    return shouldLighten ? "#FFFFFF" : "#000000";
  } catch {
    return accentHex;
  }
}

export function getReadableTextColor(bgHex: string): "#121212" | "#F3EEE3" {
  try {
    const rgb = hexToRgb(bgHex);
    const lum = getLuminance(rgb.r, rgb.g, rgb.b);
    return lum > 0.4 ? "#121212" : "#F3EEE3";
  } catch {
    return "#121212";
  }
}
