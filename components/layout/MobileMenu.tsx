"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink, SocialLink } from "@/lib/types";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

interface MobileMenuProps {
  links: NavLink[];
  socials: SocialLink[];
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ links, socials, isOpen, onClose }: MobileMenuProps) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, clipPath: reducedMotion ? undefined : "inset(0 0 100% 0)" }}
          animate={{ opacity: 1, clipPath: reducedMotion ? undefined : "inset(0 0 0% 0)" }}
          exit={{ opacity: 0, clipPath: reducedMotion ? undefined : "inset(0 0 100% 0)" }}
          transition={{ duration: reducedMotion ? 0.15 : 0.45, ease: "easeOut" }}
          className="fixed inset-0 z-[60] flex flex-col justify-between bg-background px-6 py-6"
        >
          <div className="flex justify-end">
            <button
              type="button"
              aria-label="Close menu"
              onClick={onClose}
              className="font-body text-xs uppercase tracking-widest text-foreground"
            >
              Close
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            {links.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reducedMotion ? 0 : 0.1 + index * 0.06, duration: 0.35 }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="flex items-baseline gap-4 font-display text-4xl uppercase leading-tight text-foreground"
                >
                  <span className="font-body text-[10px] text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="flex flex-wrap gap-6">
            {socials.map((social) => (
              <a
                key={social.url}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-[10px] uppercase tracking-widest text-muted"
              >
                {social.label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
