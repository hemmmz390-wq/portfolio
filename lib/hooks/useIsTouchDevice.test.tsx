import { describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useIsTouchDevice } from "@/lib/hooks/useIsTouchDevice";

function mockMatchMedia(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })) as unknown as typeof window.matchMedia;
}

describe("useIsTouchDevice", () => {
  it("returns true for a coarse pointer", () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useIsTouchDevice());
    expect(result.current).toBe(true);
  });

  it("returns false for a fine pointer", () => {
    mockMatchMedia(false);
    const { result } = renderHook(() => useIsTouchDevice());
    expect(result.current).toBe(false);
  });
});
