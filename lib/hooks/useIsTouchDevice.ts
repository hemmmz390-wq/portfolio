"use client";

import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

export function useIsTouchDevice(): boolean {
  return useMediaQuery("(pointer: coarse)");
}
