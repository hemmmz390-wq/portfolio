"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Photograph } from "@/lib/types";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

interface PhotoCarouselProps {
  label: string;
  photographs: Photograph[];
}

const pad = (value: number) => String(value).padStart(2, "0");

// Native scroll-snap does the swiping, trackpad and keyboard work; the buttons
// and counter only read and nudge the track's scroll position.
export function PhotoCarousel({ label, photographs }: PhotoCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const headingId = useId();
  const reducedMotion = usePrefersReducedMotion();
  const [current, setCurrent] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const { scrollLeft, scrollWidth, clientWidth } = track;
    const slides = Array.from(track.children) as HTMLElement[];
    const reachedEnd = scrollLeft + clientWidth >= scrollWidth - 2;

    let nearest = 0;
    let closest = Infinity;
    slides.forEach((slide, index) => {
      const distance = Math.abs(slide.offsetLeft - scrollLeft);
      if (distance < closest) {
        closest = distance;
        nearest = index;
      }
    });

    setAtStart(scrollLeft <= 2);
    setAtEnd(reachedEnd);
    // The last slides can't reach the left edge, so the end counts as the last.
    setCurrent(reachedEnd ? slides.length - 1 : nearest);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // Measured after layout, once slide widths are known.
    const frame = requestAnimationFrame(sync);
    track.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const step = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const slides = Array.from(track.children) as HTMLElement[];
    const { scrollLeft } = track;
    const target =
      direction === 1
        ? slides.find((slide) => slide.offsetLeft > scrollLeft + 2)
        : [...slides].reverse().find((slide) => slide.offsetLeft < scrollLeft - 2);
    track.scrollTo({
      left: target ? target.offsetLeft : direction === 1 ? track.scrollWidth : 0,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  const button =
    "flex h-10 w-10 items-center justify-center rounded-full border border-border font-body text-sm text-foreground transition-colors hover:border-foreground disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-border";

  return (
    <section aria-roledescription="carousel" aria-labelledby={headingId}>
      <div className="mb-6 flex items-end justify-between gap-6">
        <h3 id={headingId} className="font-body text-[10px] uppercase tracking-[0.3em] text-muted">
          {label}
        </h3>
        <div className="flex items-center gap-4">
          <span
            aria-live="polite"
            className="font-body text-[10px] tabular-nums tracking-[0.25em] text-muted"
          >
            {pad(current + 1)} / {pad(photographs.length)}
          </span>
          <button
            type="button"
            aria-label="Previous photo"
            disabled={atStart}
            onClick={() => step(-1)}
            className={button}
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next photo"
            disabled={atEnd}
            onClick={() => step(1)}
            className={button}
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        tabIndex={0}
        aria-label={`${label} photographs`}
        // Bottom-aligned so award captions share a baseline when a narrow screen
        // shortens the wide frames.
        className="relative flex snap-x snap-mandatory items-end gap-5 overflow-x-auto pb-1 [scrollbar-width:none] focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground [&::-webkit-scrollbar]:hidden"
      >
        {photographs.map((photo, index) => (
          <figure
            key={photo.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${photographs.length}`}
            className="relative shrink-0 snap-start overflow-hidden"
            // Fixed height with the photo's own aspect ratio, capped so a wide
            // frame never runs past the screen on a phone.
            style={{
              aspectRatio: `${photo.width} / ${photo.height}`,
              height: `min(62vh, calc(86vw / ${(photo.width / photo.height).toFixed(3)}))`,
            }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 768px) 86vw, 60vw"
              className="object-cover"
            />
            {photo.award && (
              <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-background/90 via-background/45 to-transparent px-5 pb-5 pt-28 tablet:px-7 tablet:pb-7">
                <span className="block font-serif text-3xl italic leading-none text-foreground tablet:text-5xl">
                  {photo.award.result}
                </span>
                <span className="mt-3 block max-w-md font-body text-[10px] uppercase leading-relaxed tracking-[0.2em] text-foreground/80">
                  {photo.award.competition}
                </span>
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}
