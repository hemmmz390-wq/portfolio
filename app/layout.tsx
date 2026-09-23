import type { Metadata } from "next";
import { League_Spartan, Inter } from "next/font/google";
import "./globals.css";
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
    <html lang="en" className={`${leagueSpartan.variable} ${inter.variable}`}>
      <body className="min-h-screen antialiased">
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
