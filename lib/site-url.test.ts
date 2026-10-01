import { afterEach, describe, expect, it, vi } from "vitest";

// siteUrl is resolved once at import time, so each case re-imports it fresh.
async function resolveSiteUrl(env: Record<string, string | undefined>) {
  vi.resetModules();
  for (const [key, value] of Object.entries(env)) vi.stubEnv(key, value);
  return (await import("@/lib/site-url")).siteUrl;
}

const clear = {
  NEXT_PUBLIC_SITE_URL: undefined,
  VERCEL_PROJECT_PRODUCTION_URL: undefined,
  VERCEL_URL: undefined,
};

describe("siteUrl", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("prefers an explicit NEXT_PUBLIC_SITE_URL", async () => {
    const url = await resolveSiteUrl({
      ...clear,
      NEXT_PUBLIC_SITE_URL: "https://elbert.dev",
      VERCEL_PROJECT_PRODUCTION_URL: "portfolio.vercel.app",
    });
    expect(url).toBe("https://elbert.dev");
  });

  it("falls back to the Vercel production domain, adding the protocol", async () => {
    const url = await resolveSiteUrl({
      ...clear,
      VERCEL_PROJECT_PRODUCTION_URL: "portfolio.vercel.app",
      VERCEL_URL: "portfolio-abc123.vercel.app",
    });
    expect(url).toBe("https://portfolio.vercel.app");
  });

  it("uses the deployment URL when there is no production domain", async () => {
    const url = await resolveSiteUrl({ ...clear, VERCEL_URL: "portfolio-abc123.vercel.app" });
    expect(url).toBe("https://portfolio-abc123.vercel.app");
  });

  it("only falls back to localhost outside Vercel", async () => {
    expect(await resolveSiteUrl(clear)).toBe("http://localhost:3000");
  });
});
