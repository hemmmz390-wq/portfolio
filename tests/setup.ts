import "@testing-library/jest-dom/vitest";
import { vi, beforeEach } from "vitest";

vi.mock("next/font/google", () => ({
  League_Spartan: () => ({ variable: "--font-league-spartan", className: "font-display" }),
  Inter: () => ({ variable: "--font-inter", className: "font-body" }),
}));

beforeEach(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});
