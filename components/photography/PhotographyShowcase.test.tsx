import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { PhotographyShowcase } from "@/components/photography/PhotographyShowcase";

const photographs = [
  { src: "/a.webp", alt: "Portrait frame", width: 1401, height: 1600 },
  {
    src: "/b.webp",
    alt: "Winning frame",
    width: 1401,
    height: 1600,
    award: { result: "Winner", competition: "ENLIGHT 2025 Photography Competition" },
  },
  {
    src: "/c.webp",
    alt: "Shortlisted frame",
    width: 1280,
    height: 719,
    award: { result: "Top 5", competition: "ARSPACE Photography Competition" },
  },
];

describe("PhotographyShowcase", () => {
  it("leads with the awarded frames and their results", () => {
    render(<PhotographyShowcase photographs={photographs} />);
    const awarded = screen.getByRole("region", { name: "Awarded" });

    expect(within(awarded).getByAltText("Winning frame")).toBeInTheDocument();
    expect(within(awarded).getByText("Winner")).toBeInTheDocument();
    expect(within(awarded).getByText("ARSPACE Photography Competition")).toBeInTheDocument();
    expect(within(awarded).queryByAltText("Portrait frame")).not.toBeInTheDocument();
  });

  it("shows each photograph once, never repeating an awarded frame in the gallery", () => {
    render(<PhotographyShowcase photographs={photographs} />);
    for (const alt of ["Portrait frame", "Winning frame", "Shortlisted frame"]) {
      expect(screen.getAllByAltText(alt)).toHaveLength(1);
    }
  });

  it("sizes the awarded columns by aspect ratio so the frames share a height", () => {
    const { container } = render(<PhotographyShowcase photographs={photographs} />);
    const grid = container.querySelector<HTMLElement>("[style*='--award-columns']");
    expect(grid?.style.getPropertyValue("--award-columns")).toBe(
      "minmax(0, 0.876fr) minmax(0, 1.780fr)"
    );
  });
});
