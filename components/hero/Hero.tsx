import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

interface HeroProps {
  displayName: string;
  signature: string;
  cjkName: string;
  role: string;
  subheadline: string[];
  intro: string;
  imageSrc: string;
  imageAlt: string;
}

// The whole entrance is CSS and starts only once the opening overlay sets
// data-intro-done (see globals.css), so these delays count from that moment.
function delay(ms: number): CSSProperties {
  return { animationDelay: `${ms}ms` };
}

/** Clips its child so it slides up into view from below its own baseline. */
function SlideUp({
  children,
  delayMs,
  className = "",
}: {
  children: ReactNode;
  delayMs: number;
  className?: string;
}) {
  return (
    <span className={`block overflow-hidden ${className}`}>
      <span className="hero-slide-up block" style={delay(delayMs)}>
        {children}
      </span>
    </span>
  );
}

const corner = "font-body text-[9px] uppercase leading-relaxed tracking-[0.25em] text-muted";

export function Hero({
  displayName,
  signature,
  cjkName,
  role,
  subheadline,
  intro,
  imageSrc,
  imageAlt,
}: HeroProps) {
  return (
    <section className="relative flex min-h-screen flex-col justify-between overflow-hidden px-5 pb-6 pt-24 tablet:px-8 tablet:pb-8 tablet:pt-28">
      {/* Magazine trim line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 border border-border tablet:inset-5"
      />

      {/* A true cut-out, so the masthead can run behind the figure. Kept in
          full colour — the only colour on an otherwise monochrome page, which
          makes it the focal point. Anchored to the section so the flat bottom
          crop sits below the fold. */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 z-[15] h-[52vh] -translate-x-1/2 tablet:h-[78vh]">
        {/* The rise lives on this inner box: the outer one's transform does
            the centring, and an animated transform would overwrite it. */}
        <div className="hero-portrait-rise relative aspect-[652/1216] h-full" style={delay(150)}>
          <div
            aria-hidden="true"
            className="absolute inset-[-25%] bg-[radial-gradient(ellipse_at_50%_45%,rgba(255,255,255,0.10),transparent_62%)]"
          />
          {/* The outfit is near-black (#22), so brightness is lifted to keep the
              silhouette off the #050505 page without washing out skin tone. */}
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            sizes="(max-width: 768px) 40vh, 42vh"
            className="relative object-contain object-bottom brightness-[1.16] contrast-[1.04]"
          />
        </div>
      </div>

      <div className="relative z-20 flex items-start justify-between gap-6 px-2 tablet:px-4">
        <div className="hero-rise max-w-[15rem]" style={delay(650)}>
          <p className="font-display text-xs uppercase tracking-[0.3em] text-foreground">
            Jikosoukai
          </p>
          <p className={`mt-2 ${corner}`}>{intro}</p>
        </div>

        <div className="hero-rise text-right" style={delay(720)}>
          <p className="font-serif text-sm italic text-foreground/80">Portfolio — 2026</p>
          {/* The left block already carries the description at phone width. */}
          <p className={`mt-1 hidden tablet:block ${corner}`}>{role}</p>
        </div>
      </div>

      {/* Masthead */}
      <div className="relative z-10 -mt-4 flex flex-1 items-center">
        {/* Extra right padding keeps the last letter clear of the scroll rail. */}
        <div className="relative w-full px-2 tablet:pl-4 tablet:pr-12">
          <SlideUp delayMs={250} className="mb-2">
            <span className="font-cjk text-sm tracking-[0.55em] text-foreground/70 tablet:text-xl">
              {cjkName}
            </span>
          </SlideUp>

          {/* Letters are distributed edge to edge rather than set at a fixed
              size, so the masthead spans the full measure at any viewport. The
              padded clip box keeps serif tops and feet from being shaved off. */}
          <h1
            aria-label={`${displayName} ${signature}`}
            className="flex w-full justify-between font-serif text-[17vw] font-normal leading-[0.82] text-foreground"
          >
            {[...displayName].map((character, index) => (
              <SlideUp
                key={`${character}-${index}`}
                delayMs={300 + index * 70}
                className="-my-[0.12em] py-[0.12em]"
              >
                <span aria-hidden="true">{character}</span>
              </SlideUp>
            ))}
          </h1>

          {/* Horizontal padding stops the italic overhang being clipped. Hidden
              from assistive tech because the h1's label already includes it. */}
          <SlideUp delayMs={780} className="-mx-[0.15em] mt-1 px-[0.15em] text-right">
            <span
              aria-hidden="true"
              className="font-serif text-[7vw] italic leading-none text-foreground tablet:text-[4vw]"
            >
              {signature}
            </span>
          </SlideUp>
        </div>
      </div>

      <div className="relative z-20 flex items-end justify-between gap-6 px-2 tablet:px-4">
        <div className="hero-rise max-w-[14rem]" style={delay(880)}>
          <p className="font-serif text-base italic text-foreground">Currently</p>
          <p className={`mt-1 ${corner}`}>Available for selected projects</p>
        </div>

        <div className="hero-rise max-w-[16rem] text-right" style={delay(960)}>
          <p className="font-serif text-base italic text-foreground">The idea is:</p>
          {subheadline.map((line) => (
            <span key={line} className={`block ${corner}`}>
              {line}
            </span>
          ))}
        </div>
      </div>

      <span
        aria-hidden="true"
        className="absolute right-5 top-1/2 z-20 hidden -translate-y-1/2 rotate-90 font-body text-[9px] uppercase tracking-[0.4em] text-muted tablet:block"
      >
        Scroll
      </span>
    </section>
  );
}
