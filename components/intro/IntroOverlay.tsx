"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import { markIntroDone } from "@/lib/intro";

const COUNT_DURATION = 1.5;
const FADE_DELAY_MS = 1750;
const FADE_DURATION_MS = 650;

interface IntroOverlayProps {
  name: string;
  cjkName: string;
}

export function IntroOverlay({ name, cjkName }: IntroOverlayProps) {
  const [dismissed, setDismissed] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Reduced motion: the pre-paint script set the skip attribute and CSS
    // hides the overlay, so nothing needs to run.
    if (document.documentElement.hasAttribute("data-intro-skip")) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    const stopCount = animate(0, 100, {
      duration: COUNT_DURATION,
      ease: [0.4, 0, 0.2, 1],
      onUpdate: (value) => {
        if (counterRef.current) {
          counterRef.current.textContent = String(Math.round(value));
        }
      },
    });

    const fadeTimer = window.setTimeout(() => setLeaving(true), FADE_DELAY_MS);
    const endTimer = window.setTimeout(() => {
      setDismissed(true);
      body.style.overflow = previousOverflow;
      markIntroDone();
    }, FADE_DELAY_MS + FADE_DURATION_MS);

    return () => {
      stopCount.stop();
      window.clearTimeout(fadeTimer);
      window.clearTimeout(endTimer);
      body.style.overflow = previousOverflow;
    };
  }, []);

  if (dismissed) return null;

  return (
    <div
      aria-hidden="true"
      className={`intro-overlay fixed inset-0 z-[10001] flex items-center justify-center bg-background px-6 ${
        leaving ? "intro-overlay-out" : ""
      }`}
    >
      <div className="intro-block inline-flex flex-col">
        {/* Letter-spacing adds a trailing gap after the last glyph; the negative
            margin pulls it back so the block still optically centres. */}
        <span className="-me-[0.3em] whitespace-nowrap text-center font-cjk text-[15vw] leading-none tracking-[0.3em] text-foreground/90 tablet:text-[7vw]">
          {cjkName}
        </span>

        <span className="intro-rule mt-5 h-px w-full bg-foreground/25" />

        <span className="mt-3 flex items-baseline justify-between gap-8 font-body text-[9px] uppercase tracking-[0.3em] text-muted">
          {name}
          <span ref={counterRef} className="tabular-nums">
            0
          </span>
        </span>
      </div>
    </div>
  );
}
