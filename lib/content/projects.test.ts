import { describe, expect, it } from "vitest";
import { projects, getProjectBySlug } from "@/lib/content/projects";

describe("projects content", () => {
  it("has exactly 3 real projects", () => {
    expect(projects).toHaveLength(3);
  });

  it("finds a project by slug", () => {
    const project = getProjectBySlug("marginku");
    expect(project?.title).toBe("Marginku");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getProjectBySlug("does-not-exist")).toBeUndefined();
  });

  it("every project has a description and no fabricated cover image", () => {
    for (const project of projects) {
      expect(project.description.length).toBeGreaterThan(0);
      expect(project.coverImage).toBeNull();
    }
  });

  it("every project has a unique slug and number", () => {
    const slugs = projects.map((project) => project.slug);
    const numbers = projects.map((project) => project.number);
    expect(new Set(slugs).size).toBe(projects.length);
    expect(new Set(numbers).size).toBe(projects.length);
  });
});
