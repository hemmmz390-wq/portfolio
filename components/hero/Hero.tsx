"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { useIsTouchDevice } from "@/lib/hooks/useIsTouchDevice";
import { useIntroDone } from "@/lib/hooks/useIntroDone";

interface HeroProps {
  displayName: string;
  signature: string;
  cjkName: string;
  role: string;
  subheadline: string[];
  intro: string;
  imageSrc: string;
  imageAlt: string;
}

/**
 * Letters are distributed edge to edge rather than set at a fixed size, so the
 * masthead always spans the full measure at any viewport.
 */
function MastheadRow({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`flex w-full justify-between ${className}`}>
      {[...text].map((character, index) => (
        <span key={`${character}-${index}`}>{character}</span>
      ))}
    </span>
  );
}

export function Hero({
  displayName,
  signature,
  cjkName,
  role,
  subheadline,
  intro,
  imageSrc,
  imageAlt,
}: HeroProps) {
  const reducedMotion = usePrefersReducedMotion();
  const isTouch = useIsTouchDevice();
  const introDone = useIntroDone();
  const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reducedMotion || isTouch) return;

    const handleMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setPointerOffset({
        x: (event.clientX / innerWidth - 0.5) * 16,
        y: (event.clientY / innerHeight - 0.5) * 16,
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [reducedMotion, isTouch]);

  const corner = "font-body text-[9px] uppercase leading-relaxed tracking-[0.25em] text-muted";

  return (
    <section className="relative flex min-h-screen flex-col justify-between overflow-hidden px-5 pb-6 pt-24 tablet:px-8 tablet:pb-8 tablet:pt-28">
      {/* Magazine trim line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 border border-border tablet:inset-5"
      />

      <div className="relative z-20 flex items-start justify-between gap-6 px-2 tablet:px-4">
        <div className="max-w-[15rem]">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-foreground">
            Jikosoukai
          </p>
          <p className={`mt-2 ${corner}`}>{intro}</p>
        </div>

        <div className="text-right">
          <p className="font-serif text-sm italic text-foreground/80">Portfolio — 2026</p>
          {/* The left block already carries the description at phone width. */}
          <p className={`mt-1 hidden tablet:block ${corner}`}>{role}</p>
        </div>
      </div>

      {/* Masthead + portrait */}
      <div className="relative z-10 -mt-4 flex flex-1 items-center">
        <div className="relative w-full px-2 tablet:px-4">
          <p className="mb-2 font-cjk text-sm tracking-[0.55em] text-foreground/70 tablet:text-xl">
            {cjkName}
          </p>

          <div className="relative">
            <MastheadRow
              text={displayName}
              className="glitch-layer relative z-10 font-serif text-[17vw] leading-[0.82] text-foreground"
            />
            <MastheadRow
              text={displayName}
              className="glitch-ghost-a absolute inset-0 z-0 font-serif text-[17vw] leading-[0.82] text-[#ff2bd6] mix-blend-screen"
            />
            <MastheadRow
              text={displayName}
              className="glitch-ghost-b absolute inset-0 z-0 font-serif text-[17vw] leading-[0.82] text-[#00e5ff] mix-blend-screen"
            />
          </div>

          <p className="mt-1 text-right font-serif text-[7vw] italic leading-none text-foreground tablet:text-[4vw]">
            {signature}
          </p>

          {/* Feathered so the portrait's near-black studio backdrop melts into
              the page and the masthead appears to run behind the subject. */}
          <motion.div
            animate={{ x: pointerOffset.x, y: pointerOffset.y }}
            transition={{ type: "spring", damping: 40, stiffness: 90, mass: 1.2 }}
            className="hero-reveal pointer-events-none absolute inset-x-0 bottom-[-42%] top-[-118%] z-[5] mx-auto w-[74vw] tablet:w-[30vw]"
          >
            <div className="hero-portrait-mask relative h-full w-full">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                sizes="(max-width: 768px) 74vw, 30vw"
                className="object-cover object-[center_18%] grayscale contrast-[1.3] brightness-[0.62]"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative z-20 flex items-end justify-between gap-6 px-2 tablet:px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: reducedMotion ? 0.1 : 1.6 }}
          className="max-w-[14rem]"
        >
          <p className="font-serif text-base italic text-foreground">Currently</p>
          <p className={`mt-1 ${corner}`}>Available for selected projects</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: reducedMotion ? 0.1 : 1.75 }}
          className="max-w-[16rem] text-right"
        >
          <p className="font-serif text-base italic text-foreground">The idea is:</p>
          {subheadline.map((line) => (
            <span key={line} className={`block ${corner}`}>
              {line}
            </span>
          ))}
        </motion.div>
      </div>

      <span
        aria-hidden="true"
        className="absolute right-5 top-1/2 z-20 hidden -translate-y-1/2 rotate-90 font-body text-[9px] uppercase tracking-[0.4em] text-muted tablet:block"
      >
        Scroll
      </span>
    </section>
  );
}
