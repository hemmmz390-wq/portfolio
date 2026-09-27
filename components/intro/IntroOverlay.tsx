"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import { markIntroDone } from "@/lib/hooks/useIntroDone";

export const INTRO_SESSION_KEY = "intro-played";

const COUNT_DURATION = 1.25;
const WIPE_DELAY_MS = 1650;
const WIPE_DURATION_MS = 700;

interface IntroOverlayProps {
  name: string;
  cjkName: string;
}

export function IntroOverlay({ name, cjkName }: IntroOverlayProps) {
  // The inline script in the document head has already decided whether the
  // intro should run, so trust its attribute rather than re-deriving it.
  const [dismissed, setDismissed] = useState(false);
  const [wiping, setWiping] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Already played this session, or reduced motion: the pre-paint script set
    // the skip attribute and CSS hides the overlay, so nothing needs to run.
    if (document.documentElement.hasAttribute("data-intro-skip")) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    const stopCount = animate(0, 100, {
      duration: COUNT_DURATION,
      ease: "easeInOut",
      onUpdate: (value) => {
        if (counterRef.current) {
          counterRef.current.textContent = String(Math.round(value)).padStart(3, "0");
        }
      },
    });

    const wipeTimer = window.setTimeout(() => setWiping(true), WIPE_DELAY_MS);
    const endTimer = window.setTimeout(() => {
      setDismissed(true);
      body.style.overflow = previousOverflow;
      try {
        sessionStorage.setItem(INTRO_SESSION_KEY, "1");
      } catch {
        // Private mode can reject storage; the intro simply replays next load.
      }
      markIntroDone();
    }, WIPE_DELAY_MS + WIPE_DURATION_MS);

    return () => {
      stopCount.stop();
      window.clearTimeout(wipeTimer);
      window.clearTimeout(endTimer);
      body.style.overflow = previousOverflow;
    };
  }, []);

  if (dismissed) return null;

  return (
    <div
      aria-hidden="true"
      className={`intro-overlay fixed inset-0 z-[10001] flex flex-col justify-between bg-background px-6 py-8 tablet:px-10 tablet:py-10 ${
        wiping ? "intro-overlay-out" : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <span className="font-body text-[10px] uppercase tracking-[0.3em] text-muted">
          {name}
        </span>
        <span className="font-body text-[10px] uppercase tracking-[0.3em] text-muted">
          Portfolio — 2026
        </span>
      </div>

      <div className="relative">
        <span className="intro-name relative block font-cjk text-[22vw] leading-none tracking-[0.05em] text-foreground tablet:text-[15vw]">
          {cjkName}
          <span
            aria-hidden="true"
            className="intro-ghost-a absolute inset-0 block text-[#ff2bd6] mix-blend-screen"
          >
            {cjkName}
          </span>
          <span
            aria-hidden="true"
            className="intro-ghost-b absolute inset-0 block text-[#00e5ff] mix-blend-screen"
          >
            {cjkName}
          </span>
        </span>
      </div>

      <div className="flex items-end justify-between gap-6">
        <div className="intro-rule h-px flex-1 bg-border" />
        <span
          ref={counterRef}
          className="font-display text-4xl leading-none tabular-nums text-foreground tablet:text-6xl"
        >
          000
        </span>
      </div>
    </div>
  );
}
