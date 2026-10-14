import { describe, expect, it } from "vitest";
import { join } from "node:path";
import sharp from "sharp";
import { photographs } from "@/lib/content/photography";

describe("photography content", () => {
  it("has a frame for every photograph supplied", () => {
    expect(photographs).toHaveLength(8);
  });

  it("records both competition results as Elbert stated them", () => {
    const awards = photographs.flatMap((photo) => (photo.award ? [photo.award] : []));
    expect(awards).toEqual([
      { result: "3rd Place", competition: "ENLIGHT 2025 Photography Competition" },
      {
        result: "Top Five",
        competition: "ARSPACE Photography Competition, Universitas Ciputra Surabaya",
      },
    ]);
  });

  it("records each image's real size, so no frame is stretched", async () => {
    for (const photo of photographs) {
      const file = join(process.cwd(), "public", photo.src);
      const { width, height } = await sharp(file).metadata();
      expect({ src: photo.src, width, height }).toEqual({
        src: photo.src,
        width: photo.width,
        height: photo.height,
      });
    }
  });

  it("gives every photograph alt text", () => {
    for (const photo of photographs) {
      expect(photo.alt.length).toBeGreaterThan(20);
    }
  });
});
