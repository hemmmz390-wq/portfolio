import type { Metadata } from "next";
import { League_Spartan, Inter } from "next/font/google";
import "./globals.css";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  variable: "--font-league-spartan",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
