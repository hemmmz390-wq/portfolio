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

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface Project {
  slug: string;
  number: string;
  title: string;
  category: string;
  year: string;
  role: string;
  liveUrl: string | null;
  shortDescription: string;
  description: string;
  coverImage: string | null;
  heroImage: string | null;
  imageTreatment: ImageTreatment;
  gallery: ProjectImage[];
  featured: boolean;
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
