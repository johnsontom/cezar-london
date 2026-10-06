/**
 * Reference-counted body scroll lock so overlapping overlays (mobile menu,
 * bag drawer, intro curtain) never unlock the page early.
 */
let locks = 0;

export function lockScroll() {
  if (typeof document === "undefined") return;
  locks += 1;
  document.body.dataset.scrollLocked = "true";
}

export function unlockScroll() {
  if (typeof document === "undefined") return;
  locks = Math.max(0, locks - 1);
  if (locks === 0) {
    document.body.dataset.scrollLocked = "false";
  }
}
