"use client";

import { useEffect, useRef, type ReactElement, type ReactNode } from "react";

import styles from "./Home.module.css";

export interface IndexCursorProps {
  children: ReactNode;
}

const FOLLOW = 0.14;
const GAP = 14;
const TILT_EASE = 0.12;
const TILT_MAX = 9;

export function IndexCursor({ children }: IndexCursorProps): ReactElement {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (root === null) return;

    const preview = root.querySelector<HTMLElement>("[data-preview]");
    const strip = root.querySelector<HTMLElement>("[data-strip]");
    if (preview === null || strip === null) return;

    const capable = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let disposed = false;
    let teardown: (() => void) | null = null;

    async function activate(): Promise<void> {
      const { gsap } = await import("gsap");
      if (disposed || root === null || preview === null || strip === null) {
        return;
      }
      if (!capable.matches) return;

      let pointerX = 0;
      let pointerY = 0;
      let x = 0;
      let y = 0;
      let tilt = 0;
      let inside = false;
      let primed = false;
      let active = -1;
      let activeRow: HTMLElement | null = null;
      let lastScroll = window.scrollY;
      let width = preview.offsetWidth;
      let height = preview.offsetHeight;
      let headerClear = 0;

      function measure(): void {
        width = preview?.offsetWidth ?? width;
        height = preview?.offsetHeight ?? height;
        const raw = getComputedStyle(document.documentElement).getPropertyValue(
          "--header-height",
        );
        headerClear = (Number.parseFloat(raw) || 72) + GAP;
      }

      measure();

      function select(target: Element | null): void {
        const row = target?.closest<HTMLElement>("[data-row]") ?? null;
        if (row === null || root === null || strip === null) return;
        const next = Number(row.dataset.row);
        root.setAttribute("data-previewing", "");
        activeRow = row;
        if (next === active) return;
        active = next;
        strip.style.setProperty("--active", String(next));
      }

      function onMove(event: PointerEvent): void {
        pointerX = event.clientX;
        pointerY = event.clientY;
        inside = true;
        select(event.target instanceof Element ? event.target : null);
      }

      function onLeave(): void {
        inside = false;
        primed = false;
        root?.removeAttribute("data-previewing");
      }

      function onResize(): void {
        measure();
      }

      function tick(): void {
        if (!inside || root === null || preview === null) return;

        if (window.scrollY !== lastScroll) {
          lastScroll = window.scrollY;
          select(document.elementFromPoint(pointerX, pointerY));
        }

        if (activeRow === null) return;
        const rect = root.getBoundingClientRect();
        const row = activeRow.getBoundingClientRect();
        const localX = pointerX - rect.left;
        const targetX = Math.min(
          Math.max(localX, width / 2 + GAP),
          rect.width - width / 2 - GAP,
        );
        const fitsAbove = row.top - GAP - height >= headerClear;
        const targetY = fitsAbove
          ? row.top - rect.top - GAP - height / 2
          : row.bottom - rect.top + GAP + height / 2;

        if (!primed) {
          x = targetX;
          y = targetY;
          primed = true;
        }

        const step = (targetX - x) * FOLLOW;
        x += step;
        y += (targetY - y) * FOLLOW;
        const lean = Math.max(-TILT_MAX, Math.min(TILT_MAX, step * 0.45));
        tilt += (lean - tilt) * TILT_EASE;

        preview.style.setProperty("--px", x.toFixed(1));
        preview.style.setProperty("--py", y.toFixed(1));
        preview.style.setProperty("--tilt", tilt.toFixed(2));
      }

      root.addEventListener("pointermove", onMove);
      root.addEventListener("pointerleave", onLeave);
      window.addEventListener("resize", onResize);
      gsap.ticker.add(tick);

      teardown = () => {
        gsap.ticker.remove(tick);
        root.removeEventListener("pointermove", onMove);
        root.removeEventListener("pointerleave", onLeave);
        window.removeEventListener("resize", onResize);
        root.removeAttribute("data-previewing");
        strip.style.removeProperty("--active");
        ["--px", "--py", "--tilt"].forEach((name) => {
          preview.style.removeProperty(name);
        });
      };
    }

    function sync(): void {
      if (!capable.matches) {
        teardown?.();
        teardown = null;
        return;
      }
      if (teardown === null) void activate();
    }

    sync();
    capable.addEventListener("change", sync);

    return () => {
      disposed = true;
      capable.removeEventListener("change", sync);
      teardown?.();
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.cursor}>
      {children}
    </div>
  );
}
