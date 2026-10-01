"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { Photograph } from "@/lib/types";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

interface AwardedPhotosProps {
  photographs: Photograph[];
}

export function AwardedPhotos({ photographs }: AwardedPhotosProps) {
  const reducedMotion = usePrefersReducedMotion();
  const aspects = photographs.map((photo) => photo.width / photo.height);
  const total = aspects.reduce((sum, aspect) => sum + aspect, 0);

  // Each column is as wide as its photo's aspect ratio, so a portrait and a
  // landscape frame sit side by side at exactly the same height.
  const columns = aspects.map((aspect) => `minmax(0, ${aspect.toFixed(3)}fr)`).join(" ");

  return (
    <div
      className="grid grid-cols-1 gap-12 tablet:gap-8 tablet:[grid-template-columns:var(--award-columns)]"
      style={{ ["--award-columns" as string]: columns } as CSSProperties}
    >
      {photographs.map((photo, index) => (
        <motion.figure
          key={photo.src}
          initial={{ opacity: 0, y: reducedMotion ? 0 : 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: reducedMotion ? 0.2 : 0.7,
            delay: reducedMotion ? 0 : index * 0.1,
            ease: "easeOut",
          }}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes={`(max-width: 768px) 100vw, ${Math.round((aspects[index] / total) * 100)}vw`}
            className="h-auto w-full"
          />
          {photo.award && (
            <figcaption className="mt-5 border-t border-border pt-4">
              <span className="block font-serif text-3xl italic leading-none text-foreground tablet:text-4xl">
                {photo.award.result}
              </span>
              <span className="mt-3 block font-body text-[10px] uppercase leading-relaxed tracking-[0.2em] text-muted">
                {photo.award.competition}
              </span>
            </figcaption>
          )}
        </motion.figure>
      ))}
    </div>
  );
}
