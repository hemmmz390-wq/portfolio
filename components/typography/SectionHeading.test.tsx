import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionHeading } from "@/components/typography/SectionHeading";

describe("SectionHeading", () => {
  it("renders the title and optional eyebrow", () => {
    render(<SectionHeading eyebrow="Selected Work" title="Projects" />);
    expect(screen.getByText("Selected Work")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Projects" })).toBeInTheDocument();
  });

  it("renders without an eyebrow", () => {
    render(<SectionHeading title="About" />);
    expect(screen.getByRole("heading", { level: 2, name: "About" })).toBeInTheDocument();
  });
});
