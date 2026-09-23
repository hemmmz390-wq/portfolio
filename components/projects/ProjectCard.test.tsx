import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/lib/content/projects";

describe("ProjectCard", () => {
  it("renders the project number, title, category, and year", () => {
    render(<ProjectCard project={projects[0]} />);
    expect(screen.getByText("Marginku")).toBeInTheDocument();
    expect(screen.getByText("Financial Tool / Web App")).toBeInTheDocument();
    expect(screen.getByText("2026")).toBeInTheDocument();
    expect(screen.getByText("01")).toBeInTheDocument();
  });

  it("links to the project detail page and labels the custom cursor", () => {
    render(<ProjectCard project={projects[0]} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/work/marginku");
    expect(link).toHaveAttribute("data-cursor-label", "VIEW PROJECT →");
  });

  it("renders the cover image when the project has one", () => {
    render(<ProjectCard project={projects[0]} />);
    expect(screen.getByAltText("Marginku")).toBeInTheDocument();
    expect(screen.queryByTestId("project-placeholder")).not.toBeInTheDocument();
  });

  it("falls back to a typographic placeholder when there is no cover image", () => {
    render(<ProjectCard project={{ ...projects[0], coverImage: null }} />);
    expect(screen.getByTestId("project-placeholder")).toBeInTheDocument();
    expect(screen.queryByAltText("Marginku")).not.toBeInTheDocument();
  });
});
