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
      imageSrc="/images/hero-arms-color.webp"
      imageAlt="Elbert Alwi portrait"
    />
  );
}

describe("Hero", () => {
  it("spreads the display name into individual letters for the masthead", () => {
    renderHero();
    // One span per letter, so each slides up independently (ELBERT has two Es).
    expect(screen.getAllByText("B")).toHaveLength(1);
    expect(screen.getAllByText("T")).toHaveLength(1);
    expect(screen.getAllByText("E")).toHaveLength(2);
  });

  it("exposes the full name as the page's level-one heading", () => {
    renderHero();
    expect(screen.getByRole("heading", { level: 1, name: "ELBERT Alwi" })).toBeInTheDocument();
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
