export type ImageTreatment = "normal" | "grayscale" | "highContrast" | "monochrome";

export interface SocialLink {
  label: string;
  url: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SiteSettings {
  name: string;
  role: string;
  email: string;
  socials: SocialLink[];
  heroHeadline: string[];
  heroSubheadline: string[];
  introHeadline: string;
  introParagraph: string;
}

export type Discipline = "web" | "content";

export interface TeamMember {
  name: string;
  role: string;
  /** Background-removed portrait, rendered over the page background. */
  image: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface Project {
  slug: string;
  number: string;
  title: string;
  discipline: Discipline;
  category: string;
  year: string;
  role: string;
  liveUrl: string | null;
  /** Link text for `liveUrl`; defaults to "Visit site" when omitted. */
  liveLabel?: string;
  shortDescription: string;
  description: string;
  coverImage: string | null;
  heroImage: string | null;
  imageTreatment: ImageTreatment;
  gallery: ProjectImage[];
  /** People who worked on it; shown as a team section on the detail page. */
  team?: TeamMember[];
  featured: boolean;
}

export interface DisciplineInfo {
  id: Discipline;
  label: string;
  description: string;
}

export interface ProjectGroup extends DisciplineInfo {
  projects: Project[];
}

export interface Photograph {
  src: string;
  alt: string;
  /** Intrinsic size, so each frame keeps its own aspect ratio in the grid. */
  width: number;
  height: number;
  caption?: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface Capability {
  number: string;
  title: string;
  tools: string[];
}
