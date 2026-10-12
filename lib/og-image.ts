import { siteSettings } from "@/lib/content/site";

/**
 * The link-preview card shown when the site is shared. A JPEG at the 1200×630
 * size every platform expects, since some (WhatsApp, LinkedIn) still skip WebP.
 * Pages that set their own `openGraph` must pass this again: Next replaces a
 * nested metadata object rather than merging it, so the image would be lost.
 */
export const ogImage = {
  url: "/images/og-portfolio.jpg",
  width: 1200,
  height: 630,
  alt: `${siteSettings.name} — ${siteSettings.role}`,
};
