import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PhotoGallery } from "@/components/photography/PhotoGallery";

const photo = (n: number) => ({
  src: `/images/p${n}.webp`,
  alt: `Photograph ${n}`,
  width: 2000,
  height: 1125,
});

describe("PhotoGallery", () => {
  it("renders every photograph with its alt text", () => {
    render(<PhotoGallery photographs={[photo(1), photo(2), photo(3)]} />);
    for (const n of [1, 2, 3]) {
      expect(screen.getByAltText(`Photograph ${n}`)).toBeInTheDocument();
    }
  });

  it("runs every third frame full width and pairs the two between", () => {
    render(<PhotoGallery photographs={[photo(1), photo(2), photo(3), photo(4)]} />);
    const figures = screen.getAllByRole("figure");
    const fullWidth = figures.map((figure) => figure.className.includes("col-span-2"));
    expect(fullWidth).toEqual([true, false, false, true]);
  });
});
