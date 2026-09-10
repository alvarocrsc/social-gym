"use client";

import { useEffect, useRef, type ReactElement, type ReactNode } from "react";

import styles from "./Horarios.module.css";

export interface HorariosMotionProps {
  children: ReactNode;
  /** Announced after a filter changes, `{n}` replaced with the match count. */
  countTemplate: string;
}

const NOW_INTERVAL_MS = 60_000;
const DAY_CODES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;

function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}

function minutesOf(time: string): number {
  const [h = "0", m = "0"] = time.split(":");
  return Number(h) * 60 + Number(m);
}

/**
 * `'use client'` — the timetable filters, today's column and the "now" row all
 * depend on interaction and on the visitor's clock, none of which exist at
 * build time. Children stay server-rendered: every class, hour and coach is in
 * the static HTML, and this only toggles attributes on it.
 */
export function HorariosMotion({
  children,
  countTemplate,
}: HorariosMotionProps): ReactElement {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (root === null) return;

    const chips = Array.from(
      root.querySelectorAll<HTMLElement>("[data-class][data-tier]"),
    );
    const menus = Array.from(
      root.querySelectorAll<HTMLElement>("[data-filter]"),
    );
    const clear = root.querySelector<HTMLButtonElement>("[data-filter-clear]");
    const noMatch = root.querySelector<HTMLElement>("[data-no-match]");
    const status = root.querySelector<HTMLElement>("[data-filter-status]");
    const countable = Array.from(
      root.querySelectorAll<HTMLElement>("[data-timetable] [data-class]"),
    );

    function applyFilters(): void {
      const selected: Record<string, string> = {};
      menus.forEach((menu) => {
        selected[menu.dataset.filter ?? ""] = menu.dataset.value ?? "all";
      });

      chips.forEach((chip) => {
        const on = Object.entries(selected).every(
          ([group, value]) => value === "all" || chip.dataset[group] === value,
        );
        chip.toggleAttribute("data-dimmed", !on);
        // `inert` keeps a dimmed cell out of the tab order and the
        // accessibility tree — dimming alone is not a filter for a screen
        // reader, and a 12%-opacity link is still focusable.
        chip.toggleAttribute("inert", !on);
      });

      // The day agenda renders the same classes again, so only the table is
      // counted. Empty rows and days collapse in CSS with `:has()`.
      const matches = countable.filter(
        (chip) => !chip.hasAttribute("data-dimmed"),
      ).length;

      const filtered = Object.values(selected).some((value) => value !== "all");
      if (clear !== null) clear.hidden = !filtered;
      if (noMatch !== null) noMatch.hidden = matches > 0;
      if (status !== null) {
        status.textContent = countTemplate.replace("{n}", String(matches));
      }
    }

    function onClear(): void {
      document.dispatchEvent(new CustomEvent("horarios:reset"));
    }

    root.addEventListener("filterchange", applyFilters);
    clear?.addEventListener("click", onClear);
    applyFilters();

    const today = DAY_CODES[new Date().getDay()];
    root
      .querySelectorAll<HTMLElement>(`[data-day="${String(today)}"]`)
      .forEach((cell) => {
        cell.setAttribute("data-today", "");
      });

    const rows = Array.from(root.querySelectorAll<HTMLElement>("[data-start]"));

    function markNow(): void {
      const now = new Date();
      const minutes = now.getHours() * 60 + now.getMinutes();
      let current: HTMLElement | null = null;
      rows.forEach((row) => {
        const start = minutesOf(row.dataset.start ?? "0:00");
        if (minutes >= start && minutes < start + 60) current = row;
        row.removeAttribute("data-now");
      });
      (current as HTMLElement | null)?.setAttribute("data-now", "");
    }

    markNow();
    const nowTimer = window.setInterval(markNow, NOW_INTERVAL_MS);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let teardown: (() => void) | null = null;

    async function activate(): Promise<void> {
      const { gsap } = await import("gsap");
      if (disposed || root === null) return;

      const hero = root.querySelector<HTMLElement>("[data-hero]");
      const cta = root.querySelector<HTMLElement>("[data-cta]");
      const week = root.querySelector<HTMLElement>("[data-week]");

      let viewportH = window.innerHeight;
      let lastY = -1;
      let dirty = true;
      let idleTimer = 0;

      function update(): void {
        const scrollY = window.scrollY;
        if (scrollY !== lastY) {
          lastY = scrollY;
          dirty = true;
        }
        if (!dirty) return;
        dirty = false;

        if (hero !== null) {
          const t = Math.max(0, -hero.getBoundingClientRect().top);
          root?.style.setProperty("--hero-t", String(t));
          root?.style.setProperty(
            "--hero-fade",
            clamp01(t / (viewportH * 0.8)).toFixed(4),
          );
        }

        if (cta !== null) {
          const rect = cta.getBoundingClientRect();
          cta.style.setProperty(
            "--cta-progress",
            clamp01((viewportH - rect.top) / (viewportH + rect.height)).toFixed(
              4,
            ),
          );
        }

        document.documentElement.style.setProperty(
          "--page-progress",
          clamp01(
            scrollY / (document.documentElement.scrollHeight - viewportH || 1),
          ).toFixed(4),
        );
      }

      function onScroll(): void {
        root?.setAttribute("data-scrolling", "");
        window.clearTimeout(idleTimer);
        idleTimer = window.setTimeout(() => {
          root?.removeAttribute("data-scrolling");
        }, 160);
      }

      function onResize(): void {
        viewportH = window.innerHeight;
        dirty = true;
      }

      const revealer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.setAttribute("data-shown", "");
            revealer.unobserve(entry.target);
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
      );
      root.querySelectorAll("[data-rv]").forEach((el) => revealer.observe(el));

      // The week fills in a diagonal cascade; the delay is baked into each
      // chip on the server so the order survives filtering.
      const cascadeTimers: number[] = [];
      const cascade = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          chips.forEach((chip) => {
            cascadeTimers.push(
              window.setTimeout(
                () => {
                  chip.setAttribute("data-shown", "");
                },
                Number(chip.dataset.chipDelay ?? "0"),
              ),
            );
          });
          cascade.disconnect();
        },
        { threshold: 0.05 },
      );
      if (week !== null) cascade.observe(week);

      update();
      root.setAttribute("data-motion", "");
      gsap.ticker.add(update);
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);

      teardown = () => {
        gsap.ticker.remove(update);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
        window.clearTimeout(idleTimer);
        cascadeTimers.forEach((timer) => {
          window.clearTimeout(timer);
        });
        revealer.disconnect();
        cascade.disconnect();
        root.removeAttribute("data-motion");
        root.removeAttribute("data-scrolling");
        document.documentElement.style.removeProperty("--page-progress");
        chips.forEach((chip) => {
          chip.removeAttribute("data-shown");
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
      window.clearInterval(nowTimer);
      root.removeEventListener("filterchange", applyFilters);
      clear?.removeEventListener("click", onClear);
      teardown?.();
    };
  }, [countTemplate]);

  return (
    <>
      <div className={styles.progress} aria-hidden />
      <div ref={rootRef} className={styles.page}>
        <div className={styles.wash} aria-hidden />
        {children}
      </div>
    </>
  );
}
