import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PhotoCarousel } from "@/components/photography/PhotoCarousel";

const photographs = [
  {
    src: "/a.webp",
    alt: "Third place frame",
    width: 1401,
    height: 1600,
    award: { result: "3rd Place", competition: "ENLIGHT 2025 Photography Competition" },
  },
  { src: "/b.webp", alt: "Plain frame", width: 2000, height: 1125 },
  { src: "/c.webp", alt: "Another frame", width: 2000, height: 1333 },
];

describe("PhotoCarousel", () => {
  it("labels itself and each slide for assistive tech", () => {
    render(<PhotoCarousel label="Awarded" photographs={photographs} />);
    expect(screen.getByRole("region", { name: "Awarded" })).toHaveAttribute(
      "aria-roledescription",
      "carousel"
    );
    expect(screen.getByRole("group", { name: "1 of 3" })).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "3 of 3" })).toBeInTheDocument();
  });

  it("starts on the first slide with the back button disabled", () => {
    render(<PhotoCarousel label="Awarded" photographs={photographs} />);
    expect(screen.getByText("01 / 03")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Previous photo" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next photo" })).toBeEnabled();
  });

  it("overlays the result only on frames that won something", () => {
    render(<PhotoCarousel label="Awarded" photographs={photographs} />);
    const winning = screen.getByRole("group", { name: "1 of 3" });
    const plain = screen.getByRole("group", { name: "2 of 3" });

    expect(winning).toHaveTextContent("3rd Place");
    expect(winning).toHaveTextContent("ENLIGHT 2025 Photography Competition");
    expect(plain).not.toHaveTextContent("3rd Place");
  });

  it("keeps each frame at its own aspect ratio", () => {
    render(<PhotoCarousel label="Awarded" photographs={photographs} />);
    expect(screen.getByRole("group", { name: "1 of 3" }).style.aspectRatio).toBe("1401 / 1600");
  });
});
