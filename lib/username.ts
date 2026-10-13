export const RESERVED_USERNAMES = new Set([
  "admin",
  "api",
  "app",
  "auth",
  "login",
  "logout",
  "signup",
  "dashboard",
  "editor",
  "settings",
  "onboarding",
  "resume",
  "demo",
  "www",
  "mail",
  "support",
  "help",
  "about",
  "pricing",
  "terms",
  "privacy",
  "static",
  "assets",
  "_next",
  "favicon",
  "robots",
  "sitemap",
  "decslab",
  "clawcode",
  "root",
  "null",
  "undefined",
]);

const PROFANITY_LIST = [
  "abuse",
  "porn",
  "sex",
  "nude",
  "bitch",
  "fuck",
  "shit",
  "ass",
  "cunt",
  "dick",
  "pussy",
  "bastard",
  "slut",
  "whore",
];

export function validateUsername(username: string): { valid: boolean; error?: string } {
  const clean = username.trim().toLowerCase();
  
  if (clean.length < 3) {
    return { valid: false, error: "Username must be at least 3 characters." };
  }
  if (clean.length > 30) {
    return { valid: false, error: "Username cannot exceed 30 characters." };
  }
  if (!/^[a-z0-9](?:[a-z0-9-]{1,28})[a-z0-9]$/.test(clean)) {
    return {
      valid: false,
      error: "Only lowercase letters, numbers, and single hyphens. Cannot start or end with a hyphen.",
    };
  }
  if (clean.includes("--")) {
    return { valid: false, error: "Username cannot contain consecutive hyphens." };
  }
  if (RESERVED_USERNAMES.has(clean)) {
    return { valid: false, error: "This username is reserved by the system." };
  }
  for (const prof of PROFANITY_LIST) {
    if (clean.includes(prof)) {
      return { valid: false, error: "Username contains inappropriate language." };
    }
  }

  return { valid: true };
}

export function slugifyName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 30)
    .replace(/^-+|-+$/g, "");
}

export function generateUsernameSuggestions(fullName: string): string[] {
  const parts = fullName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) {
    return ["user-dev", "build-craft", "maker-dev"];
  }

  const first = parts[0];
  const last = parts.length > 1 ? parts[parts.length - 1] : "";

  const suggestions: string[] = [];

  if (last) {
    suggestions.push(`${first}-${last}`);
    suggestions.push(`${first}${last}`);
    suggestions.push(`${first[0]}-${last}`);
  } else {
    suggestions.push(`${first}-dev`);
    suggestions.push(`${first}-craft`);
    suggestions.push(`iam-${first}`);
  }

  // Ensure they comply with the length and character rules
  return suggestions
    .map((s) => s.slice(0, 26))
    .filter((s) => validateUsername(s).valid)
    .slice(0, 3);
}
