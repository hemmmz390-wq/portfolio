import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { AUTOPLAY_MS, PhotoCarousel } from "@/components/photography/PhotoCarousel";

const photographs = [
  { src: "/a.webp", alt: "First frame", width: 2000, height: 1125 },
  { src: "/b.webp", alt: "Second frame", width: 2000, height: 1125 },
];

// jsdom has no layout or scrolling, so the observer reports the carousel as
// on screen straight away and scrollTo is recorded rather than performed.
class VisibleObserver {
  constructor(private readonly callback: IntersectionObserverCallback) {}
  observe() {
    this.callback([{ isIntersecting: true } as IntersectionObserverEntry], this as never);
  }
  unobserve() {}
  disconnect() {}
}

let scrollTo: ReturnType<typeof vi.fn>;

beforeEach(() => {
  vi.useFakeTimers();
  vi.stubGlobal("IntersectionObserver", VisibleObserver);
  scrollTo = vi.fn();
  Element.prototype.scrollTo = scrollTo as unknown as typeof Element.prototype.scrollTo;
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

const tick = () => act(() => void vi.advanceTimersByTime(AUTOPLAY_MS));

describe("PhotoCarousel autoplay", () => {
  it("moves on by itself while it is on screen", () => {
    render(<PhotoCarousel label="Personal Work" photographs={photographs} />);
    tick();
    expect(scrollTo).toHaveBeenCalled();
  });

  it("holds while the viewer is pointing at it", () => {
    render(<PhotoCarousel label="Personal Work" photographs={photographs} />);
    fireEvent.pointerEnter(screen.getByRole("region", { name: "Personal Work" }));
    tick();
    expect(scrollTo).not.toHaveBeenCalled();
  });

  it("stops when paused and says so on the button", () => {
    render(<PhotoCarousel label="Personal Work" photographs={photographs} />);
    fireEvent.click(screen.getByRole("button", { name: "Pause slideshow" }));
    tick();
    expect(scrollTo).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Play slideshow" })).toBeInTheDocument();
  });

  it("never runs for visitors who prefer reduced motion", () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes("reduce"),
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })) as unknown as typeof window.matchMedia;

    render(<PhotoCarousel label="Personal Work" photographs={photographs} />);
    tick();
    expect(scrollTo).not.toHaveBeenCalled();
    expect(screen.queryByRole("button", { name: /slideshow/i })).not.toBeInTheDocument();
  });

  it("does not announce automatic moves to screen readers", () => {
    render(<PhotoCarousel label="Personal Work" photographs={photographs} />);
    expect(screen.getByText("01 / 02")).toHaveAttribute("aria-live", "off");
  });
});

describe("PhotoCarousel colour reveal", () => {
  it("grays frames only when asked, and only on devices that can hover", () => {
    const { rerender } = render(<PhotoCarousel label="Awarded" photographs={photographs} />);
    expect(screen.getByAltText("First frame").className).not.toContain("grayscale");

    rerender(<PhotoCarousel label="Awarded" photographs={photographs} revealColourOnHover />);
    const image = screen.getByAltText("First frame");
    expect(image.className).toContain("[@media(hover:hover)]:grayscale");
    expect(image.className).toContain("group-hover:grayscale-0");
  });
});
