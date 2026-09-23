"use client";

import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

interface GlitchTextProps {
  text: string;
  delayMs?: number;
  className?: string;
}

const ghosts = [
  { className: "glitch-ghost-a", color: "#ff2bd6" },
  { className: "glitch-ghost-b", color: "#00e5ff" },
  { className: "glitch-ghost-c", color: "#b026ff" },
];

export function GlitchText({ text, delayMs = 0, className = "" }: GlitchTextProps) {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    return <span className={`block ${className}`}>{text}</span>;
  }

  return (
    <span className={`relative block ${className}`}>
      <span className="glitch-layer relative z-10 block" style={{ animationDelay: `${delayMs}ms` }}>
        {text}
      </span>

      {ghosts.map((ghost) => (
        <span
          key={ghost.className}
          aria-hidden="true"
          className={`${ghost.className} absolute inset-0 z-0 block mix-blend-screen`}
          style={{ animationDelay: `${delayMs}ms`, color: ghost.color }}
        >
          {text}
        </span>
      ))}
    </span>
  );
}
