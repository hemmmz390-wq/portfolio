"use client";

import { motion } from "framer-motion";
import { ProcessStep } from "@/lib/types";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

interface ProcessSectionProps {
  steps: ProcessStep[];
}

export function ProcessSection({ steps }: ProcessSectionProps) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <ol className="grid grid-cols-1 gap-x-10 gap-y-12 tablet:grid-cols-2 laptop:grid-cols-3">
      {steps.map((step, index) => (
        <motion.li
          key={step.number}
          initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: reducedMotion ? 0.2 : 0.5,
            delay: reducedMotion ? 0 : (index % 3) * 0.08,
          }}
          className="border-t border-border pt-5"
        >
          <span className="font-display text-5xl leading-none text-foreground/25">
            {step.number}
          </span>
          <h3 className="mt-3 font-display text-2xl uppercase tracking-tight text-foreground">
            {step.title}
          </h3>
          <p className="mt-3 font-body text-sm leading-relaxed text-muted">{step.description}</p>
        </motion.li>
      ))}
    </ol>
  );
}
