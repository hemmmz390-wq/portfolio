"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Photograph } from "@/lib/types";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

interface PhotoCarouselProps {
  label: string;
  photographs: Photograph[];
  /**
   * Gray until hovered, like the project cards. Only applied where the device
   * can hover; on a touch screen there is nothing to hover, so frames stay in
   * colour rather than gray for good.
   */
  revealColourOnHover?: boolean;
}

export const AUTOPLAY_MS = 4500;

const pad = (value: number) => String(value).padStart(2, "0");

// Native scroll-snap does the swiping, trackpad and keyboard work; the buttons,
// counter and autoplay only read and nudge the track's scroll position.
export function PhotoCarousel({ label, photographs, revealColourOnHover = false }: PhotoCarouselProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingId = useId();
  const reducedMotion = usePrefersReducedMotion();
  const [current, setCurrent] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // Autoplay holds while the viewer is pointing at or focused inside the
  // carousel, when it is off screen, or when they have paused it.
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);
  // Bumped on any manual move so the next automatic one waits a full interval.
  const [lastInteraction, setLastInteraction] = useState(0);

  const canAutoplay = !reducedMotion && photographs.length > 1;
  const autoplaying = canAutoplay && !paused && !hovered && !focused && inView;

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

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.35,
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const scrollBy = useCallback(
    (direction: 1 | -1) => {
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
    },
    [reducedMotion]
  );

  const advance = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const reachedEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
    // Loop back to the first frame once the last one is in view.
    if (reachedEnd) track.scrollTo({ left: 0, behavior: "smooth" });
    else scrollBy(1);
  }, [scrollBy]);

  useEffect(() => {
    if (!autoplaying) return;
    const timer = window.setInterval(advance, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [autoplaying, advance, lastInteraction]);

  const interact = () => setLastInteraction(Date.now());

  const step = (direction: 1 | -1) => {
    interact();
    scrollBy(direction);
  };

  const button =
    "flex h-10 w-10 items-center justify-center rounded-full border border-border font-body text-sm text-foreground transition-colors hover:border-foreground disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-border";

  return (
    <section
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-labelledby={headingId}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      <div className="mb-6 flex items-end justify-between gap-6">
        <h3 id={headingId} className="font-body text-[10px] uppercase tracking-[0.3em] text-muted">
          {label}
        </h3>
        <div className="flex items-center gap-4">
          {/* Announcing every automatic move would be noise, so the counter only
              speaks up while the viewer is driving. */}
          <span
            aria-live={autoplaying ? "off" : "polite"}
            className="font-body text-[10px] tabular-nums tracking-[0.25em] text-muted"
          >
            {pad(current + 1)} / {pad(photographs.length)}
          </span>
          {canAutoplay && (
            <button
              type="button"
              aria-label={paused ? "Play slideshow" : "Pause slideshow"}
              onClick={() => setPaused((value) => !value)}
              className={button}
            >
              <span aria-hidden="true" className="text-[11px]">
                {paused ? "▶" : "❚❚"}
              </span>
            </button>
          )}
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
        onPointerDown={interact}
        onWheel={interact}
        onKeyDown={interact}
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
            className="group relative shrink-0 snap-start overflow-hidden"
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
              className={
                revealColourOnHover
                  ? "object-cover transition-[filter] duration-700 ease-out [@media(hover:hover)]:grayscale group-hover:grayscale-0"
                  : "object-cover"
              }
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
