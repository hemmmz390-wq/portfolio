import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { projects, getProjectBySlug } from "@/lib/content/projects";

describe("projects content", () => {
  it("has exactly 4 real projects", () => {
    expect(projects).toHaveLength(4);
  });

  it("finds a project by slug", () => {
    const project = getProjectBySlug("marginku");
    expect(project?.title).toBe("Marginku");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getProjectBySlug("does-not-exist")).toBeUndefined();
  });

  it("every project has a description", () => {
    for (const project of projects) {
      expect(project.description.length).toBeGreaterThan(0);
    }
  });

  it("every referenced image file actually exists in public/", () => {
    for (const project of projects) {
      for (const path of [project.coverImage, project.heroImage]) {
        if (path === null) continue;
        expect(existsSync(join(process.cwd(), "public", path))).toBe(true);
      }
    }
  });

  it("every project has a unique slug and number", () => {
    const slugs = projects.map((project) => project.slug);
    const numbers = projects.map((project) => project.number);
    expect(new Set(slugs).size).toBe(projects.length);
    expect(new Set(numbers).size).toBe(projects.length);
  });
});
