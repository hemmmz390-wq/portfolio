# Elbert Alwi — Portfolio

A dark, editorial, typography-driven personal portfolio for Elbert Alwi (Web Developer / Photographer / Content Creator).

This repository currently contains **Phase 1**: the complete static frontend. The database, CMS, admin dashboard, authentication, image uploads, and transactional email are planned for later phases and are **not** implemented yet.

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19
- TypeScript (strict)
- Tailwind CSS v4 (CSS-first `@theme` configuration)
- Framer Motion (all UI motion, including the glitch entrance)
- Lenis (smooth scrolling)
- React Hook Form + Zod (contact form validation)
- Vitest + React Testing Library

## Getting Started

```bash
npm install
npm run dev
```

The site runs at http://localhost:3000.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm test` | Run the test suite once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Lint with ESLint |
| `npm run format` | Format with Prettier |

## Environment Variables

Only one is used in Phase 1, and it is optional in development:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

It sets the canonical base URL for metadata, `sitemap.xml`, and `robots.txt`. Without it, those fall back to `http://localhost:3000`.

## Editing Content

All site content lives in typed data files under `lib/content/` — **no content is hardcoded in components**. To change what the site says, edit these files only:

| File | Contains |
| --- | --- |
| `lib/content/site.ts` | Name, role, email, social links, hero headline, intro copy |
| `lib/content/projects.ts` | The project list and each project's copy and metadata |
| `lib/content/process.ts` | The six process steps |
| `lib/content/capabilities.ts` | Capabilities and the tools listed under each |

Shapes for all of these are defined in `lib/types.ts`.

### Adding a project

Append an entry to the `projects` array in `lib/content/projects.ts`. The `slug` becomes its URL (`/work/<slug>`), and the page is statically generated at build time.

Set `discipline` to `"web"` or `"content"`. Work is shown in separate sections by discipline, on the homepage and on `/work`, and the index is split the same way. Section labels and their order come from the `disciplines` array in the same file; a discipline with no projects is simply left out.

`liveLabel` is optional and sets the link text on the detail page (it defaults to "Visit site"; Neduh Gas uses "View on TikTok").

### Photography

Photographs live in `lib/content/photography.ts` and the files in `public/images/photography/`. They appear as their own section on the homepage and on `/work`, split into two carousels: **Awarded** (competition work) and **Personal Work**.

The carousels use native CSS scroll-snap, so touch swiping, trackpad scrolling and keyboard arrows (once the strip is focused) all work without a library; the prev/next buttons and the `01 / 04` counter read and move the same scroll position. Every frame keeps its own aspect ratio at a shared height, capped so a wide frame never runs past a phone screen.

They advance by themselves every 4.5 seconds (`AUTOPLAY_MS` in `PhotoCarousel.tsx`) and loop back to the first frame. Autoplay holds while the pointer is over the carousel or focus is inside it, waits a full interval after any manual move, runs only while the carousel is on screen, and has a visible pause button. It is off entirely under `prefers-reduced-motion`. The counter's screen-reader announcements are switched off while it plays automatically.

The Awarded carousel shows its frames in gray until hovered, like the project cards (`revealColourOnHover`). That only applies on devices that can hover; on a touch screen the frames stay in colour, since there is nothing to hover.

Each entry needs its real `width` and `height`; a test checks these against the actual files. Photographs are shown in full colour, unlike the grayscale project covers, because the grading is part of the work.

To mark an award-winning frame, add `award: { result, competition }` to it. It moves into the Awarded carousel with the result and competition written over a dark shadow at the foot of the frame, and it is listed automatically under **Awards** on the About page. There is no separate awards list to keep in sync.

### Project images

Each project's `coverImage` / `heroImage` points at a screenshot of the live site in `public/images/projects/`. To replace or add one:

1. Put the file in `public/images/projects/`.
2. Set `coverImage` and/or `heroImage` to its path, e.g. `"/images/projects/marginku-cover.webp"`.

Setting either back to `null` is supported — the card falls back to a typographic placeholder tile rather than a broken image.

`imageTreatment` controls the filter applied to a project's images (`normal`, `grayscale`, `highContrast`, `monochrome`); see `lib/imageTreatment.ts`. Cards render the treatment by default and reveal full color on hover.

The `gallery` array takes `{ src, alt, width, height, caption? }` entries and shows them on the detail page under **Gallery**, between the overview and the team. Images are never cropped: each shows at its real shape, so `width` and `height` must match the file (a test checks this). Images pair up two to a row; with an odd count the first one leads at full width. Gallery images are always shown in colour, whatever `imageTreatment` the cover uses.

The web projects' galleries are screenshots of their live sites, kept in a folder per project (`public/images/projects/<slug>/`). The Hospi AI ones come from its demo (`/present` and the Front Office board). Marginku's app sits behind a sign-in, so its gallery shows the public pages, including the live calculator.

#### Re-capturing screenshots

The existing screenshots were captured with headless Chrome:

```bash
chrome --headless=new --disable-gpu --hide-scrollbars \
  --virtual-time-budget=9000 --window-size=1440,900 \
  --screenshot=out.png https://your-project-url
```

then resized to 1600×1000 and converted to WebP with `sharp`. The newer gallery shots were taken the same way at a 2× device scale, so they stay sharp after the resize. Pages that need a click to reach, like the Hospi AI staff board, were driven with `puppeteer-core` against the installed Chrome.

### Replacing the portraits

Two separate portraits are used:

| File | Used by |
| --- | --- |
| `public/images/hero-black-shirt.webp` | Homepage hero — **transparent cut-out, full colour**, so the masthead type runs behind the figure |
| `public/images/hero.webp` | Open Graph / Twitter card image only |
| `public/images/about-seated.webp` | About page |

The hero needs a background-removed image with a real alpha channel; a photo with its background intact would sit as an opaque rectangle across the masthead. The social card deliberately uses the *non*-cut-out photo, since a transparent PNG renders against whatever background each platform picks.

Replace either file to change that portrait. Both are cropped to suit their container (the hero is wide and anchored near the top; the About image is exactly 3:4), so re-crop a replacement to a similar ratio or adjust the `object-position` class on the corresponding `<Image>`.

When swapping a portrait, give the new file a **new filename** and update the `src`. Browsers and CDNs cache these aggressively by URL, so overwriting a file in place will keep serving the old image.

## Design System

Tailwind v4 is configured CSS-first. All design tokens live in the `@theme` block at the top of `app/globals.css`:

```css
@theme {
  --color-background: #050505;
  --color-foreground: #f2f2ee;
  --color-muted: #a0a0a0;
  --color-border: rgba(255, 255, 255, 0.15);

  --font-display: var(--font-league-spartan), sans-serif;
  --font-body: var(--font-inter), sans-serif;

  --breakpoint-tablet: 768px;
  --breakpoint-laptop: 1024px;
  --breakpoint-desktop: 1440px;
}
```

Changing a value there updates every `bg-background`, `text-muted`, `font-display`, `tablet:` utility, and so on across the site. Fonts are loaded with `next/font/google` in `app/layout.tsx`.

## Motion & Accessibility

Motion is built to degrade safely:

- **Opening overlay:** plays on every full page load (not on client-side navigation between pages), then fades out. Skipped entirely under `prefers-reduced-motion: reduce`.
- **Hero entrance:** each masthead letter slides up out of its own clip mask in sequence, the portrait rises into place, and the corner text follows. It is pure CSS, so the hero ships no client-side JavaScript, and it is held with `animation-play-state: paused` until the overlay sets `data-intro-done` on `<html>` — otherwise it would play out behind the overlay.
- The custom cursor is disabled under reduced motion and never renders on touch / coarse-pointer devices.
- Under reduced motion every entrance renders in its final state immediately, and the ambient background holds still rather than disappearing.

`usePrefersReducedMotion()` and `useIsTouchDevice()` (in `lib/hooks/`) both wrap `useMediaQuery`, which uses `useSyncExternalStore` for hydration-safe subscriptions.

To adjust the hero timing, edit the `.hero-slide-up` / `.hero-rise` / `.hero-portrait-rise` keyframes in `app/globals.css` for duration and easing, and the `delay()` values in `components/hero/Hero.tsx` for the stagger.

## Project Structure

```
app/                  Routes (home, about, work, work/[slug], process, contact, 404, sitemap, robots)
components/
  layout/             Navbar, MobileMenu, Footer, PageTransition, LenisProvider
  motion/             NoiseOverlay, CustomCursor, AnimatedBackground
  intro/              IntroOverlay
  hero/               Hero
  projects/           ProjectCard, ProjectGrid, ProjectIndex
  capabilities/       Capabilities
  process/            ProcessSection
  typography/         SectionHeading
  contact/            ContactForm
lib/
  types.ts            Shared content types
  content/            All editable site content
  hooks/              useMediaQuery, usePrefersReducedMotion, useIsTouchDevice
public/images/        Static images (hero portrait)
docs/superpowers/     Design spec and implementation plan
```

## Testing

```bash
npm test
```

Tests cover the content layer, media-query hooks, and component rendering/behavior (navigation, project cards, contact form validation and success state). Tests live next to the code they cover as `*.test.tsx`.

## Deployment

The site is a fully static Next.js build and deploys to Vercel with no extra configuration:

1. Push the repository to GitHub.
2. Import it in Vercel.
3. Set `NEXT_PUBLIC_SITE_URL` to the production domain.

## Current Limitations

- **The contact form does not send anything.** It validates input and shows a success state, but there is no backend, no persistence, and no email. Wiring it up is planned for a later phase.
- There is no CMS or admin area; content is edited in `lib/content/`.
