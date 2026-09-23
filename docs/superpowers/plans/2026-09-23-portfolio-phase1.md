# Editorial Portfolio — Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete static frontend (no database/CMS/auth) for Elbert Alwi's editorial dark portfolio — home, about, work index, project detail, process, and contact pages — matching the approved design spec.

**Architecture:** Next.js App Router + TypeScript, content served from typed local data files (not hardcoded in components) so Phase 2 can swap in a database without touching component code. Framer Motion drives all animation; a single `prefers-reduced-motion` check gates the glitch entrance, parallax, and custom cursor.

**Tech Stack:** Next.js (App Router), TypeScript (strict), Tailwind CSS, Framer Motion, Lenis (smooth scroll), React Hook Form + Zod (contact form validation only), Vitest + React Testing Library (tests), ESLint + Prettier.

Design spec: [docs/superpowers/specs/2026-09-23-portfolio-phase1-design.md](../specs/2026-09-23-portfolio-phase1-design.md)

## Global Constraints

- Background `#050505`, primary text `#F2F2EE`, secondary text `#A0A0A0`, borders `rgba(255,255,255,0.15)` — no accent color.
- Typography: **League Spartan** for display/headline sizes (80–180px hero, 32–64px section headings, nav), **Inter** for body (14–18px) and metadata (8–12px).
- No GSAP in Phase 1 — Framer Motion covers all specified motion.
- No database, auth, admin routes, file uploads, or working email send in Phase 1.
- No fabricated clients, awards, testimonials, or metrics anywhere in copy.
- `prefers-reduced-motion: reduce` disables: glitch entrance effect, parallax, custom cursor, magnetic hover — these fall back to plain fade/no-op.
- Touch/coarse-pointer devices never render the custom cursor.
- Breakpoints: mobile 320–767px, tablet 768–1023px, laptop 1024–1439px, desktop 1440px+.
- Real content only: name "Elbert Alwi", role "Web Developer / Photographer / Content Creator", email `elbertalwi0103@gmail.com`, 3 real projects (Marginku, Hospi AI, Hibiz) — see spec §5 for exact copy.
- Project cover/hero images: none supplied yet. Render a typographic placeholder tile (large project number + category over a dark gradient) instead of a broken `<Image>` — do not fabricate or stock-photo a project screenshot.

---

## File Structure

```
app/
  layout.tsx                 Root layout: fonts, NoiseOverlay, CustomCursor, LenisProvider, PageTransition
  page.tsx                   Home page — assembles all homepage sections
  about/page.tsx
  work/page.tsx
  work/[slug]/page.tsx
  process/page.tsx
  contact/page.tsx
  globals.css

components/
  layout/Navbar.tsx
  layout/MobileMenu.tsx
  layout/Footer.tsx
  layout/PageTransition.tsx
  layout/LenisProvider.tsx
  motion/NoiseOverlay.tsx
  motion/CustomCursor.tsx
  hero/Hero.tsx
  typography/SectionHeading.tsx
  marquee/Marquee.tsx
  projects/ProjectCard.tsx
  projects/ProjectGrid.tsx
  projects/ProjectIndex.tsx
  process/ProcessSection.tsx
  capabilities/Capabilities.tsx
  contact/ContactForm.tsx

lib/
  types.ts
  content/site.ts
  content/projects.ts
  content/process.ts
  content/capabilities.ts
  hooks/usePrefersReducedMotion.ts
  hooks/useIsTouchDevice.ts

public/images/hero.webp        (copied from user-provided reference)

tests/setup.ts
vitest.config.ts
```

---

### Task 1: Project Scaffolding & Design Tokens

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`, `.eslintrc.json`, `.prettierrc`, `vitest.config.ts`, `tests/setup.ts`, `app/globals.css`, `app/layout.tsx` (minimal shell, extended in Task 15), `public/images/hero.webp`
- Test: `tests/setup.smoke.test.ts`

**Interfaces:**
- Produces: Tailwind theme colors `background`, `foreground`, `muted`, `border`; Tailwind font families `font-display` (League Spartan), `font-body` (Inter); path alias `@/*` → project root.

- [ ] **Step 1: Scaffold the Next.js project**

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias "@/*" --use-npm --no-turbopack
```

When prompted about a non-empty directory (the `docs/` folder already exists), confirm to proceed.

- [ ] **Step 2: Install additional dependencies**

```bash
npm install framer-motion lenis react-hook-form @hookform/resolvers zod
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom prettier
```

- [ ] **Step 3: Configure Tailwind design tokens**

Replace `tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        foreground: "#F2F2EE",
        muted: "#A0A0A0",
        border: "rgba(255,255,255,0.15)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      screens: {
        tablet: "768px",
        laptop: "1024px",
        desktop: "1440px",
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 4: Write global styles**

Replace `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: auto;
}

body {
  background-color: #050505;
  color: #F2F2EE;
  font-family: var(--font-body), sans-serif;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 5: Load fonts and write minimal root layout**

Create `app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { League_Spartan, Inter } from "next/font/google";
import "./globals.css";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Elbert Alwi",
  description: "Web Developer / Photographer / Content Creator",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${leagueSpartan.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 6: Configure the `@/*` path alias**

Confirm `tsconfig.json` includes (create-next-app sets this from the `--import-alias` flag, verify it's present):

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

- [ ] **Step 7: Configure Vitest**

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
```

Create `tests/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
import { vi, beforeEach } from "vitest";

vi.mock("next/font/google", () => ({
  League_Spartan: () => ({ variable: "--font-display", className: "font-display" }),
  Inter: () => ({ variable: "--font-body", className: "font-body" }),
}));

beforeEach(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});
```

Add to `package.json` scripts: `"test": "vitest run"`.

- [ ] **Step 8: Write and run a smoke test to verify the test harness works**

Create `tests/setup.smoke.test.ts`:

```ts
import { describe, expect, it } from "vitest";

describe("test harness", () => {
  it("runs", () => {
    expect(1 + 1).toBe(2);
  });
});
```

Run: `npm test`
Expected: PASS (1 test)

- [ ] **Step 9: Copy the hero reference photo into `public/images`**

```bash
mkdir -p public/images
cp docs/superpowers/specs/assets/hero-reference.webp public/images/hero.webp
```

- [ ] **Step 10: Verify the build compiles**

Run: `npx tsc --noEmit && npm run build`
Expected: build succeeds (the default Next.js starter page is still in place — that's fine, Task 16 replaces it).

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js project with design tokens and test harness"
```

---

### Task 2: Content Data Layer & Types

**Files:**
- Create: `lib/types.ts`, `lib/content/site.ts`, `lib/content/projects.ts`, `lib/content/process.ts`, `lib/content/capabilities.ts`
- Test: `lib/content/projects.test.ts`

**Interfaces:**
- Consumes: nothing (base data layer)
- Produces: `SiteSettings`, `NavLink`, `SocialLink`, `Project`, `ImageTreatment`, `ProcessStep`, `Capability` types; `siteSettings`, `navLinks`, `projects`, `getProjectBySlug(slug: string): Project | undefined`, `processSteps`, `capabilities` values.

- [ ] **Step 1: Write the failing test for `getProjectBySlug`**

Create `lib/content/projects.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { projects, getProjectBySlug } from "@/lib/content/projects";

describe("projects content", () => {
  it("has exactly 3 real projects", () => {
    expect(projects).toHaveLength(3);
  });

  it("finds a project by slug", () => {
    const project = getProjectBySlug("marginku");
    expect(project?.title).toBe("Marginku");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getProjectBySlug("does-not-exist")).toBeUndefined();
  });

  it("every project has a non-empty description and no cover image fabricated", () => {
    for (const project of projects) {
      expect(project.description.length).toBeGreaterThan(0);
      expect(project.coverImage).toBeNull();
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- projects.test`
Expected: FAIL — `lib/content/projects.ts` does not exist yet

- [ ] **Step 3: Write `lib/types.ts`**

```ts
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
```

- [ ] **Step 4: Write `lib/content/site.ts`**

```ts
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
```

- [ ] **Step 5: Write `lib/content/projects.ts`**

```ts
import { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    slug: "marginku",
    number: "01",
    title: "Marginku",
    category: "Financial Tool / Web App",
    year: "2026",
    role: "Solo Developer",
    shortDescription:
      "A margin-tracking tool that shows Indonesian small business owners where their profit actually goes.",
    description:
      "Marginku is a margin-tracking web app for Indonesian small business (UMKM) owners who sell well but don't know where the profit goes. Owners enter cost and sale price; the app calculates per-product margin, a suggested price for a target margin, weighted-average cost of goods from the last 3 purchases, delivery-platform commission differences across GoFood, GrabFood, and ShopeeFood, and a monthly budget split across materials, operations, packaging, marketing, and reserve. All data stays local in the browser — no login, no server.",
    coverImage: null,
    heroImage: null,
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
    shortDescription:
      "A hotel digital assistant that turns guest requests into routed, SLA-tracked work tickets.",
    description:
      "Hospi AI is a hotel digital assistant that turns guest requests into work tickets routed to the correct department automatically. Guests scan a room QR code, or enter a room number, and ask for something via chat, quick buttons, or voice, in their own language across 8 supported languages. The AI determines intent, department, and urgency; the ticket appears on the right staff dashboard — Front Office, Housekeeping, Maintenance, Duty Manager, or Restaurant — with a live SLA timer. Replies follow the guest's own language rather than a fixed menu selection, contextual upsell offers appear while ordering, low ratings auto-escalate to the Duty Manager, guests can request a human at any time, and a fallback rule engine keeps the system working even without an API key.",
    coverImage: null,
    heroImage: null,
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
    shortDescription:
      "A site for HIMA Business Technology and AI Innovation, documenting its committee and completed programs.",
    description:
      "Hibiz is a web site built for HIMA Business Technology and AI Innovation, listing the 2026-2027 committee members, their vision and mission, and documentation of the organization's completed programs and initiatives.",
    coverImage: null,
    heroImage: null,
    imageTreatment: "grayscale",
    gallery: [],
    featured: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
```

- [ ] **Step 6: Write `lib/content/process.ts`**

```ts
import { ProcessStep } from "@/lib/types";

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    description: "Understand the problem, the users, and the constraints before writing a single line of code.",
  },
  {
    number: "02",
    title: "Define",
    description: "Scope what actually needs to exist. Cut anything that doesn't serve the core problem.",
  },
  {
    number: "03",
    title: "Design",
    description: "Shape the structure, flow, and visual language of the product.",
  },
  {
    number: "04",
    title: "Build",
    description: "Write the code, capture the shots, or cut the footage — turn the plan into a working thing.",
  },
  {
    number: "05",
    title: "Refine",
    description: "Test it, use it, break it, and fix what doesn't hold up.",
  },
  {
    number: "06",
    title: "Launch",
    description: "Ship it, and keep an eye on how it holds up in the real world.",
  },
];
```

- [ ] **Step 7: Write `lib/content/capabilities.ts`**

```ts
import { Capability } from "@/lib/types";

export const capabilities: Capability[] = [
  {
    number: "01",
    title: "Frontend Development",
    tools: ["Next.js", "React", "Tailwind CSS", "VS Code"],
  },
  {
    number: "02",
    title: "Photography",
    tools: ["Lightroom", "Camera Gear"],
  },
  {
    number: "03",
    title: "Content Creation & Video Editing",
    tools: ["CapCut", "AI Studio"],
  },
];
```

- [ ] **Step 8: Run test to verify it passes**

Run: `npm test -- projects.test`
Expected: PASS (4 tests)

- [ ] **Step 9: Commit**

```bash
git add lib/
git commit -m "feat: add typed content data layer"
```

---

### Task 3: `usePrefersReducedMotion` & `useIsTouchDevice` Hooks

**Files:**
- Create: `lib/hooks/usePrefersReducedMotion.ts`, `lib/hooks/useIsTouchDevice.ts`
- Test: `lib/hooks/usePrefersReducedMotion.test.tsx`, `lib/hooks/useIsTouchDevice.test.tsx`

**Interfaces:**
- Produces: `usePrefersReducedMotion(): boolean`, `useIsTouchDevice(): boolean`

- [ ] **Step 1: Write the failing test for `usePrefersReducedMotion`**

Create `lib/hooks/usePrefersReducedMotion.test.tsx`:

```tsx
import { describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

describe("usePrefersReducedMotion", () => {
  it("returns true when the media query matches", () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: true,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })) as unknown as typeof window.matchMedia;

    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(true);
  });

  it("returns false when the media query does not match", () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })) as unknown as typeof window.matchMedia;

    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- usePrefersReducedMotion.test`
Expected: FAIL — module not found

- [ ] **Step 3: Implement `lib/hooks/usePrefersReducedMotion.ts`**

```ts
"use client";

import { useEffect, useState } from "react";

export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => setPrefersReduced(event.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReduced;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- usePrefersReducedMotion.test`
Expected: PASS (2 tests)

- [ ] **Step 5: Write the failing test for `useIsTouchDevice`**

Create `lib/hooks/useIsTouchDevice.test.tsx`:

```tsx
import { describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useIsTouchDevice } from "@/lib/hooks/useIsTouchDevice";

describe("useIsTouchDevice", () => {
  it("returns true for a coarse pointer", () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: true,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })) as unknown as typeof window.matchMedia;

    const { result } = renderHook(() => useIsTouchDevice());
    expect(result.current).toBe(true);
  });
});
```

- [ ] **Step 6: Implement `lib/hooks/useIsTouchDevice.ts`**

```ts
"use client";

import { useEffect, useState } from "react";

export function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: coarse)");
    setIsTouch(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => setIsTouch(event.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isTouch;
}
```

- [ ] **Step 7: Run both hook tests to verify they pass**

Run: `npm test -- lib/hooks`
Expected: PASS (3 tests)

- [ ] **Step 8: Commit**

```bash
git add lib/hooks/
git commit -m "feat: add reduced-motion and touch-device hooks"
```

---

### Task 4: `NoiseOverlay` Component

**Files:**
- Create: `components/motion/NoiseOverlay.tsx`
- Test: `components/motion/NoiseOverlay.test.tsx`

**Interfaces:**
- Consumes: nothing
- Produces: `<NoiseOverlay />` — no props, renders a fixed, `pointer-events: none`, `aria-hidden` SVG turbulence overlay.

- [ ] **Step 1: Write the failing test**

Create `components/motion/NoiseOverlay.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { NoiseOverlay } from "@/components/motion/NoiseOverlay";

describe("NoiseOverlay", () => {
  it("renders an aria-hidden, non-interactive overlay", () => {
    const { container } = render(<NoiseOverlay />);
    const overlay = container.querySelector('[data-testid="noise-overlay"]');
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveAttribute("aria-hidden", "true");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- NoiseOverlay.test`
Expected: FAIL — module not found

- [ ] **Step 3: Implement `components/motion/NoiseOverlay.tsx`**

```tsx
export function NoiseOverlay() {
  return (
    <div
      data-testid="noise-overlay"
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.035] mix-blend-overlay"
    >
      <svg width="100%" height="100%">
        <filter id="noise-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-filter)" />
      </svg>
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- NoiseOverlay.test`
Expected: PASS (1 test)

- [ ] **Step 5: Commit**

```bash
git add components/motion/NoiseOverlay.tsx components/motion/NoiseOverlay.test.tsx
git commit -m "feat: add NoiseOverlay component"
```

---

### Task 5: `CustomCursor` Component

**Files:**
- Create: `components/motion/CustomCursor.tsx`
- Test: `components/motion/CustomCursor.test.tsx`

**Interfaces:**
- Consumes: `useIsTouchDevice(): boolean` (Task 3), `usePrefersReducedMotion(): boolean` (Task 3)
- Produces: `<CustomCursor />` — no props. Renders `null` on touch devices. Exposes a `data-cursor-label` attribute mechanism: any element with `data-cursor-label="VIEW PROJECT →"` expands the cursor on hover.

- [ ] **Step 1: Write the failing test**

Create `components/motion/CustomCursor.test.tsx`:

```tsx
import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { CustomCursor } from "@/components/motion/CustomCursor";

vi.mock("@/lib/hooks/useIsTouchDevice", () => ({
  useIsTouchDevice: vi.fn(),
}));

import { useIsTouchDevice } from "@/lib/hooks/useIsTouchDevice";

describe("CustomCursor", () => {
  it("renders nothing on touch devices", () => {
    vi.mocked(useIsTouchDevice).mockReturnValue(true);
    const { container } = render(<CustomCursor />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders the cursor dot on non-touch devices", () => {
    vi.mocked(useIsTouchDevice).mockReturnValue(false);
    const { getByTestId } = render(<CustomCursor />);
    expect(getByTestId("custom-cursor")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- CustomCursor.test`
Expected: FAIL — module not found

- [ ] **Step 3: Implement `components/motion/CustomCursor.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useIsTouchDevice } from "@/lib/hooks/useIsTouchDevice";

export function CustomCursor() {
  const isTouch = useIsTouchDevice();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (isTouch) return;

    const handleMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      const target = (event.target as HTMLElement)?.closest("[data-cursor-label]");
      setLabel(target ? target.getAttribute("data-cursor-label") : null);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <motion.div
      data-testid="custom-cursor"
      className="pointer-events-none fixed z-[10000] flex items-center justify-center rounded-full bg-foreground text-background"
      animate={{
        x: position.x - (label ? 48 : 4),
        y: position.y - (label ? 48 : 4),
        width: label ? 96 : 8,
        height: label ? 96 : 8,
      }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
    >
      {label && <span className="font-body text-[10px] uppercase text-center leading-tight">{label}</span>}
    </motion.div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- CustomCursor.test`
Expected: PASS (2 tests)

- [ ] **Step 5: Commit**

```bash
git add components/motion/CustomCursor.tsx components/motion/CustomCursor.test.tsx
git commit -m "feat: add CustomCursor component"
```

---

### Task 6: `Navbar` & `MobileMenu` Components

**Files:**
- Create: `components/layout/Navbar.tsx`, `components/layout/MobileMenu.tsx`
- Test: `components/layout/Navbar.test.tsx`, `components/layout/MobileMenu.test.tsx`

**Interfaces:**
- Consumes: `NavLink`, `SocialLink` types (Task 2)
- Produces: `<Navbar name={string} links={NavLink[]} />`, `<MobileMenu links={NavLink[]} socials={SocialLink[]} isOpen={boolean} onClose={() => void} />`

- [ ] **Step 1: Write the failing test for `Navbar`**

Create `components/layout/Navbar.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Navbar } from "@/components/layout/Navbar";

const links = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
];

describe("Navbar", () => {
  it("renders the name and all nav links", () => {
    render(<Navbar name="Elbert Alwi" links={links} />);
    expect(screen.getByText("Elbert Alwi")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute("href", "/work");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- Navbar.test`
Expected: FAIL — module not found

- [ ] **Step 3: Implement `components/layout/Navbar.tsx`**

```tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { NavLink } from "@/lib/types";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { SocialLink } from "@/lib/types";

interface NavbarProps {
  name: string;
  links: NavLink[];
  socials?: SocialLink[];
}

export function Navbar({ name, links, socials = [] }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 tablet:px-10">
      <Link href="/" className="font-display text-sm uppercase tracking-wide text-foreground">
        {name}
      </Link>

      <nav className="hidden tablet:flex items-center gap-8">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-body text-xs uppercase tracking-wide text-foreground/80 transition-opacity hover:opacity-100 opacity-70"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <button
        type="button"
        aria-label="Open menu"
        onClick={() => setMobileOpen(true)}
        className="tablet:hidden font-body text-xs uppercase tracking-wide text-foreground"
      >
        Menu
      </button>

      <MobileMenu links={links} socials={socials} isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
```

- [ ] **Step 4: Run `Navbar` test to verify it passes**

Run: `npm test -- Navbar.test`
Expected: PASS (1 test) — will still fail until `MobileMenu` exists; proceed to Step 5 before re-running.

- [ ] **Step 5: Write the failing test for `MobileMenu`**

Create `components/layout/MobileMenu.test.tsx`:

```tsx
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MobileMenu } from "@/components/layout/MobileMenu";

const links = [{ label: "About", href: "/about" }];
const socials = [{ label: "Instagram", url: "https://instagram.com/bert_alwi" }];

describe("MobileMenu", () => {
  it("renders nothing when closed", () => {
    const { container } = render(
      <MobileMenu links={links} socials={socials} isOpen={false} onClose={vi.fn()} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders links and socials when open", () => {
    render(<MobileMenu links={links} socials={socials} isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByRole("link", { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /instagram/i })).toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", () => {
    const onClose = vi.fn();
    render(<MobileMenu links={links} socials={socials} isOpen={true} onClose={onClose} />);
    screen.getByRole("button", { name: /close menu/i }).click();
    expect(onClose).toHaveBeenCalled();
  });
});
```

- [ ] **Step 6: Implement `components/layout/MobileMenu.tsx`**

```tsx
"use client";

import Link from "next/link";
import { NavLink, SocialLink } from "@/lib/types";

interface MobileMenuProps {
  links: NavLink[];
  socials: SocialLink[];
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ links, socials, isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex flex-col justify-between bg-background px-6 py-8">
      <div className="flex justify-end">
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="font-body text-xs uppercase tracking-wide text-foreground"
        >
          Close
        </button>
      </div>

      <nav className="flex flex-col gap-4">
        {links.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="font-display text-4xl uppercase text-foreground"
          >
            {String(index + 1).padStart(2, "0")} {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex gap-6">
        {socials.map((social) => (
          <a
            key={social.url}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs uppercase text-muted"
          >
            {social.label}
          </a>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 7: Run all layout tests to verify they pass**

Run: `npm test -- components/layout`
Expected: PASS (4 tests)

- [ ] **Step 8: Commit**

```bash
git add components/layout/Navbar.tsx components/layout/MobileMenu.tsx components/layout/Navbar.test.tsx components/layout/MobileMenu.test.tsx
git commit -m "feat: add Navbar and MobileMenu components"
```

---

### Task 7: `Hero` Component (Glitch Entrance)

**Files:**
- Create: `components/hero/Hero.tsx`
- Test: `components/hero/Hero.test.tsx`

**Interfaces:**
- Consumes: `usePrefersReducedMotion(): boolean` (Task 3)
- Produces: `<Hero headline={string[]} subheadline={string[]} imageSrc={string} imageAlt={string} />`

- [ ] **Step 1: Write the failing test**

Create `components/hero/Hero.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/hero/Hero";

describe("Hero", () => {
  it("renders the headline, subheadline, and hero image", () => {
    render(
      <Hero
        headline={["BUILDING FOR", "THE WEB."]}
        subheadline={["TURNING IDEAS", "INTO INTERFACES."]}
        imageSrc="/images/hero.webp"
        imageAlt="Elbert Alwi portrait"
      />
    );
    expect(screen.getByText("BUILDING FOR")).toBeInTheDocument();
    expect(screen.getByText("THE WEB.")).toBeInTheDocument();
    expect(screen.getByText("TURNING IDEAS")).toBeInTheDocument();
    expect(screen.getByAltText("Elbert Alwi portrait")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- Hero.test`
Expected: FAIL — module not found

- [ ] **Step 3: Implement `components/hero/Hero.tsx`**

```tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

interface HeroProps {
  headline: string[];
  subheadline: string[];
  imageSrc: string;
  imageAlt: string;
}

export function Hero({ headline, subheadline, imageSrc, imageAlt }: HeroProps) {
  const reducedMotion = usePrefersReducedMotion();

  const imageVariants = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } } }
    : {
        hidden: { opacity: 0, filter: "hue-rotate(90deg) saturate(3)", x: -8 },
        visible: {
          opacity: 1,
          filter: "hue-rotate(0deg) saturate(1)",
          x: 0,
          transition: { duration: 0.6, ease: "easeOut" },
        },
      };

  const lineVariants = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } } }
    : {
        hidden: { opacity: 0, x: -4, skewX: 6 },
        visible: { opacity: 1, x: 0, skewX: 0, transition: { duration: 0.4, ease: "easeOut" } },
      };

  return (
    <section className="relative flex min-h-screen items-end overflow-hidden px-6 pb-16 tablet:px-10">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={imageVariants}
        className="absolute inset-0 grayscale contrast-110"
      >
        <Image src={imageSrc} alt={imageAlt} fill priority className="object-cover object-top" />
      </motion.div>

      <div className="relative z-10 flex w-full flex-col gap-6 tablet:flex-row tablet:items-end tablet:justify-between">
        <h1 className="font-display text-[15vw] leading-[0.9] uppercase text-foreground tablet:text-[8vw]">
          {headline.map((line, index) => (
            <motion.span
              key={line}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={lineVariants}
              transition={{ delay: index * 0.1 }}
              className="block"
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <div className="font-body text-xs uppercase tracking-wide text-muted">
          {subheadline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- Hero.test`
Expected: PASS (1 test)

- [ ] **Step 5: Commit**

```bash
git add components/hero/Hero.tsx components/hero/Hero.test.tsx
git commit -m "feat: add Hero component with glitch entrance"
```

---

### Task 8: `SectionHeading` & `Marquee` Components

**Files:**
- Create: `components/typography/SectionHeading.tsx`, `components/marquee/Marquee.tsx`
- Test: `components/typography/SectionHeading.test.tsx`, `components/marquee/Marquee.test.tsx`

**Interfaces:**
- Produces: `<SectionHeading eyebrow?={string} title={string} className?={string} />`, `<Marquee items={string[]} direction?={"left" | "right"} speed?={number} />`

- [ ] **Step 1: Write the failing test for `SectionHeading`**

Create `components/typography/SectionHeading.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionHeading } from "@/components/typography/SectionHeading";

describe("SectionHeading", () => {
  it("renders the title and optional eyebrow", () => {
    render(<SectionHeading eyebrow="Selected Work" title="Projects" />);
    expect(screen.getByText("Selected Work")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
  });

  it("renders without an eyebrow", () => {
    render(<SectionHeading title="About" />);
    expect(screen.getByText("About")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Implement `components/typography/SectionHeading.tsx`**

```tsx
interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  className?: string;
}

export function SectionHeading({ eyebrow, title, className = "" }: SectionHeadingProps) {
  return (
    <div className={className}>
      {eyebrow && (
        <p className="mb-2 font-body text-xs uppercase tracking-widest text-muted">{eyebrow}</p>
      )}
      <h2 className="font-display text-4xl uppercase leading-tight text-foreground tablet:text-6xl">
        {title}
      </h2>
    </div>
  );
}
```

- [ ] **Step 3: Run `SectionHeading` test to verify it passes**

Run: `npm test -- SectionHeading.test`
Expected: PASS (2 tests)

- [ ] **Step 4: Write the failing test for `Marquee`**

Create `components/marquee/Marquee.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Marquee } from "@/components/marquee/Marquee";

describe("Marquee", () => {
  it("renders each item at least once", () => {
    render(<Marquee items={["FRONTEND DEVELOPMENT", "PHOTOGRAPHY"]} />);
    expect(screen.getAllByText("FRONTEND DEVELOPMENT").length).toBeGreaterThan(0);
    expect(screen.getAllByText("PHOTOGRAPHY").length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 5: Run test to verify it fails**

Run: `npm test -- Marquee.test`
Expected: FAIL — module not found

- [ ] **Step 6: Implement `components/marquee/Marquee.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

interface MarqueeProps {
  items: string[];
  direction?: "left" | "right";
  speed?: number;
}

export function Marquee({ items, direction = "left", speed = 25 }: MarqueeProps) {
  const reducedMotion = usePrefersReducedMotion();
  const doubledItems = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-border py-4">
      <motion.div
        className="flex w-max gap-12 whitespace-nowrap font-display text-2xl uppercase text-foreground"
        animate={
          reducedMotion
            ? undefined
            : { x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }
        }
        transition={reducedMotion ? undefined : { duration: speed, ease: "linear", repeat: Infinity }}
      >
        {doubledItems.map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 7: Run test to verify it passes**

Run: `npm test -- Marquee.test`
Expected: PASS (1 test)

- [ ] **Step 8: Commit**

```bash
git add components/typography/SectionHeading.tsx components/marquee/Marquee.tsx components/typography/SectionHeading.test.tsx components/marquee/Marquee.test.tsx
git commit -m "feat: add SectionHeading and Marquee components"
```

---

### Task 9: `ProjectCard` & `ProjectGrid` Components

**Files:**
- Create: `components/projects/ProjectCard.tsx`, `components/projects/ProjectGrid.tsx`
- Test: `components/projects/ProjectCard.test.tsx`, `components/projects/ProjectGrid.test.tsx`

**Interfaces:**
- Consumes: `Project` type (Task 2)
- Produces: `<ProjectCard project={Project} />`, `<ProjectGrid projects={Project[]} />`

- [ ] **Step 1: Write the failing test for `ProjectCard`**

Create `components/projects/ProjectCard.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/lib/content/projects";

describe("ProjectCard", () => {
  it("renders the project number, title, category, and year", () => {
    render(<ProjectCard project={projects[0]} />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("Marginku")).toBeInTheDocument();
    expect(screen.getByText("Financial Tool / Web App")).toBeInTheDocument();
    expect(screen.getByText("2026")).toBeInTheDocument();
  });

  it("links to the project detail page", () => {
    render(<ProjectCard project={projects[0]} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/work/marginku");
  });

  it("renders a typographic placeholder when there is no cover image", () => {
    render(<ProjectCard project={projects[0]} />);
    expect(screen.getByTestId("project-placeholder")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- ProjectCard.test`
Expected: FAIL — module not found

- [ ] **Step 3: Implement `components/projects/ProjectCard.tsx`**

```tsx
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor-label="VIEW PROJECT →"
      className="group block"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-background">
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover grayscale transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            data-testid="project-placeholder"
            className="flex h-full w-full flex-col justify-between border border-border bg-gradient-to-br from-background to-[#111111] p-6"
          >
            <span className="font-display text-6xl text-foreground/20">{project.number}</span>
            <span className="font-body text-xs uppercase tracking-wide text-muted">
              {project.category}
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-start justify-between">
        <div>
          <p className="font-body text-xs text-muted">{project.number}</p>
          <h3 className="font-display text-2xl uppercase text-foreground">{project.title}</h3>
          <p className="font-body text-xs uppercase tracking-wide text-muted">{project.category}</p>
        </div>
        <span className="font-body text-xs text-muted">{project.year}</span>
      </div>
    </Link>
  );
}
```

- [ ] **Step 4: Run `ProjectCard` test to verify it passes**

Run: `npm test -- ProjectCard.test`
Expected: PASS (3 tests)

- [ ] **Step 5: Write the failing test for `ProjectGrid`**

Create `components/projects/ProjectGrid.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { projects } from "@/lib/content/projects";

describe("ProjectGrid", () => {
  it("renders a card for every project", () => {
    render(<ProjectGrid projects={projects} />);
    expect(screen.getByText("Marginku")).toBeInTheDocument();
    expect(screen.getByText("Hospi AI")).toBeInTheDocument();
    expect(screen.getByText("Hibiz")).toBeInTheDocument();
  });
});
```

- [ ] **Step 6: Implement `components/projects/ProjectGrid.tsx`**

```tsx
import { Project } from "@/lib/types";
import { ProjectCard } from "@/components/projects/ProjectCard";

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="grid grid-cols-1 gap-12 tablet:grid-cols-2 tablet:gap-16">
      {projects.map((project, index) => (
        <div key={project.slug} className={index % 2 === 1 ? "tablet:mt-24" : ""}>
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 7: Run `ProjectGrid` test to verify it passes**

Run: `npm test -- ProjectGrid.test`
Expected: PASS (1 test)

- [ ] **Step 8: Commit**

```bash
git add components/projects/ProjectCard.tsx components/projects/ProjectGrid.tsx components/projects/ProjectCard.test.tsx components/projects/ProjectGrid.test.tsx
git commit -m "feat: add ProjectCard and ProjectGrid components"
```

---

### Task 10: `ProjectIndex` Component

**Files:**
- Create: `components/projects/ProjectIndex.tsx`
- Test: `components/projects/ProjectIndex.test.tsx`

**Interfaces:**
- Consumes: `Project` type (Task 2)
- Produces: `<ProjectIndex projects={Project[]} />` — compact numbered text list (distinct layout from `ProjectGrid`).

- [ ] **Step 1: Write the failing test**

Create `components/projects/ProjectIndex.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectIndex } from "@/components/projects/ProjectIndex";
import { projects } from "@/lib/content/projects";

describe("ProjectIndex", () => {
  it("renders every project as a numbered row with a link", () => {
    render(<ProjectIndex projects={projects} />);
    for (const project of projects) {
      const link = screen.getByRole("link", { name: new RegExp(project.title, "i") });
      expect(link).toHaveAttribute("href", `/work/${project.slug}`);
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- ProjectIndex.test`
Expected: FAIL — module not found

- [ ] **Step 3: Implement `components/projects/ProjectIndex.tsx`**

```tsx
import Link from "next/link";
import { Project } from "@/lib/types";

interface ProjectIndexProps {
  projects: Project[];
}

export function ProjectIndex({ projects }: ProjectIndexProps) {
  return (
    <ul className="divide-y divide-border border-t border-border">
      {projects.map((project) => (
        <li key={project.slug}>
          <Link
            href={`/work/${project.slug}`}
            data-cursor-label="VIEW PROJECT →"
            className="group flex items-center justify-between py-6 transition-opacity hover:opacity-70"
          >
            <span className="font-body text-xs text-muted">{project.number}</span>
            <span className="font-display text-2xl uppercase text-foreground tablet:text-4xl">
              {project.title}
            </span>
            <span className="hidden font-body text-xs uppercase tracking-wide text-muted tablet:block">
              {project.category}
            </span>
            <span className="font-body text-xs text-muted">{project.year}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- ProjectIndex.test`
Expected: PASS (1 test)

- [ ] **Step 5: Commit**

```bash
git add components/projects/ProjectIndex.tsx components/projects/ProjectIndex.test.tsx
git commit -m "feat: add ProjectIndex component"
```

---

### Task 11: `Capabilities` Component

**Files:**
- Create: `components/capabilities/Capabilities.tsx`
- Test: `components/capabilities/Capabilities.test.tsx`

**Interfaces:**
- Consumes: `Capability` type (Task 2)
- Produces: `<Capabilities capabilities={Capability[]} />`

- [ ] **Step 1: Write the failing test**

Create `components/capabilities/Capabilities.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Capabilities } from "@/components/capabilities/Capabilities";
import { capabilities } from "@/lib/content/capabilities";

describe("Capabilities", () => {
  it("renders every capability title and its tools", () => {
    render(<Capabilities capabilities={capabilities} />);
    expect(screen.getByText("Frontend Development")).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("Photography")).toBeInTheDocument();
    expect(screen.getByText("Lightroom")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- Capabilities.test`
Expected: FAIL — module not found

- [ ] **Step 3: Implement `components/capabilities/Capabilities.tsx`**

```tsx
"use client";

import { useState } from "react";
import { Capability } from "@/lib/types";

interface CapabilitiesProps {
  capabilities: Capability[];
}

export function Capabilities({ capabilities }: CapabilitiesProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <ul className="divide-y divide-border border-t border-border">
      {capabilities.map((capability, index) => (
        <li
          key={capability.number}
          onMouseEnter={() => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(null)}
          className="flex flex-col gap-2 py-6 tablet:flex-row tablet:items-center tablet:justify-between"
        >
          <div className="flex items-baseline gap-4">
            <span className="font-body text-xs text-muted">{capability.number}</span>
            <h3
              className={`font-display text-2xl uppercase tablet:text-4xl transition-opacity ${
                activeIndex !== null && activeIndex !== index ? "opacity-40" : "opacity-100"
              }`}
            >
              {capability.title}
            </h3>
          </div>
          <p className="font-body text-xs uppercase tracking-wide text-muted">
            {capability.tools.join(" · ")}
          </p>
        </li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- Capabilities.test`
Expected: PASS (1 test)

- [ ] **Step 5: Commit**

```bash
git add components/capabilities/Capabilities.tsx components/capabilities/Capabilities.test.tsx
git commit -m "feat: add Capabilities component"
```

---

### Task 12: `ProcessSection` Component

**Files:**
- Create: `components/process/ProcessSection.tsx`
- Test: `components/process/ProcessSection.test.tsx`

**Interfaces:**
- Consumes: `ProcessStep` type (Task 2)
- Produces: `<ProcessSection steps={ProcessStep[]} />`

- [ ] **Step 1: Write the failing test**

Create `components/process/ProcessSection.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProcessSection } from "@/components/process/ProcessSection";
import { processSteps } from "@/lib/content/process";

describe("ProcessSection", () => {
  it("renders every step with its number, title, and description", () => {
    render(<ProcessSection steps={processSteps} />);
    expect(screen.getByText("Discover")).toBeInTheDocument();
    expect(screen.getByText("Launch")).toBeInTheDocument();
    expect(screen.getAllByText(/^0[1-6]$/).length).toBe(6);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- ProcessSection.test`
Expected: FAIL — module not found

- [ ] **Step 3: Implement `components/process/ProcessSection.tsx`**

```tsx
import { ProcessStep } from "@/lib/types";

interface ProcessSectionProps {
  steps: ProcessStep[];
}

export function ProcessSection({ steps }: ProcessSectionProps) {
  return (
    <ol className="grid grid-cols-1 gap-10 tablet:grid-cols-2 laptop:grid-cols-3">
      {steps.map((step) => (
        <li key={step.number} className="border-t border-border pt-6">
          <span className="font-display text-4xl text-foreground/30">{step.number}</span>
          <h3 className="mt-2 font-display text-2xl uppercase text-foreground">{step.title}</h3>
          <p className="mt-2 font-body text-sm text-muted">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- ProcessSection.test`
Expected: PASS (1 test)

- [ ] **Step 5: Commit**

```bash
git add components/process/ProcessSection.tsx components/process/ProcessSection.test.tsx
git commit -m "feat: add ProcessSection component"
```

---

### Task 13: `Footer` Component

**Files:**
- Create: `components/layout/Footer.tsx`
- Test: `components/layout/Footer.test.tsx`

**Interfaces:**
- Consumes: `NavLink`, `SocialLink` types (Task 2)
- Produces: `<Footer name={string} email={string} socials={SocialLink[]} links={NavLink[]} />`

- [ ] **Step 1: Write the failing test**

Create `components/layout/Footer.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/layout/Footer";

const socials = [{ label: "Instagram", url: "https://instagram.com/bert_alwi" }];
const links = [{ label: "Home", href: "/" }];

describe("Footer", () => {
  it("renders the name, email, socials, nav links, and current year copyright", () => {
    render(<Footer name="Elbert Alwi" email="elbertalwi0103@gmail.com" socials={socials} links={links} />);
    expect(screen.getAllByText("Elbert Alwi").length).toBeGreaterThan(0);
    expect(screen.getByText("elbertalwi0103@gmail.com")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Instagram" })).toHaveAttribute(
      "href",
      "https://instagram.com/bert_alwi"
    );
    expect(screen.getByText(new RegExp(`${new Date().getFullYear()}`))).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- Footer.test`
Expected: FAIL — module not found

- [ ] **Step 3: Implement `components/layout/Footer.tsx`**

```tsx
import Link from "next/link";
import { NavLink, SocialLink } from "@/lib/types";

interface FooterProps {
  name: string;
  email: string;
  socials: SocialLink[];
  links: NavLink[];
}

export function Footer({ name, email, socials, links }: FooterProps) {
  return (
    <footer className="border-t border-border px-6 py-16 tablet:px-10">
      <p className="font-display text-2xl uppercase text-foreground">{name}</p>
      <p className="mt-2 font-body text-sm text-muted">Available for selected projects.</p>
      <a href={`mailto:${email}`} className="mt-4 block font-body text-sm text-foreground">
        {email}
      </a>

      <div className="mt-8 flex flex-wrap gap-6">
        {socials.map((social) => (
          <a
            key={social.url}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs uppercase text-muted"
          >
            {social.label}
          </a>
        ))}
      </div>

      <nav className="mt-8 flex flex-wrap gap-6">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="font-body text-xs uppercase text-muted">
            {link.label}
          </Link>
        ))}
      </nav>

      <p className="mt-16 font-display text-[12vw] uppercase leading-none text-foreground/10">
        {name}
      </p>

      <p className="mt-4 font-body text-xs text-muted">
        © {new Date().getFullYear()} {name}. All rights reserved.
      </p>
    </footer>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- Footer.test`
Expected: PASS (1 test)

- [ ] **Step 5: Commit**

```bash
git add components/layout/Footer.tsx components/layout/Footer.test.tsx
git commit -m "feat: add Footer component"
```

---

### Task 14: `PageTransition` & `LenisProvider`

**Files:**
- Create: `components/layout/PageTransition.tsx`, `components/layout/LenisProvider.tsx`
- Test: `components/layout/PageTransition.test.tsx`

**Interfaces:**
- Consumes: `usePrefersReducedMotion(): boolean` (Task 3)
- Produces: `<PageTransition>{children}</PageTransition>`, `<LenisProvider>{children}</LenisProvider>`

- [ ] **Step 1: Write the failing test for `PageTransition`**

Create `components/layout/PageTransition.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PageTransition } from "@/components/layout/PageTransition";

describe("PageTransition", () => {
  it("renders its children", () => {
    render(
      <PageTransition>
        <p>Page content</p>
      </PageTransition>
    );
    expect(screen.getByText("Page content")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- PageTransition.test`
Expected: FAIL — module not found

- [ ] **Step 3: Implement `components/layout/PageTransition.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, clipPath: reducedMotion ? undefined : "inset(0 0 100% 0)" }}
      animate={{ opacity: 1, clipPath: reducedMotion ? undefined : "inset(0 0 0% 0)" }}
      transition={{ duration: reducedMotion ? 0.2 : 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- PageTransition.test`
Expected: PASS (1 test)

- [ ] **Step 5: Implement `components/layout/LenisProvider.tsx`** (no unit test — wraps a third-party scroll library with no logic of its own to assert on; verified visually in Task 15)

```tsx
"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, [reducedMotion]);

  return <>{children}</>;
}
```

- [ ] **Step 6: Commit**

```bash
git add components/layout/PageTransition.tsx components/layout/LenisProvider.tsx components/layout/PageTransition.test.tsx
git commit -m "feat: add PageTransition and LenisProvider"
```

---

### Task 15: Root Layout Wiring

**Files:**
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `NoiseOverlay` (Task 4), `CustomCursor` (Task 5), `Navbar` (Task 6), `Footer` (Task 13), `LenisProvider` (Task 14), `siteSettings`, `navLinks` (Task 2)

- [ ] **Step 1: Update `app/layout.tsx` to wire in the shared chrome**

```tsx
import type { Metadata } from "next";
import { League_Spartan, Inter } from "next/font/google";
import "./globals.css";
import { NoiseOverlay } from "@/components/motion/NoiseOverlay";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { siteSettings, navLinks } from "@/lib/content/site";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: `${siteSettings.name} — ${siteSettings.role}`,
  description: siteSettings.introParagraph,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${leagueSpartan.variable} ${inter.variable}`}>
      <body>
        <LenisProvider>
          <NoiseOverlay />
          <CustomCursor />
          <Navbar name={siteSettings.name} links={navLinks} socials={siteSettings.socials} />
          {children}
          <Footer
            name={siteSettings.name}
            email={siteSettings.email}
            socials={siteSettings.socials}
            links={navLinks}
          />
        </LenisProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify the build compiles**

Run: `npx tsc --noEmit && npm run build`
Expected: build succeeds

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: wire shared chrome into root layout"
```

---

### Task 16: Home Page

**Files:**
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `Hero` (7), `SectionHeading` (8), `Marquee` (8), `ProjectGrid` (9), `ProjectIndex` (10), `Capabilities` (11), `ProcessSection` (12), `PageTransition` (14), all content from `lib/content/*` (2)

- [ ] **Step 1: Write `app/page.tsx` assembling all homepage sections**

```tsx
import { Hero } from "@/components/hero/Hero";
import { SectionHeading } from "@/components/typography/SectionHeading";
import { Marquee } from "@/components/marquee/Marquee";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { ProjectIndex } from "@/components/projects/ProjectIndex";
import { Capabilities } from "@/components/capabilities/Capabilities";
import { ProcessSection } from "@/components/process/ProcessSection";
import { PageTransition } from "@/components/layout/PageTransition";
import { siteSettings } from "@/lib/content/site";
import { projects } from "@/lib/content/projects";
import { capabilities } from "@/lib/content/capabilities";
import { processSteps } from "@/lib/content/process";
import Link from "next/link";

export default function HomePage() {
  return (
    <PageTransition>
      <main>
        <Hero
          headline={siteSettings.heroHeadline}
          subheadline={siteSettings.heroSubheadline}
          imageSrc="/images/hero.webp"
          imageAlt={`${siteSettings.name} portrait`}
        />

        <section className="px-6 py-24 tablet:px-10">
          <h2 className="max-w-3xl font-display text-3xl uppercase leading-tight text-foreground tablet:text-5xl">
            {siteSettings.introHeadline}
          </h2>
          <p className="mt-6 max-w-xl font-body text-sm text-muted">{siteSettings.introParagraph}</p>
        </section>

        <section className="px-6 py-24 tablet:px-10">
          <SectionHeading eyebrow="Selected Work" title="Projects" className="mb-12" />
          <ProjectGrid projects={projects.filter((project) => project.featured)} />
        </section>

        <section className="px-6 py-24 tablet:px-10">
          <SectionHeading eyebrow="Full Index" title="All Work" className="mb-12" />
          <ProjectIndex projects={projects} />
        </section>

        <Marquee items={capabilities.map((capability) => capability.title)} direction="left" />
        <Marquee items={["ELBERT ALWI", "WEB DEVELOPER", "PHOTOGRAPHER"]} direction="right" />

        <section className="px-6 py-24 tablet:px-10">
          <SectionHeading eyebrow="Method" title="Inside The Creative Process" className="mb-12" />
          <ProcessSection steps={processSteps} />
        </section>

        <section className="px-6 py-24 tablet:px-10">
          <SectionHeading eyebrow="What I Do" title="Capabilities" className="mb-12" />
          <Capabilities capabilities={capabilities} />
        </section>

        <section className="px-6 py-24 tablet:px-10">
          <h2 className="font-display text-4xl uppercase leading-tight text-foreground tablet:text-6xl">
            Let&rsquo;s Create Something Meaningful.
          </h2>
          <p className="mt-4 max-w-md font-body text-sm text-muted">
            Have a project, idea, or collaboration in mind? Let&rsquo;s talk.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block font-body text-xs uppercase tracking-wide text-foreground underline"
          >
            Start a Project →
          </Link>
        </section>
      </main>
    </PageTransition>
  );
}
```

- [ ] **Step 2: Verify build and manually check the homepage**

Run: `npm run build && npm run dev`

Open `http://localhost:3000` in the browser and confirm: hero image and glitch-in headline appear, intro text renders, selected work grid shows 3 projects with placeholder tiles, project index lists all 3, marquees scroll, process and capabilities sections render, CTA links to `/contact`, nav and footer are present.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble home page from all sections"
```

---

### Task 17: About Page

**Files:**
- Create: `app/about/page.tsx`

**Interfaces:**
- Consumes: `Capabilities` (11), `SectionHeading` (8), `PageTransition` (14), `siteSettings`, `capabilities` (2)

- [ ] **Step 1: Write `app/about/page.tsx`**

```tsx
import Image from "next/image";
import { SectionHeading } from "@/components/typography/SectionHeading";
import { Capabilities } from "@/components/capabilities/Capabilities";
import { PageTransition } from "@/components/layout/PageTransition";
import { siteSettings } from "@/lib/content/site";
import { capabilities } from "@/lib/content/capabilities";

export const metadata = {
  title: `About — ${siteSettings.name}`,
  description: siteSettings.introParagraph,
};

export default function AboutPage() {
  return (
    <PageTransition>
      <main className="px-6 pb-24 pt-32 tablet:px-10">
        <SectionHeading eyebrow="About Me" title="Who I Am" className="mb-12" />

        <div className="grid grid-cols-1 gap-12 tablet:grid-cols-2">
          <div className="relative aspect-[3/4] w-full overflow-hidden">
            <Image
              src="/images/hero.webp"
              alt={`${siteSettings.name} portrait`}
              fill
              className="object-cover object-top grayscale contrast-125"
            />
          </div>

          <div>
            <p className="font-display text-2xl uppercase leading-tight text-foreground tablet:text-3xl">
              {siteSettings.introParagraph}
            </p>
          </div>
        </div>

        <section className="mt-24">
          <SectionHeading eyebrow="What I Do" title="Capabilities" className="mb-12" />
          <Capabilities capabilities={capabilities} />
        </section>
      </main>
    </PageTransition>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npx tsc --noEmit && npm run build`
Expected: build succeeds

- [ ] **Step 3: Manually verify in browser**

Visit `http://localhost:3000/about` and confirm the portrait, intro text, and capabilities list render correctly on both desktop and a resized mobile viewport.

- [ ] **Step 4: Commit**

```bash
git add app/about/page.tsx
git commit -m "feat: add about page"
```

---

### Task 18: Work Index & Project Detail Pages

**Files:**
- Create: `app/work/page.tsx`, `app/work/[slug]/page.tsx`
- Test: `app/work/[slug]/page.test.tsx`

**Interfaces:**
- Consumes: `ProjectIndex` (10), `PageTransition` (14), `getProjectBySlug`, `projects` (2)
- Produces: `generateStaticParams()` in `app/work/[slug]/page.tsx` for static generation of all 3 project slugs.

- [ ] **Step 1: Write `app/work/page.tsx`**

```tsx
import { SectionHeading } from "@/components/typography/SectionHeading";
import { ProjectIndex } from "@/components/projects/ProjectIndex";
import { PageTransition } from "@/components/layout/PageTransition";
import { projects } from "@/lib/content/projects";
import { siteSettings } from "@/lib/content/site";

export const metadata = {
  title: `Work — ${siteSettings.name}`,
  description: "Selected projects.",
};

export default function WorkPage() {
  return (
    <PageTransition>
      <main className="px-6 pb-24 pt-32 tablet:px-10">
        <SectionHeading eyebrow="Index" title="All Work" className="mb-12" />
        {projects.length > 0 ? (
          <ProjectIndex projects={projects} />
        ) : (
          <p className="font-display text-2xl uppercase text-muted">Work coming soon.</p>
        )}
      </main>
    </PageTransition>
  );
}
```

- [ ] **Step 2: Write the failing test for the project detail page's static params**

Create `app/work/[slug]/page.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { generateStaticParams } from "@/app/work/[slug]/page";

describe("generateStaticParams", () => {
  it("returns a param object for every project slug", async () => {
    const params = await generateStaticParams();
    expect(params).toEqual([{ slug: "marginku" }, { slug: "hospi-ai" }, { slug: "hibiz" }]);
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npm test -- "app/work/\[slug\]/page.test"`
Expected: FAIL — module not found

- [ ] **Step 4: Implement `app/work/[slug]/page.tsx`**

```tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PageTransition } from "@/components/layout/PageTransition";
import { projects, getProjectBySlug } from "@/lib/content/projects";

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return { title: `${project.title} — Elbert Alwi`, description: project.shortDescription };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <PageTransition>
      <main className="px-6 pb-24 pt-32 tablet:px-10">
        <p className="font-body text-xs uppercase tracking-wide text-muted">Project</p>
        <h1 className="mt-2 font-display text-5xl uppercase leading-none text-foreground tablet:text-8xl">
          {project.title}
        </h1>

        <div className="mt-12 grid grid-cols-2 gap-6 tablet:grid-cols-4">
          <div>
            <p className="font-body text-xs uppercase text-muted">Role</p>
            <p className="font-body text-sm text-foreground">{project.role}</p>
          </div>
          <div>
            <p className="font-body text-xs uppercase text-muted">Year</p>
            <p className="font-body text-sm text-foreground">{project.year}</p>
          </div>
          <div>
            <p className="font-body text-xs uppercase text-muted">Category</p>
            <p className="font-body text-sm text-foreground">{project.category}</p>
          </div>
        </div>

        {project.heroImage ? (
          <div className="relative mt-16 aspect-video w-full overflow-hidden">
            <Image src={project.heroImage} alt={project.title} fill className="object-cover grayscale" />
          </div>
        ) : (
          <div className="mt-16 flex aspect-video w-full flex-col justify-between border border-border bg-gradient-to-br from-background to-[#111111] p-8">
            <span className="font-display text-8xl text-foreground/20">{project.number}</span>
            <span className="font-body text-xs uppercase tracking-wide text-muted">{project.category}</span>
          </div>
        )}

        <p className="mt-16 max-w-2xl font-body text-base leading-relaxed text-foreground">
          {project.description}
        </p>

        <div className="mt-24 border-t border-border pt-8">
          <p className="font-body text-xs uppercase tracking-wide text-muted">Next Project</p>
          <Link
            href={`/work/${nextProject.slug}`}
            className="mt-2 block font-display text-4xl uppercase text-foreground tablet:text-6xl"
          >
            {nextProject.title} →
          </Link>
        </div>
      </main>
    </PageTransition>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test -- "app/work/\[slug\]/page.test"`
Expected: PASS (1 test)

- [ ] **Step 6: Verify build**

Run: `npx tsc --noEmit && npm run build`
Expected: build succeeds, static params generate 3 pages under `/work/*`

- [ ] **Step 7: Manually verify in browser**

Visit `/work`, then click into each of the 3 projects, confirm metadata/description/next-project link render, and confirm `/work/does-not-exist` renders the 404 page (built in Task 22).

- [ ] **Step 8: Commit**

```bash
git add app/work/
git commit -m "feat: add work index and project detail pages"
```

---

### Task 19: Process Page

**Files:**
- Create: `app/process/page.tsx`

**Interfaces:**
- Consumes: `ProcessSection` (12), `SectionHeading` (8), `PageTransition` (14), `processSteps` (2)

- [ ] **Step 1: Write `app/process/page.tsx`**

```tsx
import { SectionHeading } from "@/components/typography/SectionHeading";
import { ProcessSection } from "@/components/process/ProcessSection";
import { PageTransition } from "@/components/layout/PageTransition";
import { processSteps } from "@/lib/content/process";
import { siteSettings } from "@/lib/content/site";

export const metadata = {
  title: `Process — ${siteSettings.name}`,
  description: "How I approach a project from discovery to launch.",
};

export default function ProcessPage() {
  return (
    <PageTransition>
      <main className="px-6 pb-24 pt-32 tablet:px-10">
        <SectionHeading eyebrow="Method" title="Inside The Creative Process" className="mb-12" />
        <ProcessSection steps={processSteps} />
      </main>
    </PageTransition>
  );
}
```

- [ ] **Step 2: Verify build and manually check in browser**

Run: `npx tsc --noEmit && npm run build`, then visit `/process` and confirm all 6 steps render.

- [ ] **Step 3: Commit**

```bash
git add app/process/page.tsx
git commit -m "feat: add process page"
```

---

### Task 20: `ContactForm` Component & Contact Page

**Files:**
- Create: `components/contact/ContactForm.tsx`, `app/contact/page.tsx`
- Test: `components/contact/ContactForm.test.tsx`

**Interfaces:**
- Produces: `<ContactForm />` — validates with Zod, shows an inline success state on valid submit (no network call in Phase 1).

- [ ] **Step 1: Write the failing test**

Create `components/contact/ContactForm.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "@/components/contact/ContactForm";

describe("ContactForm", () => {
  it("shows validation errors when required fields are empty", async () => {
    render(<ContactForm />);
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/message is required/i)).toBeInTheDocument();
  });

  it("shows a success state after a valid submit", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/name/i), "Test User");
    await user.type(screen.getByLabelText(/email/i), "test@example.com");
    await user.type(screen.getByLabelText(/message/i), "Hello there");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/thank you/i)).toBeInTheDocument();
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm install -D @testing-library/user-event` then `npm test -- ContactForm.test`
Expected: FAIL — module not found

- [ ] **Step 3: Implement `components/contact/ContactForm.tsx`**

```tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  company: z.string().optional(),
  projectType: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  const onSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div>
        <p className="font-display text-3xl uppercase text-foreground">Thank You.</p>
        <p className="mt-2 font-body text-sm text-muted">Your message has been sent.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 max-w-xl" noValidate>
      <div>
        <label htmlFor="name" className="font-body text-xs uppercase text-muted">
          Name
        </label>
        <input
          id="name"
          {...register("name")}
          className="mt-2 w-full border-b border-border bg-transparent py-2 font-body text-foreground focus:outline-none focus:border-foreground"
        />
        {errors.name && <p className="mt-1 font-body text-xs text-muted">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="font-body text-xs uppercase text-muted">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="mt-2 w-full border-b border-border bg-transparent py-2 font-body text-foreground focus:outline-none focus:border-foreground"
        />
        {errors.email && <p className="mt-1 font-body text-xs text-muted">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="company" className="font-body text-xs uppercase text-muted">
          Company
        </label>
        <input
          id="company"
          {...register("company")}
          className="mt-2 w-full border-b border-border bg-transparent py-2 font-body text-foreground focus:outline-none focus:border-foreground"
        />
      </div>

      <div>
        <label htmlFor="projectType" className="font-body text-xs uppercase text-muted">
          Project Type
        </label>
        <input
          id="projectType"
          {...register("projectType")}
          className="mt-2 w-full border-b border-border bg-transparent py-2 font-body text-foreground focus:outline-none focus:border-foreground"
        />
      </div>

      <div>
        <label htmlFor="budget" className="font-body text-xs uppercase text-muted">
          Budget (optional)
        </label>
        <input
          id="budget"
          {...register("budget")}
          className="mt-2 w-full border-b border-border bg-transparent py-2 font-body text-foreground focus:outline-none focus:border-foreground"
        />
      </div>

      <div>
        <label htmlFor="message" className="font-body text-xs uppercase text-muted">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          {...register("message")}
          className="mt-2 w-full border-b border-border bg-transparent py-2 font-body text-foreground focus:outline-none focus:border-foreground"
        />
        {errors.message && <p className="mt-1 font-body text-xs text-muted">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        className="mt-4 self-start font-body text-xs uppercase tracking-wide text-foreground underline"
      >
        Send Message →
      </button>
    </form>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- ContactForm.test`
Expected: PASS (2 tests)

- [ ] **Step 5: Write `app/contact/page.tsx`**

```tsx
import { SectionHeading } from "@/components/typography/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageTransition } from "@/components/layout/PageTransition";
import { siteSettings } from "@/lib/content/site";

export const metadata = {
  title: `Contact — ${siteSettings.name}`,
  description: "Have a project, idea, or collaboration in mind? Let's talk.",
};

export default function ContactPage() {
  return (
    <PageTransition>
      <main className="px-6 pb-24 pt-32 tablet:px-10">
        <SectionHeading eyebrow="Get In Touch" title="Let's Create Something Meaningful." className="mb-4" />
        <p className="mb-12 max-w-md font-body text-sm text-muted">
          Have a project, idea, or collaboration in mind? Let&rsquo;s talk.
        </p>
        <ContactForm />
      </main>
    </PageTransition>
  );
}
```

- [ ] **Step 6: Verify build and manually check in browser**

Run: `npx tsc --noEmit && npm run build`, then visit `/contact`, submit empty (see validation errors), then fill and submit (see the "Thank You" success state).

- [ ] **Step 7: Commit**

```bash
git add components/contact/ app/contact/
git commit -m "feat: add ContactForm and contact page"
```

---

### Task 21: 404 Page & Final Metadata Pass

**Files:**
- Create: `app/not-found.tsx`
- Modify: `app/about/page.tsx`, `app/work/page.tsx` (verify metadata already present from earlier tasks — add if missing)

**Interfaces:**
- Consumes: `siteSettings` (2)

- [ ] **Step 1: Write `app/not-found.tsx`**

```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-4xl uppercase text-foreground tablet:text-6xl">
        Page Not Found
      </h1>
      <Link
        href="/"
        className="mt-8 font-body text-xs uppercase tracking-wide text-foreground underline"
      >
        Back Home →
      </Link>
    </main>
  );
}
```

- [ ] **Step 2: Verify every page exports `metadata` (or `generateMetadata`)**

Confirm `app/page.tsx` (via root layout's default), `app/about/page.tsx`, `app/work/page.tsx`, `app/work/[slug]/page.tsx`, `app/process/page.tsx`, `app/contact/page.tsx` each have a `title`/`description`. All were included when each page was created in Tasks 16–20 — this step is a verification read-through, not new code.

- [ ] **Step 3: Verify build**

Run: `npx tsc --noEmit && npm run build`
Expected: build succeeds; visiting an unknown route in dev renders the custom 404.

- [ ] **Step 4: Commit**

```bash
git add app/not-found.tsx
git commit -m "feat: add custom 404 page"
```

---

### Task 22: Full Verification Pass

**Files:** none created — verification only.

- [ ] **Step 1: Run the full test suite**

Run: `npm test`
Expected: all tests PASS

- [ ] **Step 2: Run type-check and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors

- [ ] **Step 3: Run production build**

Run: `npm run build`
Expected: build succeeds with no warnings about missing alt text, unoptimized images, or unused exports

- [ ] **Step 4: Manual responsive/accessibility pass in the browser**

Start `npm run dev`, then for each page (`/`, `/about`, `/work`, `/work/marginku`, `/process`, `/contact`, and a 404 route):
- Resize to mobile (375px), tablet (768px), and desktop (1440px) — confirm layout recomposes (mobile menu appears, project grid stacks, no custom cursor rendered)
- Tab through the page with keyboard only — confirm nav links, mobile menu button, project cards, and the contact form are all reachable and show visible focus states
- Toggle OS-level `prefers-reduced-motion` (or emulate via browser devtools) — confirm the hero glitch, parallax, and custom cursor are suppressed
- Check the browser console for errors on every page

- [ ] **Step 5: Commit any final fixes found during verification**

```bash
git add -A
git commit -m "fix: address issues found in final verification pass"
```

(Skip this commit if no fixes were needed.)

---

## Self-Review Notes

- **Spec coverage:** every section of the Phase 1 design spec (§2–§9) maps to a task above; §10 (deferred scope) is intentionally not implemented. The glitch entrance requested after spec approval is covered in Task 7.
- **Type consistency:** `Project`, `SiteSettings`, `NavLink`, `SocialLink`, `ProcessStep`, `Capability` are defined once in Task 2 and referenced by identical names/shapes in every later task — verified no divergent field names (e.g., `coverImage` is `string | null` everywhere it's used).
- **No placeholders:** every step above contains complete, runnable code — no "add validation here" or "similar to Task N" stand-ins.
