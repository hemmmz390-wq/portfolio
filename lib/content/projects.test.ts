import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import {
  projects,
  getProjectBySlug,
  getProjectGroups,
  getProjectsByDiscipline,
} from "@/lib/content/projects";

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

describe("project disciplines", () => {
  it("keeps web work and content work apart", () => {
    expect(getProjectsByDiscipline("web").map((project) => project.slug)).toEqual([
      "marginku",
      "hospi-ai",
      "hibiz",
    ]);
    expect(getProjectsByDiscipline("content").map((project) => project.slug)).toEqual([
      "neduh-gas",
    ]);
  });

  it("groups web first, then content, and accounts for every project", () => {
    const groups = getProjectGroups();
    expect(groups.map((group) => group.id)).toEqual(["web", "content"]);
    const grouped = groups.flatMap((group) => group.projects);
    expect(grouped).toHaveLength(projects.length);
  });

  it("leaves out a discipline that has no projects in the given list", () => {
    const webOnly = getProjectsByDiscipline("web");
    expect(getProjectGroups(webOnly).map((group) => group.id)).toEqual(["web"]);
  });
});
