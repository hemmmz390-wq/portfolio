"use client";

import { useCallback, useSyncExternalStore } from "react";

export const INTRO_DONE_ATTRIBUTE = "data-intro-done";
export const INTRO_DONE_EVENT = "intro-done";

export function markIntroDone() {
  document.documentElement.setAttribute(INTRO_DONE_ATTRIBUTE, "");
  window.dispatchEvent(new Event(INTRO_DONE_EVENT));
}

/**
 * True once the opening overlay has finished (or was skipped). The hero holds
 * its entrance until this flips, so the glitch isn't spent behind the overlay.
 */
export function useIntroDone(): boolean {
  const subscribe = useCallback((onStoreChange: () => void) => {
    window.addEventListener(INTRO_DONE_EVENT, onStoreChange);
    return () => window.removeEventListener(INTRO_DONE_EVENT, onStoreChange);
  }, []);

  const getSnapshot = useCallback(
    () => document.documentElement.hasAttribute(INTRO_DONE_ATTRIBUTE),
    []
  );

  // The server can't know, so it assumes the intro is still running; the
  // client corrects on hydration.
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
