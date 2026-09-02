"use client";

import { useEffect, useRef, type ReactElement, type ReactNode } from "react";

import styles from "./Disciplina.module.css";

export interface DisciplinaMotionProps {
  children: ReactNode;
}

/** Lead-in either side of the stage, so a clip is already running when it
 *  enters rather than starting from its poster. */
const PLAY_MARGIN = 140;

const RING_CIRCUMFERENCE = 2 * Math.PI * 66;
const RING_STAGGER_MS = 130;
const COUNT_MS = 1500;
const TRACK_LERP = 0.1;

function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}

/**
 * Choreography for the whole discipline page.
 *
 * `'use client'` — scroll-linked writes need layout reads every frame.
 *
 * Children are server-rendered and only ever read here, never re-created, so
 * all copy stays in the server HTML. Every write is a custom property; the
 * maths that turns it into a transform lives in the module. The loop rides
 * `gsap.ticker`, which `SmoothScroll` already runs for Lenis, so the page adds
 * no second rAF.
 */
export function DisciplinaMotion({
  children,
}: DisciplinaMotionProps): ReactElement {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (root === null) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let disposed = false;
    let teardown: (() => void) | null = null;

    async function activate(): Promise<void> {
      const { gsap } = await import("gsap");
      if (disposed || root === null) return;

      const hero = root.querySelector<HTMLElement>("[data-hero]");
      const gallery = root.querySelector<HTMLElement>("[data-gallery]");
      const track = root.querySelector<HTMLElement>("[data-gallery-track]");
      const session = root.querySelector<HTMLElement>("[data-session]");
      const cta = root.querySelector<HTMLElement>("[data-cta]");
      const pieces = Array.from(
        root.querySelectorAll<HTMLElement>("[data-piece]"),
      );
      const clips = new Map<HTMLElement, HTMLVideoElement>();
      pieces.forEach((piece) => {
        const clip =
          piece.querySelector<HTMLVideoElement>("[data-piece-video]");
        if (clip !== null) clips.set(piece, clip);
      });

      function setPlaying(piece: HTMLElement, playing: boolean): void {
        const clip = clips.get(piece);
        if (clip === undefined) return;
        if (playing) {
          if (!clip.paused) return;
          clip.preload = "auto";
          void clip.play().catch(() => undefined);
        } else if (!clip.paused) {
          clip.pause();
        }
      }

      let viewportH = window.innerHeight;
      let viewportW = document.documentElement.clientWidth;
      let overflow = 0;
      let trackX = 0;
      let trackTarget = 0;
      let idleTimer = 0;
      let lastY = -1;
      let dirty = true;
      let galleryVisible = false;

      function measure(): void {
        viewportH = window.innerHeight;
        viewportW = document.documentElement.clientWidth;
        dirty = true;

        if (gallery !== null && track !== null) {
          const gutter = Math.min(Math.max(20, viewportW * 0.05), 80);

          track.style.paddingLeft = `${String(gutter)}px`;
          track.style.paddingRight = `${String(gutter)}px`;

          // A flex container's scrollWidth excludes its trailing padding, so
          // the right gutter has to be added back or the pan stops short of it
          // and the last figure never reaches the edge.
          overflow = Math.max(0, track.scrollWidth + gutter - viewportW);

          // Pin only for as long as there is track left to pan. A short track
          // — narrow figures on a phone — collapses to no pin at all.
          gallery.style.setProperty(
            "--gallery-height",
            `${String(viewportH + overflow * 1.1)}px`,
          );
        }
      }

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
            clamp01(t / (viewportH * 0.7)).toFixed(4),
          );
        }

        if (gallery !== null && track !== null) {
          const rect = gallery.getBoundingClientRect();
          const travel = gallery.offsetHeight - viewportH;
          const p = travel > 0 ? clamp01(-rect.top / travel) : 0;
          trackTarget = p * overflow;

          trackX =
            Math.abs(trackTarget - trackX) < 0.5
              ? trackTarget
              : trackX + (trackTarget - trackX) * TRACK_LERP;
          track.style.setProperty("--gallery-x", trackX.toFixed(2));
          if (trackX !== trackTarget) dirty = true;

          const visible = rect.bottom > 0 && rect.top < viewportH;
          if (visible) {
            const mid = viewportW / 2;
            pieces.forEach((piece) => {
              const box = piece.getBoundingClientRect();
              const d = (box.left + box.width / 2 - mid) / viewportW;
              piece.style.setProperty("--piece-d", d.toFixed(4));
              piece.style.setProperty(
                "--piece-a",
                Math.min(1, Math.abs(d)).toFixed(4),
              );
              setPlaying(
                piece,
                box.right > -PLAY_MARGIN && box.left < viewportW + PLAY_MARGIN,
              );
            });
          } else if (galleryVisible) {
            pieces.forEach((piece) => {
              setPlaying(piece, false);
            });
          }
          galleryVisible = visible;
        }

        if (session !== null) {
          const rect = session.getBoundingClientRect();
          const p = clamp01(
            (viewportH * 0.75 - rect.top) / (session.offsetHeight * 0.85),
          );
          session.style.setProperty("--session-progress", p.toFixed(4));
        }

        if (cta !== null) {
          const rect = cta.getBoundingClientRect();
          const p = clamp01((viewportH - rect.top) / (viewportH + rect.height));
          cta.style.setProperty("--cta-progress", p.toFixed(4));
        }

        // Set on <html> rather than on the root: the progress bar has to sit
        // outside this stacking context to clear the fixed site header.
        const scrollable =
          document.documentElement.scrollHeight - viewportH || 1;
        document.documentElement.style.setProperty(
          "--page-progress",
          clamp01(window.scrollY / scrollable).toFixed(4),
        );
      }

      function onScroll(): void {
        root?.setAttribute("data-scrolling", "");
        window.clearTimeout(idleTimer);
        idleTimer = window.setTimeout(() => {
          root?.removeAttribute("data-scrolling");
        }, 160);
      }

      // Rings render their true value on the server. Motion zeroes them so the
      // sweep has somewhere to travel from, then the observer plays it back.
      const rings = Array.from(
        root.querySelectorAll<SVGCircleElement>("[data-ring-value]"),
      );
      rings.forEach((ring) => {
        ring.style.strokeDashoffset = String(RING_CIRCUMFERENCE);
      });
      const counters = Array.from(
        root.querySelectorAll<HTMLElement>("[data-ring-number]"),
      );
      counters.forEach((counter) => {
        counter.textContent = "0";
      });

      const countTweens: gsap.core.Tween[] = [];

      function playRings(): void {
        rings.forEach((ring, i) => {
          const value = Number(ring.dataset.value ?? "0");
          window.setTimeout(() => {
            ring.style.strokeDashoffset = String(
              RING_CIRCUMFERENCE * (1 - value / 100),
            );
          }, i * RING_STAGGER_MS);
        });

        counters.forEach((counter, i) => {
          const value = Number(counter.dataset.value ?? "0");
          const state = { n: 0 };
          countTweens.push(
            gsap.to(state, {
              n: value,
              duration: COUNT_MS / 1000,
              delay: (i * RING_STAGGER_MS) / 1000,
              ease: "power3.out",
              onUpdate: () => {
                counter.textContent = String(Math.round(state.n));
              },
            }),
          );
        });
      }

      const revealer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.setAttribute("data-shown", "");
            revealer.unobserve(entry.target);
            if (entry.target.hasAttribute("data-rings")) playRings();
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
      );

      root.querySelectorAll("[data-rv]").forEach((el) => revealer.observe(el));

      const ringsSection = root.querySelector("[data-rings]");
      if (ringsSection !== null && !ringsSection.hasAttribute("data-rv")) {
        revealer.observe(ringsSection);
      }

      const resizeObserver = new ResizeObserver(() => {
        measure();
        update();
      });
      resizeObserver.observe(document.body);

      measure();
      update();
      root.setAttribute("data-motion", "");

      gsap.ticker.add(update);
      window.addEventListener("scroll", onScroll, { passive: true });

      teardown = () => {
        gsap.ticker.remove(update);
        window.removeEventListener("scroll", onScroll);
        window.clearTimeout(idleTimer);
        countTweens.forEach((tween) => {
          tween.kill();
        });
        resizeObserver.disconnect();
        revealer.disconnect();
        root.removeAttribute("data-motion");
        root.removeAttribute("data-scrolling");
        document.documentElement.style.removeProperty("--page-progress");
        gallery?.style.removeProperty("--gallery-height");
        track?.removeAttribute("style");
        clips.forEach((clip) => {
          clip.pause();
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
    <>
      <div className={styles.progress} aria-hidden />
      <div ref={rootRef} className={styles.page}>
        <div className={styles.wash} aria-hidden />
        {children}
      </div>
    </>
  );
}
