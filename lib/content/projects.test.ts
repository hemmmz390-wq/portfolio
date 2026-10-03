import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import {
  projects,
  getProjectBySlug,
  getProjectGroups,
  getProjectsByDiscipline,
} from "@/lib/content/projects";

describe("projects content", () => {
  it("has exactly 5 real projects", () => {
    expect(projects).toHaveLength(5);
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

  it("records each gallery image's real size, so none is stretched", async () => {
    for (const project of projects) {
      for (const image of project.gallery) {
        const { width, height } = await sharp(join(process.cwd(), "public", image.src)).metadata();
        expect({ src: image.src, width, height }).toEqual({
          src: image.src,
          width: image.width,
          height: image.height,
        });
      }
    }
  });

  it("every referenced image file actually exists in public/", () => {
    for (const project of projects) {
      const teamImages = (project.team ?? []).map((member) => member.image);
      const galleryImages = project.gallery.map((image) => image.src);
      for (const path of [project.coverImage, project.heroImage, ...teamImages, ...galleryImages]) {
        if (path === null) continue;
        expect(existsSync(join(process.cwd(), "public", path)), path).toBe(true);
      }
    }
  });

  it("credits the four-person Neduh Gas team with their roles", () => {
    const team = getProjectBySlug("neduh-gas")?.team ?? [];
    expect(team.map((member) => [member.name, member.role])).toEqual([
      ["Elbert", "Content Creator & Editor"],
      ["Amara", "Social Media Admin"],
      ["Aurel", "Content Strategy"],
      ["Artha", "Content Creator"],
    ]);
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
      "kosguide",
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
