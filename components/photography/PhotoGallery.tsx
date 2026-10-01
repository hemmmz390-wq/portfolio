"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Photograph } from "@/lib/types";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

interface PhotoGalleryProps {
  photographs: Photograph[];
}

// Every third frame runs full width; the two between it pair up, with the
// second dropped lower so the grid reads as a spread rather than a table.
function layoutFor(index: number) {
  const position = index % 3;
  if (position === 0) return { span: "tablet:col-span-2", offset: "", full: true };
  return { span: "", offset: position === 2 ? "tablet:mt-24" : "", full: false };
}

export function PhotoGallery({ photographs }: PhotoGalleryProps) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="grid grid-cols-1 gap-8 tablet:grid-cols-2 tablet:gap-x-8 tablet:gap-y-16">
      {photographs.map((photo, index) => {
        const { span, offset, full } = layoutFor(index);
        return (
          <motion.figure
            key={photo.src}
            initial={{ opacity: 0, y: reducedMotion ? 0 : 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: reducedMotion ? 0.2 : 0.7, ease: "easeOut" }}
            className={`${span} ${offset}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes={full ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
              className="h-auto w-full"
            />
            {photo.caption && (
              <figcaption className="mt-3 font-body text-[10px] uppercase tracking-[0.2em] text-muted">
                {photo.caption}
              </figcaption>
            )}
          </motion.figure>
        );
      })}
    </div>
  );
}
