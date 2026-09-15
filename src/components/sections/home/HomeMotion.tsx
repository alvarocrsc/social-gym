"use client";

import { useEffect, useRef, type ReactElement, type ReactNode } from "react";

import styles from "./Home.module.css";

export interface HomeMotionProps {
  children: ReactNode;
}

function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}

export function HomeMotion({ children }: HomeMotionProps): ReactElement {
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

      let viewportH = window.innerHeight;
      const layers = Array.from(
        root.querySelectorAll<HTMLElement>("[data-parallax]"),
      );
      const live = new Set<HTMLElement>();
      const finals = new Map<HTMLElement, string>();
      const tweens: gsap.core.Tween[] = [];

      function progressOf(layer: HTMLElement): void {
        const rect = layer.getBoundingClientRect();
        const p = clamp01((viewportH - rect.top) / (viewportH + rect.height));
        layer.style.setProperty("--p", p.toFixed(4));
      }

      const tracker = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const layer = entry.target as HTMLElement;
            if (entry.isIntersecting) live.add(layer);
            else live.delete(layer);
          });
        },
        { rootMargin: "25% 0px" },
      );

      function count(element: HTMLElement): void {
        const target = Number(element.dataset.count);
        if (!Number.isFinite(target)) return;
        const final = element.textContent ?? "";
        finals.set(element, final);
        const state = { value: 0 };
        element.textContent = "0";
        tweens.push(
          gsap.to(state, {
            value: target,
            duration: 1.8,
            ease: "power3.out",
            onUpdate: () => {
              element.textContent = String(Math.round(state.value));
            },
            onComplete: () => {
              element.textContent = final;
            },
          }),
        );
      }

      const revealer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const element = entry.target as HTMLElement;
            element.setAttribute("data-shown", "");
            element
              .querySelectorAll<HTMLElement>("[data-count]")
              .forEach(count);
            revealer.unobserve(element);
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
      );

      root
        .querySelectorAll<HTMLElement>("[data-rv], [data-rv-line]")
        .forEach((element) => {
          if (element.getBoundingClientRect().top < viewportH) {
            element.setAttribute("data-shown", "");
            return;
          }
          revealer.observe(element);
        });

      function update(): void {
        live.forEach(progressOf);
      }

      function onResize(): void {
        viewportH = window.innerHeight;
        layers.forEach(progressOf);
      }

      layers.forEach((layer) => {
        progressOf(layer);
        tracker.observe(layer);
      });
      root.setAttribute("data-motion", "");
      gsap.ticker.add(update);
      window.addEventListener("resize", onResize);

      teardown = () => {
        gsap.ticker.remove(update);
        window.removeEventListener("resize", onResize);
        tracker.disconnect();
        revealer.disconnect();
        tweens.forEach((tween) => tween.kill());
        finals.forEach((final, element) => {
          element.textContent = final;
        });
        layers.forEach((layer) => layer.style.removeProperty("--p"));
        root.removeAttribute("data-motion");
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
    <div ref={rootRef} className={styles.home}>
      {children}
    </div>
  );
}
