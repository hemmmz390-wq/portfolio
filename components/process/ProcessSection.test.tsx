import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProcessSection } from "@/components/process/ProcessSection";
import { processSteps } from "@/lib/content/process";

describe("ProcessSection", () => {
  it("renders every step with its number and title", () => {
    render(<ProcessSection steps={processSteps} />);
    for (const step of processSteps) {
      expect(screen.getByText(step.title)).toBeInTheDocument();
      expect(screen.getByText(step.number)).toBeInTheDocument();
    }
  });

  it("renders the steps as an ordered list", () => {
    render(<ProcessSection steps={processSteps} />);
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(processSteps.length);
  });
});
