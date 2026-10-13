import { z } from "zod";

export const ImgSchema = z.object({
  url: z.string().url(),
  w: z.number().int().positive(),
  h: z.number().int().positive(),
  blurDataUrl: z.string(),
  alt: z.string().max(120),
  path: z.string(),
});

export const LinkSchema = z.object({
  kind: z.enum([
    "github",
    "linkedin",
    "portfolio",
    "behance",
    "dribbble",
    "leetcode",
    "codeforces",
    "twitter",
    "instagram",
    "youtube",
    "other",
  ]),
  label: z.string().min(1, "Label is required").max(40),
  url: z.string().url("Must be a valid URL").refine((val) => {
    return val.startsWith("http://") || val.startsWith("https://");
  }, "Only http and https protocols allowed"),
});

export const ExperienceSchema = z.object({
  id: z.string(),
  company: z.string().min(1, "Company is required").max(80),
  role: z.string().min(1, "Role is required").max(80),
  type: z.enum(["Internship", "Full-time", "Freelance", "Part-time", "Volunteer"]),
  start: z.string().min(1, "Start date is required"),
  end: z.string().optional(),
  current: z.boolean().default(false),
  location: z.string().max(80).optional(),
  bullets: z.array(z.string().max(220, "Bullet must be under 220 chars")).max(6),
});

export const EducationSchema = z.object({
  id: z.string(),
  school: z.string().min(1, "School or college is required").max(100),
  degree: z.string().min(1, "Degree is required").max(80),
  field: z.string().max(80).optional(),
  start: z.string().min(1, "Start year is required"),
  end: z.string().optional(),
  current: z.boolean().default(false),
  gradeType: z.enum(["CGPA", "Percentage", "None"]).default("CGPA"),
  grade: z.string().max(20).optional(),
});

export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required").max(80),
  desc: z.string().min(1, "Description is required").max(600),
  role: z.string().max(60).optional(),
  url: z.string().url().optional().or(z.literal("")),
  repo: z.string().url().optional().or(z.literal("")),
  tech: z.array(z.string().max(40)).max(15),
  images: z.array(ImgSchema).max(6).default([]),
  featured: z.boolean().default(false),
  start: z.string().optional(),
  end: z.string().optional(),
});

export const SkillSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Skill name is required").max(40),
  level: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]).optional(),
  group: z.string().max(40).optional(),
});

export const AchievementSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required").max(100),
  issuer: z.string().max(80).optional(),
  date: z.string().optional(),
  url: z.string().url().optional().or(z.literal("")),
});

export const CertificationSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Certification name is required").max(100),
  issuer: z.string().min(1, "Issuer is required").max(80),
  date: z.string().optional(),
  url: z.string().url().optional().or(z.literal("")),
});

export const SectionConfigSchema = z.object({
  id: z.enum([
    "about",
    "experience",
    "education",
    "projects",
    "skills",
    "achievements",
    "certifications",
    "contact",
  ]),
  visible: z.boolean(),
  order: z.number().int().min(0),
});

export const StyleIdSchema = z.enum([
  "noir",
  "paper",
  "terminal",
  "bento",
  "brutal",
  "gazette",
  "arcade",
  "blueprint",
]);

export const ProfileSchema = z.object({
  uid: z.string().min(1),
  username: z.string().regex(/^[a-z0-9](?:[a-z0-9-]{1,28})[a-z0-9]$/, "Invalid username format"),
  schemaVersion: z.literal(1).default(1),
  mode: z.enum(["resume", "portfolio"]).default("portfolio"),
  portfolio: z.object({
    style: StyleIdSchema.default("noir"),
    accent: z.string().regex(/^#[0-9A-Fa-f]{6}$/).default("#C6FF3D"),
    fontPair: z.number().int().min(0).max(2).default(0),
    colorMode: z.enum(["light", "dark", "auto"]).default("dark"),
    motion: z.enum(["full", "reduced"]).default("full"),
  }),
  resume: z.object({
    template: z.enum(["classic", "modern", "compact"]).default("modern"),
    accent: z.string().regex(/^#[0-9A-Fa-f]{6}$/).default("#FF4D1C"),
    scale: z.enum(["S", "M", "L"]).default("M"),
    showPhoto: z.boolean().default(false),
  }),
  basics: z.object({
    name: z.string().min(1, "Name is required").max(60),
    headline: z.string().min(1, "Headline is required").max(120),
    email: z.string().email("Valid email required"),
    phone: z.string().max(25).optional(),
    location: z.string().max(80).optional(),
    photo: ImgSchema.optional(),
    availableForWork: z.boolean().default(true),
    links: z.array(LinkSchema).max(10).default([]),
  }),
  summary: z.string().max(1200).default(""),
  experience: z.array(ExperienceSchema).max(15).default([]),
  education: z.array(EducationSchema).max(10).default([]),
  projects: z.array(ProjectSchema).max(20).default([]),
  skills: z.array(SkillSchema).max(60).default([]),
  achievements: z.array(AchievementSchema).max(15).default([]),
  certifications: z.array(CertificationSchema).max(15).default([]),
  sections: z.array(SectionConfigSchema),
  seo: z.object({
    title: z.string().max(70).optional(),
    description: z.string().max(160).optional(),
  }).default({}),
  visibility: z.enum(["draft", "public", "unlisted"]).default("draft"),
  stats: z.object({
    views: z.number().int().nonnegative().default(0),
  }).default({ views: 0 }),
});

export type ProfileInput = z.infer<typeof ProfileSchema>;

export const DefaultSections: z.infer<typeof SectionConfigSchema>[] = [
  { id: "about", visible: true, order: 0 },
  { id: "projects", visible: true, order: 1 },
  { id: "skills", visible: true, order: 2 },
  { id: "experience", visible: true, order: 3 },
  { id: "education", visible: true, order: 4 },
  { id: "achievements", visible: true, order: 5 },
  { id: "certifications", visible: true, order: 6 },
  { id: "contact", visible: true, order: 7 },
];
