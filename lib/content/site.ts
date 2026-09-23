import { SiteSettings, NavLink } from "@/lib/types";

export const siteSettings: SiteSettings = {
  name: "Elbert Alwi",
  role: "Web Developer / Photographer / Content Creator",
  email: "elbertalwi0103@gmail.com",
  socials: [
    { label: "Instagram", url: "https://www.instagram.com/bert_alwi/" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/elbert-alwi-4a4322388/" },
    { label: "TikTok", url: "https://www.tiktok.com/@neduh_gas" },
  ],
  heroHeadline: ["BUILDING FOR", "THE WEB."],
  heroSubheadline: ["TURNING IDEAS", "INTO INTERFACES."],
  introHeadline:
    "I BUILD DIGITAL PRODUCTS, CAPTURE MOMENTS, AND SHAPE STORIES ACROSS SCREENS.",
  introParagraph:
    "I'm a web developer, photographer, and content creator focused on building clean, functional digital products and telling visual stories through photography and video.",
};

export const navLinks: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Process", href: "/process" },
  { label: "Contact", href: "/contact" },
];
