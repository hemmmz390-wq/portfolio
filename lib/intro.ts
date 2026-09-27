export const INTRO_DONE_ATTRIBUTE = "data-intro-done";

/**
 * Releases the hero entrance: its animations stay paused in CSS until this
 * attribute lands on <html>, so they play in view instead of behind the overlay.
 */
export function markIntroDone() {
  document.documentElement.setAttribute(INTRO_DONE_ATTRIBUTE, "");
}
