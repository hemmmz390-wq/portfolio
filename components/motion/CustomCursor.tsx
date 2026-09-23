"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useIsTouchDevice } from "@/lib/hooks/useIsTouchDevice";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

export function CustomCursor() {
  const isTouch = useIsTouchDevice();
  const reducedMotion = usePrefersReducedMotion();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (isTouch || reducedMotion) return;

    const handleMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      const target = (event.target as HTMLElement | null)?.closest("[data-cursor-label]");
      setLabel(target ? target.getAttribute("data-cursor-label") : null);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [isTouch, reducedMotion]);

  if (isTouch || reducedMotion) return null;

  const size = label ? 96 : 8;

  return (
    <motion.div
      data-testid="custom-cursor"
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[10000] flex items-center justify-center rounded-full bg-foreground text-background"
      animate={{
        x: position.x - size / 2,
        y: position.y - size / 2,
        width: size,
        height: size,
      }}
      transition={{ type: "spring", damping: 30, stiffness: 400, mass: 0.4 }}
    >
      {label && (
        <span className="text-center font-body text-[9px] uppercase leading-tight tracking-wide">
          {label}
        </span>
      )}
    </motion.div>
  );
}
