"use client";

import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

interface GlitchTextProps {
  text: string;
  delayMs?: number;
  className?: string;
}

export function GlitchText({ text, delayMs = 0, className = "" }: GlitchTextProps) {
  const reducedMotion = usePrefersReducedMotion();
  const delay = `${delayMs}ms`;

  if (reducedMotion) {
    return <span className={`block ${className}`}>{text}</span>;
  }

  return (
    <span className={`relative block ${className}`}>
      <span className="glitch-layer relative z-10 block" style={{ animationDelay: delay }}>
        {text}
      </span>
      <span
        aria-hidden="true"
        className="glitch-channel absolute inset-0 z-0 block text-[#ff0040] mix-blend-screen"
        style={{ animationDelay: delay, transform: "translateX(-3px)" }}
      >
        {text}
      </span>
      <span
        aria-hidden="true"
        className="glitch-channel absolute inset-0 z-0 block text-[#00e5ff] mix-blend-screen"
        style={{ animationDelay: delay, transform: "translateX(3px)" }}
      >
        {text}
      </span>
    </span>
  );
}
