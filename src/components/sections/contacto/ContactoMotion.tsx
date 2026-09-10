"use client";

import { useEffect, useRef, type ReactElement, type ReactNode } from "react";

import styles from "./Contacto.module.css";

export interface ContactoMotionProps {
  children: ReactNode;
}

const LERP = 0.09;
const SETTLED = 0.0004;

function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}

/**
 * `'use client'` — the lockup is scroll-linked and reveals need an observer,
 * neither of which exists at build time.
 *
 * Children stay server-rendered: every word, link and hour is in the static
 * HTML and this only writes one custom property and one attribute onto it, so
 * React never reconciles a DOM node this file has touched.
 */
export function ContactoMotion({
  children,
}: ContactoMotionProps): ReactElement {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (root === null) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let teardown: (() => void) | null = null;

    async function activate(): Promise<void> {
      const { gsap } = await import("gsap");
      if (disposed || root === null || reduceMotion.matches) return;

      const stage = root.querySelector<HTMLElement>("[data-stage]");
      let viewportH = window.innerHeight;
      let lastY = Number.NaN;
      let progress = 0;
      let settled = false;

      function targetFor(): number {
        if (stage === null) return 1;
        const rect = stage.getBoundingClientRect();
        // Normalised against the stage's own visible travel. Dividing by
        // `viewport + height` can never reach 1 on a short page, which strands
        // the wordmark mid-transit over the copyright bar.
        const span = Math.max(1, Math.min(rect.height, viewportH) * 0.6);
        return clamp01((viewportH - rect.top) / span);
      }

      function update(): void {
        if (stage === null) return;

        const scrollY = window.scrollY;
        const moved = scrollY !== lastY;
        if (!moved && settled) return;
        lastY = scrollY;

        const target = targetFor();
        const delta = target - progress;

        if (Math.abs(delta) < SETTLED) {
          progress = target;
          settled = true;
          stage.removeAttribute("data-animating");
        } else {
          progress += delta * LERP;
          settled = false;
          stage.setAttribute("data-animating", "");
        }

        stage.style.setProperty("--slab-p", progress.toFixed(4));
      }

      // Snap to whatever the current scroll position implies before the first
      // frame, so a restored scroll or a deep link does not play the reveal
      // from zero on top of already-visible content.
      progress = targetFor();

      const revealer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.setAttribute("data-shown", "");
            revealer.unobserve(entry.target);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
      );
      root
        .querySelectorAll<HTMLElement>("[data-rv], [data-rv-line]")
        .forEach((element) => {
          // Anything already on screen when hydration lands is marked before
          // `data-motion` goes on, so a restored scroll position cannot flash
          // visible content out and fade it back in.
          if (element.getBoundingClientRect().top < viewportH) {
            element.setAttribute("data-shown", "");
          }
          revealer.observe(element);
        });

      function onResize(): void {
        viewportH = window.innerHeight;
        settled = false;
      }

      update();
      root.setAttribute("data-motion", "");
      gsap.ticker.add(update);
      window.addEventListener("resize", onResize);

      teardown = () => {
        gsap.ticker.remove(update);
        window.removeEventListener("resize", onResize);
        revealer.disconnect();
        root.removeAttribute("data-motion");
        stage?.removeAttribute("data-animating");
        stage?.style.removeProperty("--slab-p");
        root.querySelectorAll("[data-shown]").forEach((element) => {
          element.removeAttribute("data-shown");
        });
      };
    }

    function sync(): void {
      if (reduceMotion.matches) {
        teardown?.();
        teardown = null;
        return;
      }
      if (teardown === null) void activate();
    }

    sync();
    reduceMotion.addEventListener("change", sync);

    return () => {
      disposed = true;
      reduceMotion.removeEventListener("change", sync);
      teardown?.();
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.page}>
      <div className={styles.wash} aria-hidden />
      {children}
    </div>
  );
}
