import type { Metadata } from "next";
import { League_Spartan, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { IntroOverlay } from "@/components/intro/IntroOverlay";
import { AnimatedBackground } from "@/components/motion/AnimatedBackground";
import { NoiseOverlay } from "@/components/motion/NoiseOverlay";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { siteSettings, navLinks } from "@/lib/content/site";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  variable: "--font-league-spartan",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Subset of Noto Sans TC containing only 莊秉洋 (1.3 KB) — a full CJK face
// would be megabytes for three glyphs.
const notoSansTC = localFont({
  src: "./fonts/noto-sans-tc-name.woff2",
  weight: "700",
  variable: "--font-noto-tc",
  display: "swap",
});

// Runs before first paint: reduced-motion visitors skip the overlay without a
// flash, and the hero entrance is released instead of being left paused.
const introGateScript = `(function(){var d=document.documentElement;try{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){d.setAttribute('data-intro-skip','');d.setAttribute('data-intro-done','');}}catch(e){d.setAttribute('data-intro-skip','');d.setAttribute('data-intro-done','');}})();`;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteSettings.name} — ${siteSettings.role}`,
    template: `%s — ${siteSettings.name}`,
  },
  description: siteSettings.introParagraph,
  openGraph: {
    type: "website",
    siteName: siteSettings.name,
    title: `${siteSettings.name} — ${siteSettings.role}`,
    description: siteSettings.introParagraph,
    images: ["/images/hero.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteSettings.name} — ${siteSettings.role}`,
    description: siteSettings.introParagraph,
    images: ["/images/hero.webp"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${leagueSpartan.variable} ${inter.variable} ${notoSansTC.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introGateScript }} />
      </head>
      <body className="min-h-screen antialiased">
        <IntroOverlay name={siteSettings.name} cjkName="莊秉洋" />
        <LenisProvider>
          <AnimatedBackground />
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
