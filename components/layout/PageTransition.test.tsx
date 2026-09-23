import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PageTransition } from "@/components/layout/PageTransition";

describe("PageTransition", () => {
  it("renders its children", () => {
    render(
      <PageTransition>
        <p>Page content</p>
      </PageTransition>
    );
    expect(screen.getByText("Page content")).toBeInTheDocument();
  });
});
