"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NavLink, SocialLink } from "@/lib/types";
import { MobileMenu } from "@/components/layout/MobileMenu";

interface NavbarProps {
  name: string;
  links: NavLink[];
  socials?: SocialLink[];
}

export function Navbar({ name, links, socials = [] }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 transition-all duration-300 tablet:px-10 ${
        scrolled ? "bg-background/60 py-3 backdrop-blur-md" : "bg-transparent py-6"
      }`}
    >
      <Link
        href="/"
        className="font-display text-sm uppercase tracking-[0.2em] text-foreground"
        data-cursor-label="HOME"
      >
        {name}
      </Link>

      <nav aria-label="Main" className="hidden items-center gap-8 tablet:flex">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={`font-body text-[11px] uppercase tracking-[0.2em] transition-opacity hover:opacity-100 ${
                isActive ? "text-foreground opacity-100" : "text-foreground opacity-50"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen(true)}
        className="font-body text-[11px] uppercase tracking-[0.2em] text-foreground tablet:hidden"
      >
        Menu
      </button>

      <MobileMenu
        links={links}
        socials={socials}
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </header>
  );
}
