"use client";

import { useEffect, useRef, type ReactElement, type ReactNode } from "react";

import styles from "./DisciplinesCarousel.module.css";

const LERP = 0.085;
const VEL_LERP = 0.2;
const GHOST_RATIO = 0.42;
const GHOST_LEAD = 60;
const FOCUS_ENTER = 0.18;

export interface CarouselMotionProps {
  names: readonly string[];
  children: ReactNode;
}

interface CardView {
  el: HTMLElement;
  media: HTMLElement | null;
  ring: HTMLElement | null;
  copy: HTMLElement | null;
  video: HTMLVideoElement | null;
  rings: HTMLElement[];
  numbers: HTMLElement[];
  focused: boolean;
  revealed: boolean;
}

const clamp = (v: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, v));

export function CarouselMotion({
  names,
  children,
}: CarouselMotionProps): ReactElement {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (root === null) return;

    const section = root.querySelector<HTMLElement>("[data-carousel]");
    const track = root.querySelector<HTMLElement>("[data-track]");
    const ghost = root.querySelector<HTMLElement>("[data-ghost]");
    const bar = root.querySelector<HTMLElement>("[data-bar]");
    const idx = root.querySelector<HTMLElement>("[data-index]");
    const nameEl = root.querySelector<HTMLElement>("[data-name]");
    if (section === null || track === null) return;

    const cards: CardView[] = Array.from(
      track.querySelectorAll<HTMLElement>("[data-card], [data-cta-card]"),
    ).map((el) => ({
      el,
      media: el.querySelector<HTMLElement>("[data-card-media]"),
      ring: el.querySelector<HTMLElement>("[data-card-ring]"),
      copy: el.querySelector<HTMLElement>("[data-card-copy]"),
      video: el.querySelector<HTMLVideoElement>("[data-card-video]"),
      rings: Array.from(el.querySelectorAll<HTMLElement>("[data-ring-value]")),
      numbers: Array.from(
        el.querySelectorAll<HTMLElement>("[data-ring-number]"),
      ),
      focused: false,
      revealed: false,
    }));
    if (cards.length === 0) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let cur = 0;
    let tgt = 0;
    let vel = 0;
    let lastX = 0;
    let max = 0;
    let prog = 0;
    let active = -1;
    let running = false;
    let disposed = false;
    let gsapLib: typeof import("gsap").gsap | null = null;
    let tick: (() => void) | null = null;
    let entrance: IntersectionObserver | null = null;

    function compute(): void {
      if (section === null || track === null) return;
      const first = cards[0];
      const last = cards[cards.length - 1];
      if (first && last) {
        track.style.paddingLeft = `${String(Math.max(0, (window.innerWidth - first.el.offsetWidth) / 2))}px`;
        track.style.paddingRight = `${String(Math.max(0, (window.innerWidth - last.el.offsetWidth) / 2))}px`;
      }
      const span = section.offsetHeight - window.innerHeight;
      const top = section.getBoundingClientRect().top;
      prog = span > 0 ? clamp(-top / span, 0, 1) : 0;
      max = Math.max(0, track.scrollWidth - window.innerWidth);
      tgt = prog * max;
    }

    function resetRings(): void {
      if (gsapLib === null) return;
      cards.forEach((card) => {
        card.revealed = false;
        card.rings.forEach((ring) => {
          const circumference = Number(
            ring.getAttribute("stroke-dasharray") ?? "0",
          );
          ring.style.strokeDashoffset = String(circumference);
        });
        card.numbers.forEach((el) => {
          el.textContent = "0";
        });
      });
    }

    function revealRings(card: CardView): void {
      if (card.revealed || gsapLib === null) return;
      card.revealed = true;
      const gsap = gsapLib;

      card.rings.forEach((ring, i) => {
        const value = Number(ring.dataset.value ?? "0");
        const circumference = Number(
          ring.getAttribute("stroke-dasharray") ?? "0",
        );
        gsap.fromTo(
          ring,
          { strokeDashoffset: circumference },
          {
            strokeDashoffset: circumference * (1 - value / 100),
            duration: 1.15,
            ease: "power3.out",
            delay: i * 0.08,
          },
        );
      });

      card.numbers.forEach((el, i) => {
        const value = Number(el.dataset.value ?? "0");
        const counter = { n: 0 };
        gsap.to(counter, {
          n: value,
          duration: 1.15,
          ease: "power3.out",
          delay: i * 0.08,
          onUpdate: () => {
            el.textContent = String(Math.round(counter.n));
          },
        });
      });
    }

    function paint(): void {
      if (track === null) return;
      cur += (tgt - cur) * LERP;
      vel += (cur - lastX - vel) * VEL_LERP;
      lastX = cur;
      const skew = clamp(vel * 0.1, -4, 4);

      track.style.transform = `translate3d(${String(-cur)}px,0,0)`;
      if (ghost !== null) {
        ghost.style.transform = `translateY(-50%) translate3d(${String(-(cur * GHOST_RATIO + GHOST_LEAD))}px,0,0)`;
      }

      const vw = window.innerWidth;
      const mid = vw / 2;
      let best = 0;
      let bestD = Infinity;

      cards.forEach((card, i) => {
        const b = card.el.getBoundingClientRect();
        const d = (b.left + b.width / 2 - mid) / vw;
        const a = Math.min(1, Math.abs(d));
        const near = 1 - Math.min(1, a / 0.75);
        if (a < bestD) {
          bestD = a;
          best = i;
        }

        card.el.style.transform =
          `perspective(1600px) translate3d(0,${String(a * 26)}px,0) ` +
          `scale(${String(1 - a * 0.11)}) rotateY(${String(-d * 7)}deg) ` +
          `skewY(${String(skew * 0.25)}deg)`;
        card.el.style.opacity = String(1 - a * 0.5);
        card.el.style.filter = `brightness(${String(1 - a * 0.32)}) saturate(${String(1 - a * 0.4)})`;

        if (card.media !== null) {
          card.media.style.transform = `translate3d(${String(d * -70)}px,0,0) scale(${String(1.02 + near * 0.05)})`;
        }
        if (card.ring !== null) card.ring.style.opacity = String(near * near);
        if (card.copy !== null) {
          card.copy.style.transform = `translate3d(0,${String((1 - near) * 34)}px,0)`;
          card.copy.style.opacity = String(0.15 + near * 0.85);
        }

        const focused = a < FOCUS_ENTER;
        if (focused !== card.focused) {
          card.focused = focused;
          if (focused) {
            revealRings(card);
            if (card.video !== null) {
              card.video.preload = "auto";
              void card.video.play().catch(() => undefined);
            }
          } else if (card.video !== null) {
            card.video.pause();
          }
        }
      });

      if (bar !== null) bar.style.width = `${(prog * 100).toFixed(1)}%`;
      if (idx !== null) idx.textContent = String(best + 1).padStart(2, "0");
      if (nameEl !== null && best !== active) {
        const label = names[best];
        if (label !== undefined) nameEl.textContent = label;
      }
      active = best;
    }

    function onScroll(): void {
      compute();
    }

    async function enable(): Promise<void> {
      if (running) return;
      running = true;
      const mod = await import("gsap");
      if (disposed) return;
      gsapLib = mod.gsap;

      tick = paint;
      resetRings();
      compute();
      gsapLib.ticker.add(tick);
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);

      const shells = Array.from(
        root?.querySelectorAll<HTMLElement>("[data-card-shell]") ?? [],
      );
      const stage = root?.querySelector<HTMLElement>("[data-stage]") ?? null;
      if (shells.length > 0 && stage !== null) {
        const gsap = gsapLib;
        gsap.set(shells, { opacity: 0, yPercent: 12 });
        entrance = new IntersectionObserver(
          (entries) => {
            const entry = entries[0];
            if (entry === undefined || !entry.isIntersecting) return;
            entrance?.disconnect();
            entrance = null;
            gsap.to(shells, {
              opacity: 1,
              yPercent: 0,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.075,
            });
          },
          { threshold: 0.55 },
        );
        entrance.observe(stage);
      }
    }

    function disable(): void {
      if (!running || track === null) return;
      running = false;
      if (gsapLib !== null && tick !== null) gsapLib.ticker.remove(tick);
      tick = null;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);

      track.style.transform = "";
      track.style.paddingLeft = "";
      track.style.paddingRight = "";
      if (ghost !== null) ghost.style.transform = "";
      entrance?.disconnect();
      entrance = null;
      root
        ?.querySelectorAll<HTMLElement>("[data-card-shell]")
        .forEach((shell) => {
          shell.style.opacity = "";
          shell.style.transform = "";
        });
      cards.forEach((card) => {
        card.el.style.transform = "";
        card.el.style.opacity = "";
        card.el.style.filter = "";
        card.media?.style.removeProperty("transform");
        card.ring?.style.removeProperty("opacity");
        if (card.copy !== null) {
          card.copy.style.transform = "";
          card.copy.style.opacity = "";
        }
        card.video?.pause();
      });
    }

    function sync(): void {
      if (reduceMotion.matches) disable();
      else void enable();
    }

    sync();
    reduceMotion.addEventListener("change", sync);

    return () => {
      disposed = true;
      reduceMotion.removeEventListener("change", sync);
      disable();
    };
  }, [names]);

  return (
    <div ref={rootRef} className={styles.motionRoot}>
      {children}
    </div>
  );
}
