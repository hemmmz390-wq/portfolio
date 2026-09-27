import { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    slug: "marginku",
    number: "01",
    title: "Marginku",
    category: "Financial Tool / Web App",
    year: "2026",
    role: "Solo Developer",
    liveUrl: "https://marginku-orcin.vercel.app",
    shortDescription:
      "A margin-tracking tool that shows Indonesian small business owners where their profit actually goes.",
    description:
      "Marginku is a margin-tracking web app for Indonesian small business (UMKM) owners who sell well but don't know where the profit goes. Many small shops price by feeling, or by copying the stall next door — sales look busy, but the money is gone by closing time, because the best-selling product turns out to carry the thinnest margin. Owners enter their cost and sale price, and the app works out the rest: margin per product, a suggested price for the target margin they want, cost of goods using a weighted average of the last three purchases so it rises when ingredient prices rise, delivery-platform commission differences across GoFood, GrabFood, and ShopeeFood, and a monthly budget split across materials, operations, packaging, marketing, and reserve. The language is deliberately plain — no accounting jargon — and all data stays in the browser, so there is no sign-up and no server.",
    coverImage: "/images/projects/marginku-cover.webp",
    heroImage: "/images/projects/marginku-cover.webp",
    imageTreatment: "grayscale",
    gallery: [],
    featured: true,
  },
  {
    slug: "hospi-ai",
    number: "02",
    title: "Hospi AI",
    category: "Hotel AI Assistant / Web App",
    year: "2026",
    role: "Web Developer — team project, built the web app from scratch",
    liveUrl: "https://hospi-ai.vercel.app",
    shortDescription:
      "A hotel digital assistant that turns guest requests into routed, SLA-tracked work tickets.",
    description:
      "Hospi AI is a hotel digital assistant that turns guest requests into work tickets routed to the correct department automatically. A guest scans the QR code in their room, or types a room number, then asks for something by chat, quick button, or voice recording, in their own language across eight supported languages. The AI reads the intent, decides the department and urgency, and the ticket lands on the right staff dashboard with an SLA timer already running. Five staff surfaces cover the operation: Front Office as the control centre for every ticket, with SLA alerts and live chat; Housekeeping for cleaning and amenities; Maintenance for technical repairs; Duty Manager for escalations, complaints, and stalled tickets; and Restaurant for food and beverage orders. What sets it apart: replies follow the language the guest actually used rather than the one picked from a menu, contextual upsell offers appear while a guest is ordering, poor ratings escalate to the Duty Manager on their own, a guest can ask for a human at any point and the AI immediately stops replying, and a fallback rule engine keeps the whole thing running even with no API key.",
    coverImage: "/images/projects/hospi-ai-cover.webp",
    heroImage: "/images/projects/hospi-ai-cover.webp",
    imageTreatment: "grayscale",
    gallery: [],
    featured: true,
  },
  {
    slug: "hibiz",
    number: "03",
    title: "Hibiz",
    category: "Organization Site / Web App",
    year: "2026",
    role: "Solo Developer",
    liveUrl: "https://hibiz-web.vercel.app",
    shortDescription:
      "A site for HIMA Business Technology and AI Innovation, documenting its committee and completed programs.",
    description:
      "Hibiz is a site built for HIMA Business Technology and AI Innovation. It lists the 2026–2027 committee members along with their vision and mission, and carries documentation and write-ups of the programs the organization has already run.",
    coverImage: "/images/projects/hibiz-cover.webp",
    heroImage: "/images/projects/hibiz-cover.webp",
    imageTreatment: "grayscale",
    gallery: [],
    featured: true,
  },
  {
    slug: "neduh-gas",
    number: "04",
    title: "Neduh Gas",
    category: "Content Creation / Social Video",
    year: "2026",
    role: "Content Creator & Editor — four-person team",
    liveUrl: "https://www.tiktok.com/@neduh_gas",
    liveLabel: "View on TikTok",
    shortDescription:
      "A TikTok channel about hidden-gem places, local businesses, and culture around Bali.",
    description:
      "Neduh Gas is a TikTok channel built around hidden-gem places in Bali — trips out to the spots most visitors never reach, filmed as travel and hangout content. It isn't only about the places: the channel also puts local UMKM businesses and Balinese culture in front of an audience, carried by storytelling and vlogs rather than plain recommendations. Four people run it — Elbert on content creation and editing, Amara on social media, Aurel on content strategy, and Artha as a second content creator. The first shoot was in March 2026, at the Ogoh-ogoh parade on the eve of Nyepi.",
    coverImage: null,
    heroImage: null,
    imageTreatment: "normal",
    gallery: [],
    featured: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
