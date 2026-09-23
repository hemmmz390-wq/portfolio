import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Navbar } from "@/components/layout/Navbar";

vi.mock("next/navigation", () => ({
  usePathname: () => "/work",
}));

const links = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
];

describe("Navbar", () => {
  it("renders the name and all nav links", () => {
    render(<Navbar name="Elbert Alwi" links={links} />);
    expect(screen.getByText("Elbert Alwi")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute("href", "/work");
  });

  it("marks the current route as the active page", () => {
    render(<Navbar name="Elbert Alwi" links={links} />);
    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "About" })).not.toHaveAttribute("aria-current");
  });

  it("exposes a menu button for small screens", () => {
    render(<Navbar name="Elbert Alwi" links={links} />);
    expect(screen.getByRole("button", { name: /open menu/i })).toBeInTheDocument();
  });
});
