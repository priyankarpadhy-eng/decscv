export type StyleId =
  | "noir"
  | "paper"
  | "terminal"
  | "bento"
  | "brutal"
  | "gazette"
  | "arcade"
  | "blueprint";

export type ResumeTemplateId = "classic" | "modern" | "compact";

export type LinkKind =
  | "github"
  | "linkedin"
  | "portfolio"
  | "behance"
  | "dribbble"
  | "leetcode"
  | "codeforces"
  | "twitter"
  | "instagram"
  | "youtube"
  | "other";

export type SectionId =
  | "about"
  | "experience"
  | "education"
  | "projects"
  | "skills"
  | "achievements"
  | "certifications"
  | "contact";

export interface Img {
  url: string;
  w?: number;
  h?: number;
  blurDataUrl?: string;
  alt?: string;
  path?: string;
}

export interface ProfileLink {
  kind: LinkKind;
  label: string;
  url: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  type: "Internship" | "Full-time" | "Freelance" | "Part-time" | "Volunteer";
  start: string;
  end?: string;
  current: boolean;
  location?: string;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  field?: string;
  start: string;
  end?: string;
  current: boolean;
  gradeType: "CGPA" | "Percentage" | "None";
  grade?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  desc: string;
  role?: string;
  url?: string;
  repo?: string;
  tech: string[];
  images: Img[];
  featured: boolean;
  start?: string;
  end?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  level?: 1 | 2 | 3 | 4 | 5;
  group?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  issuer?: string;
  date?: string;
  url?: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date?: string;
  url?: string;
}

export interface SectionConfig {
  id: SectionId;
  visible: boolean;
  order: number;
}

export interface Profile {
  uid: string;
  username: string;
  schemaVersion: 1;
  mode: "resume" | "portfolio";
  portfolio: {
    style: StyleId;
    accent: string;
    fontPair: number;
    colorMode: "light" | "dark" | "auto";
    motion: "full" | "reduced";
  };
  resume: {
    template: ResumeTemplateId;
    accent: string;
    scale: "S" | "M" | "L";
    showPhoto: boolean;
  };
  basics: {
    name: string;
    headline: string;
    email: string;
    phone?: string;
    location?: string;
    photo?: Img;
    availableForWork: boolean;
    links: ProfileLink[];
  };
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  skills: SkillItem[];
  achievements: AchievementItem[];
  certifications: CertificationItem[];
  sections: SectionConfig[];
  seo: {
    title?: string;
    description?: string;
  };
  visibility: "draft" | "public" | "unlisted";
  stats: {
    views: number;
  };
  createdAt?: any;
  updatedAt?: any;
  publishedAt?: any;
}

export interface UsernameReservation {
  uid: string;
  createdAt: any;
}
