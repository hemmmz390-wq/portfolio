import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { useIsTouchDevice } from "@/lib/hooks/useIsTouchDevice";

vi.mock("@/lib/hooks/useIsTouchDevice", () => ({
  useIsTouchDevice: vi.fn(),
}));

describe("CustomCursor", () => {
  it("renders nothing on touch devices", () => {
    vi.mocked(useIsTouchDevice).mockReturnValue(true);
    const { container } = render(<CustomCursor />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders the cursor dot on non-touch devices", () => {
    vi.mocked(useIsTouchDevice).mockReturnValue(false);
    const { getByTestId } = render(<CustomCursor />);
    expect(getByTestId("custom-cursor")).toBeInTheDocument();
  });
});
