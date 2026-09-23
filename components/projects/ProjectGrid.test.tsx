import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { projects } from "@/lib/content/projects";

describe("ProjectGrid", () => {
  it("renders a card for every project", () => {
    render(<ProjectGrid projects={projects} />);
    for (const project of projects) {
      expect(screen.getByText(project.title)).toBeInTheDocument();
    }
  });

  it("renders nothing when there are no projects", () => {
    render(<ProjectGrid projects={[]} />);
    expect(screen.queryAllByRole("link")).toHaveLength(0);
  });
});
