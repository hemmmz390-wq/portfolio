import { Discipline, DisciplineInfo, Project, ProjectGroup } from "@/lib/types";

export const projects: Project[] = [
  {
    slug: "marginku",
    number: "01",
    title: "Marginku",
    discipline: "web",
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
    gallery: [
      {
        src: "/images/projects/marginku/calculator.webp",
        alt: "Marginku's instant margin calculator: sliders for cost and sale price beside a green result card showing net profit and margin",
        width: 1600,
        height: 1000,
        caption: "Instant margin calculator",
      },
      {
        src: "/images/projects/marginku/problem.webp",
        alt: "A section showing how hidden costs like packaging, gas and rent push a dish's real cost above what the owner assumed",
        width: 1600,
        height: 1000,
        caption: "Where the money goes",
      },
      {
        src: "/images/projects/marginku/categories.webp",
        alt: "Three category cards — food and drink, shops and retail, handmade products — each listing the calculations it focuses on",
        width: 1600,
        height: 1000,
        caption: "Built for three kinds of business",
      },
    ],
    featured: true,
  },
  {
    slug: "hospi-ai",
    number: "02",
    title: "Hospi AI",
    discipline: "web",
    category: "Hotel AI Assistant / Web App",
    year: "2026",
    role: "Web Developer — team project, built the web app from scratch",
    liveUrl: "https://hospi-ai.vercel.app",
    shortDescription:
      "A hotel digital assistant that turns guest requests into routed, SLA-tracked work tickets.",
    description:
      "Hospi AI is a hotel digital assistant that turns guest requests into work tickets routed to the correct department automatically. A guest scans the QR code in their room, or types a room number, then asks for something by chat, quick button, or voice recording, in their own language across eight supported languages. The AI reads the intent, decides the department and urgency, and the ticket lands on the right staff dashboard with an SLA timer already running. Five staff surfaces cover the operation: Front Office as the control centre for every ticket, with SLA alerts and live chat; Housekeeping for cleaning and amenities; Maintenance for technical repairs; Duty Manager for escalations, complaints, and stalled tickets; and Restaurant for food and beverage orders. What sets it apart: replies follow the language the guest actually used rather than the one picked from a menu, contextual upsell offers appear while a guest is ordering, poor ratings escalate to the Duty Manager on their own, a guest can ask for a human at any point and the AI immediately stops replying, and a fallback rule engine keeps the whole thing running even with no API key.",
    coverImage: "/images/projects/hospi-ai/landing.webp",
    heroImage: "/images/projects/hospi-ai/landing.webp",
    imageTreatment: "grayscale",
    gallery: [
      {
        src: "/images/projects/hospi-ai/presentation.webp",
        alt: "Hospi AI's presentation mode: the guest's phone concierge on the left and the hotel staff dashboard on the right",
        width: 1600,
        height: 1000,
        caption: "Presentation mode — guest and staff side by side",
      },
      {
        src: "/images/projects/hospi-ai/front-office.webp",
        alt: "The Front Office dashboard: ticket counts, SLA alerts and a live queue of guest requests sorted by urgency",
        width: 1600,
        height: 1000,
        caption: "Front Office dashboard",
      },
      {
        src: "/images/projects/hospi-ai/how-it-works.webp",
        alt: "The four steps from a guest's request to resolution: guest asks, AI understands, right team receives, request gets resolved",
        width: 1600,
        height: 1000,
        caption: "How it works",
      },
    ],
    featured: true,
  },
  {
    slug: "hibiz",
    number: "03",
    title: "Hibiz",
    discipline: "web",
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
    gallery: [
      {
        src: "/images/projects/hibiz/about.webp",
        alt: "The Hibiz about section: the organization's vision in italics above its five numbered missions",
        width: 1600,
        height: 1000,
        caption: "Vision & mission",
      },
      {
        src: "/images/projects/hibiz/programs.webp",
        alt: "The programs section, documenting the HALO orientation program with a grid of event photos",
        width: 1600,
        height: 1000,
        caption: "Program documentation",
      },
      {
        src: "/images/projects/hibiz/silk-connect.webp",
        alt: "The Silk Connect section, covering a visit from Universitas Primakara with a strip of event photos",
        width: 1600,
        height: 1000,
        caption: "Silk Connect",
      },
    ],
    featured: true,
  },
  {
    slug: "kosguide",
    number: "04",
    title: "Kosguide",
    discipline: "web",
    category: "SEO Content Site / Affiliate Guide",
    year: "2026",
    role: "Web Developer & SEO",
    liveUrl: "https://kosguide.vercel.app",
    shortDescription:
      "An SEO-driven guide to the things students actually need in a rented room, with real product photos and price ranges.",
    description:
      "Kosguide is an Indonesian-language editorial site for students and anak rantau — people living away from home in a rented kos room. It curates the items that genuinely earn their place in a small room, each with an honest reason it was picked, a price range, its real product photos, and a Shopee link. Around that sit long-form guides, six category pages, a search, and a starter-pack calculator that builds a shopping list to fit a moving-in budget. The site is built to be found: every page carries structured data — articles as BlogPosting with breadcrumbs, FAQ sections as FAQPage, product picks as ItemList — alongside a sitemap and a robots policy that deliberately lets AI crawlers in so the guides can be cited by AI answers. An editorial policy and an affiliate disclosure page sit in the footer, and every product link is flagged as an affiliate link.",
    coverImage: "/images/projects/kosguide/landing.webp",
    heroImage: "/images/projects/kosguide/landing.webp",
    imageTreatment: "grayscale",
    gallery: [
      {
        src: "/images/projects/kosguide/picks.webp",
        alt: "Kosguide's recommended picks: product cards with a price range, real-photo count, rating, the reason it was chosen and a Shopee button",
        width: 1600,
        height: 1000,
        caption: "Curated picks",
      },
      {
        src: "/images/projects/kosguide/calculator.webp",
        alt: "The starter-pack calculator: four budget tiers above an estimated total and the list of items it puts in the basket",
        width: 1600,
        height: 1000,
        caption: "Starter-pack budget calculator",
      },
      {
        src: "/images/projects/kosguide/article.webp",
        alt: "A long-form guide on arranging a small 3x3 metre room, with breadcrumbs, author, reading time, last-updated date and an affiliate notice",
        width: 1600,
        height: 1000,
        caption: "Long-form guide",
      },
      {
        src: "/images/projects/kosguide/category.webp",
        alt: "The Kamar Kos category page listing its guide articles as photo cards with dates and reading times",
        width: 1600,
        height: 1000,
        caption: "Category page",
      },
    ],
    featured: true,
  },
  {
    slug: "neduh-gas",
    number: "05",
    title: "Neduh Gas",
    discipline: "content",
    category: "Content Creation / Social Video",
    year: "2026",
    role: "Content Creator & Editor — four-person team",
    liveUrl: "https://www.tiktok.com/@neduh_gas",
    liveLabel: "View on TikTok",
    shortDescription:
      "A TikTok channel about hidden-gem places, local businesses, and culture around Bali.",
    description:
      "Neduh Gas is a TikTok channel built around hidden-gem places in Bali — trips out to the spots most visitors never reach, filmed as travel and hangout content. It isn't only about the places: the channel also puts local UMKM businesses and Balinese culture in front of an audience, carried by storytelling and vlogs rather than plain recommendations. Four people run it — Elbert on content creation and editing, Amara on social media, Aurel on content strategy, and Artha as a second content creator. The first shoot was in March 2026, at the Ogoh-ogoh parade on the eve of Nyepi.",
    coverImage: "/images/projects/neduh-gas/logo-cover.webp",
    heroImage: "/images/projects/neduh-gas/logo-cover.webp",
    imageTreatment: "normal",
    gallery: [
      {
        src: "/images/projects/neduh-gas/tiktok-profile.webp",
        alt: "The Neduh Gas TikTok profile: the channel logo and bio above a grid of video thumbnails from around Bali",
        width: 1402,
        height: 857,
        caption: "@neduh_gas on TikTok",
      },
    ],
    team: [
      {
        name: "Elbert",
        role: "Content Creator & Editor",
        image: "/images/projects/neduh-gas/team-elbert.webp",
      },
      {
        name: "Amara",
        role: "Social Media Admin",
        image: "/images/projects/neduh-gas/team-amara.webp",
      },
      {
        name: "Aurel",
        role: "Content Strategy",
        image: "/images/projects/neduh-gas/team-aurel.webp",
      },
      {
        name: "Artha",
        role: "Content Creator",
        image: "/images/projects/neduh-gas/team-artha.webp",
      },
    ],
    featured: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Display order and labels for the two kinds of work. */
export const disciplines: DisciplineInfo[] = [
  { id: "web", label: "Web Development", description: "Websites & Web Apps" },
  { id: "content", label: "Content Creation", description: "Video & Social" },
];

export function getProjectsByDiscipline(
  discipline: Discipline,
  list: Project[] = projects
): Project[] {
  return list.filter((project) => project.discipline === discipline);
}

/** Groups in `disciplines` order; groups with no projects are left out. */
export function getProjectGroups(list: Project[] = projects): ProjectGroup[] {
  return disciplines
    .map((discipline) => ({
      ...discipline,
      projects: getProjectsByDiscipline(discipline.id, list),
    }))
    .filter((group) => group.projects.length > 0);
}
