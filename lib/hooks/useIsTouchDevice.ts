"use client";

import { useEffect, useState } from "react";

export function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: coarse)");
    setIsTouch(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => setIsTouch(event.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isTouch;
}
