import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectTeam } from "@/components/projects/ProjectTeam";

const members = [
  { name: "Elbert", role: "Content Creator & Editor", image: "/images/a.webp" },
  { name: "Amara", role: "Social Media Admin", image: "/images/b.webp" },
];

describe("ProjectTeam", () => {
  it("shows each member's name, role, and portrait", () => {
    render(<ProjectTeam members={members} />);

    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText("Amara")).toBeInTheDocument();
    expect(screen.getByText("Social Media Admin")).toBeInTheDocument();
    expect(screen.getByAltText("Elbert, Content Creator & Editor")).toBeInTheDocument();
  });
});
