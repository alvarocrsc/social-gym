"use client"; 

import { useEffect, useRef, type ReactElement, type ReactNode } from "react";

import styles from "./Hero.module.css";

const settings = {
  smoothness: 0.05,
  bufferSlides: 1,
  imageShift: 25,
  copyShift: 15,
  titleHold: 0.1,
  revealOverlap: 0.5,
} as const;

const EPSILON = 0.0005;

interface SlideView {
  el: HTMLElement;
  videos: HTMLVideoElement[];
  near: boolean;
  playing: boolean;
}

function isRendered(el: HTMLElement): boolean {
  return el.offsetParent !== null;
}

export interface HeroSliderProps {
  slideCount: number;
  children: ReactNode;
}

function getTitlePosition(slideProgress: number): number {
  const fromCenter = slideProgress - 1;
  const past = Math.abs(fromCenter) - settings.titleHold;
  if (past <= 0) return 1;
  const t = past / (1 - settings.titleHold);
  return 1 + Math.sign(fromCenter) * t * t * (3 - 2 * t);
}

export function HeroSlider({
  slideCount,
  children,
}: HeroSliderProps): ReactElement {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (root === null) return;

    const track = root.querySelector<HTMLElement>("[data-pin]");
    const slides = Array.from(
      root.querySelectorAll<HTMLElement>("[data-slide]"),
    );
    if (track === null || slides.length === 0) return;

    const items: SlideView[] = slides.map((el) => ({
      el,
      videos: Array.from(el.querySelectorAll<HTMLVideoElement>("[data-video]")),
      near: false,
      playing: false,
    }));

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let frame = 0;
    let position = 1;
    let target = 1;
    let running = false;
    let onScreen = true;

    function setPlaying(item: SlideView, next: boolean): void {
      if (item.videos.length === 0 || item.playing === next) return;
      item.playing = next;
      item.videos.forEach((video) => {
        if (!next) {
          video.pause();
          return;
        }
        if (isRendered(video)) void video.play().catch(() => undefined);
      });
    }

    function readTarget(): number {
      if (track === null) return 1;
      const distance = track.offsetHeight - window.innerHeight;
      if (distance <= 0) return 1;
      const progress = -track.getBoundingClientRect().top / distance;
      return 1 + Math.min(1, Math.max(0, progress)) * (slideCount - 1);
    }

    function apply(): void {
      const first = Math.floor(position) - 1 - settings.bufferSlides;
      const last = Math.floor(position) + settings.bufferSlides;

      const depths = items.map(
        (_, index) =>
          Math.max(0, Math.min(1, position - index)) *
          (100 + settings.revealOverlap),
      );

      items.forEach((item, index) => {
        const slide = item.el;
        const revealAmount = position - index;
        const d = depths[index] ?? 0;
        const slideProgress = Math.max(0, Math.min(2, revealAmount));
        const covered = (depths[index + 1] ?? 0) >= 100;
        const visible = d > 0 && !covered;

        slide.style.setProperty("--d", String(d));
        slide.style.setProperty(
          "--drift-img",
          String((1 - slideProgress) * settings.imageShift),
        );
        slide.style.setProperty(
          "--drift-copy",
          String((1 - getTitlePosition(slideProgress)) * settings.copyShift),
        );

        const near = index >= first && index <= last;
        if (near !== item.near) {
          item.near = near;
          if (near) {
            slide.setAttribute("data-near", "");
            item.videos.forEach((video) => {
              if (isRendered(video)) video.preload = "auto";
            });
          } else {
            slide.removeAttribute("data-near");
          }
        }

        setPlaying(item, onScreen && visible);
      });
    }

    function stop(): void {
      if (frame !== 0) cancelAnimationFrame(frame);
      frame = 0;
      root?.removeAttribute("data-animating");
    }

    function tick(): void {
      position += (target - position) * settings.smoothness;

      if (Math.abs(target - position) < EPSILON) {
        position = target;
        apply();
        stop();
        return;
      }

      apply();
      frame = requestAnimationFrame(tick);
    }

    function start(): void {
      if (frame !== 0 || root === null) return;
      root.setAttribute("data-animating", "");
      frame = requestAnimationFrame(tick);
    }

    function onScroll(): void {
      const next = readTarget();
      if (next === target) return;
      target = next;
      start();
    }

    const resizeObserver = new ResizeObserver(onScroll);
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry === undefined) return;
        onScreen = entry.isIntersecting;
        apply();
      },
      { threshold: 0 },
    );

    function enable(): void {
      if (running || root === null) return;
      running = true;

      target = readTarget();
      position = target;
      apply();
      root.setAttribute("data-motion", "on");

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      resizeObserver.observe(track as HTMLElement);
      visibilityObserver.observe(track as HTMLElement);
    }

    function disable(): void {
      if (!running || root === null) return;
      running = false;

      stop();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();

      root.removeAttribute("data-motion");
      items.forEach((item) => {
        setPlaying(item, false);
        item.near = false;
        item.el.style.removeProperty("--d");
        item.el.style.removeProperty("--drift-img");
        item.el.style.removeProperty("--drift-copy");
        item.el.removeAttribute("data-near");
      });
    }

    function sync(): void {
      if (reduceMotion.matches) disable();
      else enable();
    }

    sync();
    reduceMotion.addEventListener("change", sync);

    return () => {
      reduceMotion.removeEventListener("change", sync);
      disable();
    };
  }, [slideCount]);

  return (
    <div ref={rootRef} className={styles.root}>
      {children}
    </div>
  );
}
