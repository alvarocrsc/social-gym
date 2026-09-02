"use client"; // Lenis owns the scroll position, which only exists on the client.

import { useEffect } from "react";

import { registerScroller, unregisterScroller } from "@/lib/motion/scroll-lock";

/**
 * Momentum smooth scrolling.
 *
 * Driven off `gsap.ticker` rather than its own rAF loop, so the whole site
 * runs on one clock — the hero slider and the disciplines carousel are already
 * on that ticker, and a second loop would let them drift a frame apart.
 *
 * Renders nothing, loads nothing under `prefers-reduced-motion: reduce`.
 */
export function SmoothScroll(): null {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let disposed = false;
    let starting = false;
    let teardown: (() => void) | null = null;

    async function enable(): Promise<void> {
      if (starting || teardown !== null) return;
      starting = true;

      const [lenisModule, gsapModule] = await Promise.all([
        import("lenis"),
        import("gsap"),
      ]);
      starting = false;
      if (disposed || reduceMotion.matches) return;

      const Lenis = lenisModule.default;
      const gsap = gsapModule.gsap;
      const lenis = new Lenis({ autoRaf: false });

      const raf = (time: number): void => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      registerScroller(lenis);

      teardown = () => {
        gsap.ticker.remove(raf);
        gsap.ticker.lagSmoothing(500, 33);
        unregisterScroller();
        lenis.destroy();
      };
    }

    function sync(): void {
      if (reduceMotion.matches) {
        teardown?.();
        teardown = null;
      } else {
        void enable();
      }
    }

    sync();
    reduceMotion.addEventListener("change", sync);

    return () => {
      disposed = true;
      reduceMotion.removeEventListener("change", sync);
      teardown?.();
      teardown = null;
    };
  }, []);

  return null;
}
