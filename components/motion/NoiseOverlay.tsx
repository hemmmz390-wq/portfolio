export function NoiseOverlay() {
  return (
    <div
      data-testid="noise-overlay"
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.04] mix-blend-overlay"
    >
      <svg width="100%" height="100%">
        <filter id="noise-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="2"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-filter)" />
      </svg>
    </div>
  );
}
