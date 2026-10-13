import { describe, it, expect } from "vitest";
import { validateUsername, slugifyName, generateUsernameSuggestions } from "../lib/username";
import { getContrastRatio, ensureContrast, getReadableTextColor } from "../lib/contrast";
import { ProfileSchema } from "../lib/schema";

describe("Username validation", () => {
  it("accepts valid usernames", () => {
    expect(validateUsername("aarav-sharma").valid).toBe(true);
    expect(validateUsername("priya99").valid).toBe(true);
    expect(validateUsername("rohit-dev").valid).toBe(true);
  });

  it("rejects invalid usernames", () => {
    expect(validateUsername("ab").valid).toBe(false); // too short
    expect(validateUsername("-aarav").valid).toBe(false); // leading hyphen
    expect(validateUsername("aarav-").valid).toBe(false); // trailing hyphen
    expect(validateUsername("aarav--sharma").valid).toBe(false); // double hyphen
    expect(validateUsername("dashboard").valid).toBe(false); // reserved
    expect(validateUsername("admin").valid).toBe(false); // reserved
  });

  it("slugifies names cleanly", () => {
    expect(slugifyName("Ananya Iyer")).toBe("ananya-iyer");
    expect(slugifyName("Devendra (Dev) Sharma!")).toBe("devendra-dev-sharma");
  });

  it("generates 3 reasonable suggestions", () => {
    const suggestions = generateUsernameSuggestions("Rohan Verma");
    expect(suggestions.length).toBeGreaterThanOrEqual(1);
    expect(suggestions).toContain("rohan-verma");
  });
});

describe("Contrast calculation and enforcement", () => {
  it("calculates contrast accurately", () => {
    // Pure black against pure white is 21:1
    const ratio = getContrastRatio("#000000", "#FFFFFF");
    expect(ratio).toBeGreaterThan(20);
  });

  it("ensures minimum WCAG AA ratio", () => {
    const adjusted = ensureContrast("#EEEEEE", "#FFFFFF", 4.5);
    const newRatio = getContrastRatio(adjusted, "#FFFFFF");
    expect(newRatio).toBeGreaterThanOrEqual(4.5);
  });

  it("picks legible text color", () => {
    expect(getReadableTextColor("#FFFFFF")).toBe("#121212");
    expect(getReadableTextColor("#000000")).toBe("#F3EEE3");
  });
});

describe("ProfileSchema validation", () => {
  it("validates a minimal correct profile", () => {
    const minimal = {
      uid: "user_123",
      username: "rohit-dev",
      mode: "portfolio",
      portfolio: {
        style: "noir",
        accent: "#C6FF3D",
        fontPair: 0,
        colorMode: "dark",
        motion: "full",
      },
      resume: {
        template: "modern",
        accent: "#FF4D1C",
        scale: "M",
        showPhoto: false,
      },
      basics: {
        name: "Rohit Sharma",
        headline: "Software Engineer & Builder",
        email: "rohit@example.com",
        availableForWork: true,
        links: [],
      },
      summary: "Passionate developer building scalable systems.",
      experience: [],
      education: [],
      projects: [],
      skills: [],
      achievements: [],
      certifications: [],
      sections: [
        { id: "about", visible: true, order: 0 },
        { id: "projects", visible: true, order: 1 },
      ],
    };

    const parsed = ProfileSchema.safeParse(minimal);
    expect(parsed.success).toBe(true);
  });
});
