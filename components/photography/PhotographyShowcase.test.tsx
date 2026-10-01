import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { PhotographyShowcase } from "@/components/photography/PhotographyShowcase";

const photographs = [
  { src: "/a.webp", alt: "Street frame", width: 2000, height: 1125 },
  {
    src: "/b.webp",
    alt: "Third place frame",
    width: 1401,
    height: 1600,
    award: { result: "3rd Place", competition: "ENLIGHT 2025 Photography Competition" },
  },
  {
    src: "/c.webp",
    alt: "Shortlisted frame",
    width: 1280,
    height: 719,
    award: { result: "Top Five", competition: "ARSPACE Photography Competition" },
  },
];

describe("PhotographyShowcase", () => {
  it("keeps competition work and personal work in separate carousels", () => {
    render(<PhotographyShowcase photographs={photographs} />);
    const awarded = screen.getByRole("region", { name: "Awarded" });
    const personal = screen.getByRole("region", { name: "Personal Work" });

    expect(within(awarded).getByAltText("Third place frame")).toBeInTheDocument();
    expect(within(awarded).getByAltText("Shortlisted frame")).toBeInTheDocument();
    expect(within(awarded).queryByAltText("Street frame")).not.toBeInTheDocument();
    expect(within(personal).getByAltText("Street frame")).toBeInTheDocument();
    expect(within(personal).queryByAltText("Third place frame")).not.toBeInTheDocument();
  });

  it("shows each photograph exactly once", () => {
    render(<PhotographyShowcase photographs={photographs} />);
    for (const alt of ["Street frame", "Third place frame", "Shortlisted frame"]) {
      expect(screen.getAllByAltText(alt)).toHaveLength(1);
    }
  });

  it("leaves out a carousel that has no photographs", () => {
    render(<PhotographyShowcase photographs={photographs.filter((photo) => photo.award)} />);
    expect(screen.queryByRole("region", { name: "Personal Work" })).not.toBeInTheDocument();
  });
});
