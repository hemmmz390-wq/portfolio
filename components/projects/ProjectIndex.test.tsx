import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectIndex } from "@/components/projects/ProjectIndex";
import { projects } from "@/lib/content/projects";

describe("ProjectIndex", () => {
  it("renders every project as a row linking to its detail page", () => {
    render(<ProjectIndex projects={projects} />);
    for (const project of projects) {
      const link = screen.getByRole("link", { name: new RegExp(project.title, "i") });
      expect(link).toHaveAttribute("href", `/work/${project.slug}`);
    }
  });
});
