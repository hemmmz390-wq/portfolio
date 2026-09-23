# Phase 1 — Editorial Portfolio: Design System & Static Frontend

**Date:** 2026-09-23
**Author:** Elbert Alwi (with Claude)
**Status:** Approved

## 1. Purpose & Scope

Build a premium, editorial, dark, typography-driven personal portfolio for Elbert Alwi — Web Developer / Photographer / Content Creator — inspired by (not copied from) a dark, asymmetric, large-type editorial reference image.

This is **Phase 1 of a multi-phase project**. Phase 1 delivers the complete visual experience as a static Next.js site with hardcoded content. It does **not** include a database, CMS, authentication, admin dashboard, file uploads, or working email delivery — those are deferred to later phases (see §9).

Rationale for sequencing: the site's value is almost entirely in its art direction and motion quality, which is subjective and needs fast iteration. Building it first without a database means design changes don't require touching persistence/schema code. The CMS/admin/auth layer is comparatively mechanical CRUD and is safer to build once the frontend shape is proven.

## 2. Tech Stack (Phase 1)

- Next.js (App Router) + TypeScript (strict mode)
- Tailwind CSS
- Framer Motion for all UI motion (stagger reveals, parallax, hover states, page transitions)
- Lenis for smooth scrolling
- React Hook Form + Zod for the contact form (client-side validation only — no submit handler yet)
- ESLint + Prettier

GSAP is intentionally **not** included in Phase 1. Framer Motion covers every effect specified (including the glitch entrance, see §6). GSAP will only be added later if a specific effect genuinely requires it.

## 3. Site Structure (Phase 1)

```
/            Home (hero, intro, selected work, project index, marquee, process, capabilities, CTA, footer)
/about       About page
/work        Full project index
/work/[slug] Project detail page (dynamic, statically generated from local data)
/process     Creative process page
/contact     Contact page (form validates, does not persist/send yet)
```

`/admin/*` and its subpages are **out of scope** for Phase 1.

Content lives in typed local data files, not hardcoded into components:

```
lib/
  types.ts               Project, SiteSettings, ProcessStep, Capability types
  content/
    site.ts               name, role, email, socials, hero copy, intro copy
    projects.ts            the 3 real projects (see §5)
    process.ts              process steps
    capabilities.ts          capabilities + tools
```

This keeps the component layer identical when Phase 2 swaps local data for Prisma/Postgres queries — only the data-fetching functions change, not the JSX.

## 4. Identity & Content

- **Name:** Elbert Alwi
- **Role line:** Web Developer / Photographer / Content Creator (not "Creative Director" — kept honest to actual work)
- **Public email:** elbertalwi0103@gmail.com
- **Socials:** Instagram (@bert_alwi), LinkedIn (Elbert Alwi), TikTok (@neduh_gas — content-creation/editing work)

No fabricated clients, awards, testimonials, or metrics. All copy not directly supplied by Elbert will be clearly derived/adapted from what he described, not invented.

## 5. Selected Work (3 real projects)

| # | Title | Category | Year | Role |
|---|---|---|---|---|
| 01 | **Marginku** | Financial Tool / Web App | 2026 | Solo Developer |
| 02 | **Hospi AI** | Hotel AI Assistant / Web App | 2026 (started Aug) | Web Developer — team project, built the web app from scratch |
| 03 | **Hibiz** | Organization Site / Web App | 2026 (started Sep) | Solo Developer |

Descriptions (English, tightened to editorial length, adapted from Elbert's own explanation — no invented outcomes/metrics):

- **Marginku** — A margin-tracking web app for Indonesian small business (UMKM) owners who sell well but don't know where the profit goes. Owners enter cost and sale price; the app calculates per-product margin, a suggested price for a target margin, weighted-average cost of goods from the last 3 purchases, delivery-platform commission differences (GoFood/GrabFood/ShopeeFood), and a monthly budget split across materials, operations, packaging, marketing, and reserve. All data stays local in the browser — no login, no server.
- **Hospi AI** — A hotel digital assistant that turns guest requests into work tickets routed to the correct department automatically. Guests scan a room QR (or enter a room number) and ask for something via chat, quick buttons, or voice, in their own language (8 supported). The AI determines intent, department, and urgency; the ticket appears on the right staff dashboard (Front Office, Housekeeping, Maintenance, Duty Manager, Restaurant) with a live SLA timer. Replies follow the guest's own language rather than a fixed menu selection, contextual upsell offers appear while ordering, low ratings auto-escalate to the Duty Manager, guests can request a human at any time, and a fallback rule engine keeps it working without an API key.
- **Hibiz** — A site built for HIMA Business Technology and AI Innovation, listing the 2026–2027 committee members, their vision/mission, and documentation of completed programs/initiatives.

Project detail pages use the standard structure from the original brief (hero, metadata, overview, gallery, next project) but only include sections that have real content — no fabricated "results/outcomes" section if there isn't a real result to report.

## 6. Visual System

**Color** (exact, monochrome):
- Background: `#050505`
- Primary text: `#F2F2EE`
- Secondary text: `#A0A0A0`
- Borders: `rgba(255,255,255,0.15)`
- No accent color

**Typography:**
- **League Spartan** — display/headline sizes (80–180px hero type, 32–64px section headings, nav labels). Strong geometric grotesk, reads well oversized.
- **Inter** — body copy (14–18px) and metadata/captions (8–12px). Paired because League Spartan gets visually heavy at small sizes; Inter keeps body text light and editorial.

**Hero image:** Elbert's provided portrait (seated, arms crossed over a chair back, moody studio lighting) — desaturated/monochrome treatment, large-format, asymmetrically placed (not centered), reference saved at `docs/superpowers/specs/assets/hero-reference.webp`. Reused on the About page with a distinct treatment variant (different crop/contrast) so it doesn't feel duplicated.

**Grain/noise:** one fixed-position SVG turbulence overlay, low opacity, `pointer-events: none`, rendered once — not per-scroll-frame.

**Custom cursor:** small white dot by default; expands to "VIEW PROJECT →" label on project card hover; magnetic pull on nav links. Disabled entirely via a coarse-pointer/touch media query — not just visually hidden.

## 7. Motion System

**Page-load / entrance sequence** (runs once per session, sub-second per step):
1. Black screen → brand name fades in
2. Navigation fades in
3. Hero image reveals with a brief **glitch pass**: RGB channel split + scanline flicker + slight digital jitter, settling to the clean desaturated image within ~400–600ms
4. Headline text staggers in line-by-line with the same glitch treatment per line, settling to clean type
5. Metadata/small elements fade in
6. Page becomes interactive

**Ongoing motion:** scroll-reveals via Framer Motion `whileInView`, subtle parallax on hero image/typography, hover states (image scale/shift, title movement, metadata opacity), marquee strips (opposing directions, pause on hover), page transitions via fade/clip-path.

**`prefers-reduced-motion`:** the glitch effect, parallax, and cursor takeover are the most motion-sensitive pieces — all fall back to a plain fade/slide with no glitch, no parallax, no custom cursor. This check happens once at the top of the motion config, not per-component.

## 8. Responsive, Accessibility, Component Architecture

**Breakpoints:** mobile 320–767px, tablet 768–1023px, laptop 1024–1439px, desktop 1440px+. Mobile recomposes (not just shrinks): full-screen numbered menu (`01 HOME / 02 ABOUT / …`), stacked project list instead of the asymmetric grid, no custom cursor, motion reduced by default on narrow/touch viewports regardless of OS setting.

**Accessibility:** semantic HTML, visible focus states, alt text on all images, keyboard-navigable nav and mobile menu, sufficient contrast (verified against the `#050505`/`#F2F2EE` pairing), `prefers-reduced-motion` respected as above.

**Components** (`components/`): `Navbar`, `Hero`, `SectionHeading`, `ProjectGrid`, `ProjectCard`, `ProjectIndex`, `Marquee`, `ProcessSection`, `Capabilities`, `ContactForm`, `Footer`, `CustomCursor`, `PageTransition`, `NoiseOverlay`, `MobileMenu`. Each has one clear responsibility and takes typed props from `lib/types.ts` — no component reaches into global content files directly except at the page level.

**About page content:**
- Capabilities: Frontend Development, Photography, Content Creation & Video Editing
- Tools: Next.js, React, Tailwind CSS, VS Code (frontend) · Lightroom, camera gear (photography) · CapCut, AI Studio (content/video)

## 9. Verification

- `next build` and `tsc --noEmit` run clean after each major section
- Manual browser check per section: scroll through all homepage sections, open the project detail page for each of the 3 projects, resize to mobile/tablet, toggle `prefers-reduced-motion` and confirm the glitch/parallax/cursor are suppressed
- No automated test suite in Phase 1 (static content, no business logic yet) — tests get added starting Phase 2 once there's real logic (forms persisting data, CMS, auth) to verify

## 10. Explicitly Out of Scope (Later Phases)

- PostgreSQL + Prisma schema/migrations, database-backed content
- Auth.js authentication, protected `/admin/*` routes
- Admin dashboard (projects CRUD, image upload, messages, settings)
- Cloudinary image storage/upload pipeline
- Resend transactional email, working contact form submission, rate limiting/spam protection
- Sitemap.xml/robots.txt generation, full structured-data SEO
- Deployment configuration and environment variables

Each of these becomes its own sub-project with its own spec once Phase 1 is built and approved.
