"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, clipPath: reducedMotion ? undefined : "inset(0 0 8% 0)" }}
      animate={{ opacity: 1, clipPath: reducedMotion ? undefined : "inset(0 0 0% 0)" }}
      transition={{ duration: reducedMotion ? 0.2 : 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
