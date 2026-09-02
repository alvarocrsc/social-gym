/**
 * Bridge between the nav overlay's scroll lock and the smooth scroller.
 *
 * `overflow: hidden` on `<html>` stops native scrolling but not Lenis, which
 * drives the scroll position itself — the page would keep gliding behind the
 * open menu. Rather than have `NavOverlay` import Lenis, both sides talk to
 * this tiny registry, so either can be absent.
 */

interface Scroller {
  start: () => void;
  stop: () => void;
}

let scroller: Scroller | null = null;
let locked = false;

/** Called by `SmoothScroll` once Lenis exists. */
export function registerScroller(instance: Scroller): void {
  scroller = instance;
  // A lock raised before the scroller loaded still has to apply.
  if (locked) scroller.stop();
}

export function unregisterScroller(): void {
  scroller = null;
}

/** Called by `NavOverlay` whenever the menu opens or closes. */
export function lockScroll(next: boolean): void {
  locked = next;
  if (scroller === null) return;
  if (next) scroller.stop();
  else scroller.start();
}
