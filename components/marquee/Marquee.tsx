"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

interface MarqueeProps {
  items: string[];
  direction?: "left" | "right";
  speed?: number;
}

export function Marquee({ items, direction = "left", speed = 30 }: MarqueeProps) {
  const reducedMotion = usePrefersReducedMotion();
  const loopedItems = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-border py-5" aria-hidden="true">
      <motion.div
        className="flex w-max gap-10 whitespace-nowrap"
        animate={
          reducedMotion ? undefined : { x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }
        }
        transition={
          reducedMotion ? undefined : { duration: speed, ease: "linear", repeat: Infinity }
        }
      >
        {loopedItems.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center gap-10 font-display text-2xl uppercase tracking-tight text-foreground/70 tablet:text-4xl"
          >
            {item}
            <span className="inline-block h-1.5 w-1.5 bg-foreground/40" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
