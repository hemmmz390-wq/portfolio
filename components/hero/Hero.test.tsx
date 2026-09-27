import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/hero/Hero";

function renderHero() {
  return render(
    <Hero
      displayName="ELBERT"
      signature="Alwi"
      cjkName="莊秉洋"
      role="Web Developer / Photographer / Content Creator"
      subheadline={["TURNING IDEAS", "INTO INTERFACES."]}
      intro="Web developer, photographer, and content creator."
      imageSrc="/images/hero.webp"
      imageAlt="Elbert Alwi portrait"
    />
  );
}

describe("Hero", () => {
  it("spreads the display name into individual letters for the masthead", () => {
    renderHero();
    // One visible row plus two aria-hidden colour ghosts, so each letter of
    // ELBERT appears once per row (E twice, since the name contains two).
    expect(screen.getAllByText("B")).toHaveLength(3);
    expect(screen.getAllByText("T")).toHaveLength(3);
    expect(screen.getAllByText("E")).toHaveLength(6);
  });

  it("renders the signature and CJK name", () => {
    renderHero();
    expect(screen.getByText("Alwi")).toBeInTheDocument();
    expect(screen.getByText("莊秉洋")).toBeInTheDocument();
  });

  it("renders the role, intro, and subheadline", () => {
    renderHero();
    expect(
      screen.getByText("Web Developer / Photographer / Content Creator")
    ).toBeInTheDocument();
    expect(screen.getByText(/content creator\./i)).toBeInTheDocument();
    expect(screen.getByText("TURNING IDEAS")).toBeInTheDocument();
  });

  it("renders the portrait with alt text", () => {
    renderHero();
    expect(screen.getByAltText("Elbert Alwi portrait")).toBeInTheDocument();
  });
});
