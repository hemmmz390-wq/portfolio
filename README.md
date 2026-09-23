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

### Project images

Each project's `coverImage` / `heroImage` points at a screenshot of the live site in `public/images/projects/`. To replace or add one:

1. Put the file in `public/images/projects/`.
2. Set `coverImage` and/or `heroImage` to its path, e.g. `"/images/projects/marginku-cover.webp"`.

Setting either back to `null` is supported — the card falls back to a typographic placeholder tile rather than a broken image.

`imageTreatment` controls the filter applied to a project's images (`normal`, `grayscale`, `highContrast`, `monochrome`); see `lib/imageTreatment.ts`. Cards render the treatment by default and reveal full color on hover.

The `gallery` array works the same way and accepts `{ src, alt, caption? }` entries.

#### Re-capturing screenshots

The existing screenshots were captured with headless Chrome:

```bash
chrome --headless=new --disable-gpu --hide-scrollbars \
  --virtual-time-budget=9000 --window-size=1440,900 \
  --screenshot=out.png https://your-project-url
```

then resized to 1600×1000 and converted to WebP with `sharp`.

### Replacing the portraits

Two separate portraits are used:

| File | Used by |
| --- | --- |
| `public/images/hero.webp` | Homepage hero |
| `public/images/about.webp` | About page |

Replace either file to change that portrait. Both are cropped to suit their container (the hero is wide and anchored near the top; the About image is 3:4), so re-crop a replacement to a similar ratio or adjust the `object-position` class on the corresponding `<Image>`.

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

- The glitch entrance (RGB channel split, scanline sweep, jitter), hero parallax, and the custom cursor are all disabled under `prefers-reduced-motion: reduce`.
- The custom cursor also never renders on touch / coarse-pointer devices.
- The hero portrait reveal is a CSS animation rather than a JS one, so it is never blank while JavaScript hydrates.

`usePrefersReducedMotion()` and `useIsTouchDevice()` (in `lib/hooks/`) both wrap `useMediaQuery`, which uses `useSyncExternalStore` for hydration-safe subscriptions.

To adjust motion timing, edit the keyframes and `.glitch-*` / `.hero-reveal` classes in `app/globals.css`, and the Framer Motion variants in the relevant component.

## Project Structure

```
app/                  Routes (home, about, work, work/[slug], process, contact, 404, sitemap, robots)
components/
  layout/             Navbar, MobileMenu, Footer, PageTransition, LenisProvider
  motion/             NoiseOverlay, CustomCursor
  hero/               Hero, GlitchText
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
