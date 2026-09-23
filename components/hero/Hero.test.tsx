import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/hero/Hero";

function renderHero() {
  return render(
    <Hero
      headline={["BUILDING FOR", "THE WEB."]}
      subheadline={["TURNING IDEAS", "INTO INTERFACES."]}
      imageSrc="/images/hero.webp"
      imageAlt="Elbert Alwi portrait"
      role="Web Developer / Photographer / Content Creator"
    />
  );
}

describe("Hero", () => {
  it("renders every headline line", () => {
    renderHero();
    expect(screen.getAllByText("BUILDING FOR").length).toBeGreaterThan(0);
    expect(screen.getAllByText("THE WEB.").length).toBeGreaterThan(0);
  });

  it("renders the subheadline and role", () => {
    renderHero();
    expect(screen.getByText("TURNING IDEAS")).toBeInTheDocument();
    expect(screen.getByText("Web Developer / Photographer / Content Creator")).toBeInTheDocument();
  });

  it("renders the hero image with alt text", () => {
    renderHero();
    expect(screen.getByAltText("Elbert Alwi portrait")).toBeInTheDocument();
  });

  it("renders the headline inside a level-one heading", () => {
    renderHero();
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });
});
