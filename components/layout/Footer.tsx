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
    <footer className="border-t border-border px-6 pb-10 pt-20 tablet:px-10">
      <div className="flex flex-col gap-12 tablet:flex-row tablet:justify-between">
        <div>
          <p className="font-display text-2xl uppercase tracking-tight text-foreground">{name}</p>
          <p className="mt-2 font-body text-sm text-muted">Available for selected projects.</p>
          <a
            href={`mailto:${email}`}
            className="mt-5 inline-block border-b border-border pb-1 font-body text-sm text-foreground transition-colors hover:border-foreground"
          >
            {email}
          </a>
        </div>

        <div className="flex gap-16">
          <nav aria-label="Footer">
            <p className="mb-4 font-body text-[10px] uppercase tracking-[0.3em] text-muted">
              Menu
            </p>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/"
                  className="font-body text-xs uppercase tracking-[0.15em] text-foreground/70 transition-opacity hover:opacity-100"
                >
                  Home
                </Link>
              </li>
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-xs uppercase tracking-[0.15em] text-foreground/70 transition-opacity hover:opacity-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mb-4 font-body text-[10px] uppercase tracking-[0.3em] text-muted">
              Elsewhere
            </p>
            <ul className="flex flex-col gap-2">
              {socials.map((social) => (
                <li key={social.url}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-xs uppercase tracking-[0.15em] text-foreground/70 transition-opacity hover:opacity-100"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="mt-20 select-none font-display text-[18vw] uppercase leading-[0.8] tracking-tighter text-foreground/[0.07]"
      >
        {name}
      </p>

      <p className="mt-8 font-body text-[10px] uppercase tracking-[0.2em] text-muted">
        © {new Date().getFullYear()} {name} — All rights reserved
      </p>
    </footer>
  );
}
