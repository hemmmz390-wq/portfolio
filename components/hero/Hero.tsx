"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { useIsTouchDevice } from "@/lib/hooks/useIsTouchDevice";
import { GlitchText } from "@/components/hero/GlitchText";

interface HeroProps {
  headline: string[];
  subheadline: string[];
  imageSrc: string;
  imageAlt: string;
  role: string;
}

export function Hero({ headline, subheadline, imageSrc, imageAlt, role }: HeroProps) {
  const reducedMotion = usePrefersReducedMotion();
  const isTouch = useIsTouchDevice();
  const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reducedMotion || isTouch) return;

    const handleMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setPointerOffset({
        x: (event.clientX / innerWidth - 0.5) * 20,
        y: (event.clientY / innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [reducedMotion, isTouch]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-end overflow-hidden px-6 pb-12 pt-28 tablet:px-10 tablet:pb-16"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reducedMotion ? 0.3 : 0.8, delay: reducedMotion ? 0 : 0.5 }}
        className="absolute inset-0"
      >
        <motion.div
          animate={{ x: pointerOffset.x, y: pointerOffset.y }}
          transition={{ type: "spring", damping: 40, stiffness: 90, mass: 1.2 }}
          className="glitch-layer absolute -inset-[3%]"
          style={{ animationDelay: "500ms" }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_20%] grayscale contrast-[1.15] brightness-[0.75]"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/70" />
        {!reducedMotion && (
          <div
            aria-hidden="true"
            className="glitch-scanline pointer-events-none absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-foreground/15 to-transparent"
            style={{ animationDelay: "500ms" }}
          />
        )}
      </motion.div>

      <div className="relative z-10 flex w-full flex-col gap-8 tablet:flex-row tablet:items-end tablet:justify-between">
        <h1 className="font-display text-[16vw] font-semibold uppercase leading-[0.85] tracking-tight text-foreground tablet:text-[11vw] desktop:text-[9vw]">
          {headline.map((line, index) => (
            <GlitchText key={line} text={line} delayMs={900 + index * 140} />
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: reducedMotion ? 0.2 : 1.5 }}
          className="max-w-[16rem] tablet:pb-4"
        >
          <p className="font-body text-[10px] uppercase tracking-[0.25em] text-muted">{role}</p>
          <div className="mt-4 border-t border-border pt-4">
            {subheadline.map((line) => (
              <span
                key={line}
                className="block font-body text-xs uppercase tracking-[0.15em] text-foreground/80"
              >
                {line}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
