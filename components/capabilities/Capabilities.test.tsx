import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Capabilities } from "@/components/capabilities/Capabilities";
import { capabilities } from "@/lib/content/capabilities";

describe("Capabilities", () => {
  it("renders every capability title and its tools", () => {
    render(<Capabilities capabilities={capabilities} />);
    expect(screen.getByText("Frontend Development")).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("Photography")).toBeInTheDocument();
    expect(screen.getByText("Lightroom")).toBeInTheDocument();
    expect(screen.getByText("Content Creation & Video Editing")).toBeInTheDocument();
    expect(screen.getByText("CapCut")).toBeInTheDocument();
  });
});
