import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { NoiseOverlay } from "@/components/motion/NoiseOverlay";

describe("NoiseOverlay", () => {
  it("renders an aria-hidden, non-interactive overlay", () => {
    const { getByTestId } = render(<NoiseOverlay />);
    const overlay = getByTestId("noise-overlay");
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveAttribute("aria-hidden", "true");
    expect(overlay.className).toContain("pointer-events-none");
  });
});
