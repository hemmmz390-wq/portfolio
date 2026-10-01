import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ProjectIndexGroups } from "@/components/projects/ProjectIndexGroups";
import { getProjectGroups } from "@/lib/content/projects";

describe("ProjectIndexGroups", () => {
  it("lists each project under its own discipline", () => {
    render(<ProjectIndexGroups groups={getProjectGroups()} />);

    const web = screen.getByRole("region", { name: "Web Development" });
    const content = screen.getByRole("region", { name: "Content Creation" });

    expect(within(web).getByRole("link", { name: /marginku/i })).toBeInTheDocument();
    expect(within(web).queryByRole("link", { name: /neduh gas/i })).not.toBeInTheDocument();
    expect(within(content).getByRole("link", { name: /neduh gas/i })).toBeInTheDocument();
    expect(within(content).queryByRole("link", { name: /marginku/i })).not.toBeInTheDocument();
  });
});
