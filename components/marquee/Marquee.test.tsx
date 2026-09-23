import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Marquee } from "@/components/marquee/Marquee";

describe("Marquee", () => {
  it("renders each item, duplicated for a seamless loop", () => {
    render(<Marquee items={["FRONTEND DEVELOPMENT", "PHOTOGRAPHY"]} />);
    expect(screen.getAllByText("FRONTEND DEVELOPMENT")).toHaveLength(2);
    expect(screen.getAllByText("PHOTOGRAPHY")).toHaveLength(2);
  });
});
