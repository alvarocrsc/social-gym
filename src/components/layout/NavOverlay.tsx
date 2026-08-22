"use client";

import { useEffect, useRef, type ReactElement, type ReactNode } from "react";

import { usePathname } from "@/i18n/navigation";

import styles from "./NavOverlay.module.css";

export interface NavOverlayProps {
  children: ReactNode;
}

interface Rgb {
  r: number;
  g: number;
  b: number;
}

function readRgb(value: string): Rgb {
  const hex = value.trim().replace("#", "");
  return {
    r: Number.parseInt(hex.slice(0, 2), 16),
    g: Number.parseInt(hex.slice(2, 4), 16),
    b: Number.parseInt(hex.slice(4, 6), 16),
  };
}

function mixRgb(from: Rgb, to: Rgb, t: number): string {
  const r = Math.round(from.r + (to.r - from.r) * t);
  const g = Math.round(from.g + (to.g - from.g) * t);
  const b = Math.round(from.b + (to.b - from.b) * t);
  return `rgb(${r} ${g} ${b})`;
}

interface ItemParts {
  indexWord: Element[];
  firstChar: Element;
  trailingChars: Element[];
  trailingCharBox: HTMLElement;
  divider: Element;
}

export function NavOverlay({ children }: NavOverlayProps): ReactElement {
  const rootRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<(() => void) | null>(null);
  const lastPathRef = useRef<string | null>(null);
  const pathname = usePathname();

  // Safety net for navigations no click handler sees — browser back/forward,
  // or a redirect. Leaving the menu open would strand the new page with
  // `inert` on <main> and scrolling still locked.
  useEffect(() => {
    if (lastPathRef.current !== null && lastPathRef.current !== pathname) {
      closeRef.current?.();
    }
    lastPathRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    const root = rootRef.current;
    if (root === null) return;

    const menu = root.querySelector<HTMLElement>("[data-menu]");
    const toggle = root.querySelector<HTMLButtonElement>("[data-nav-toggle]");
    const label = root.querySelector<HTMLElement>("[data-nav-toggle-label]");
    if (menu === null || toggle === null || label === null) return;

    const menuBg = menu.querySelector<HTMLElement>("[data-menu-bg]");
    const menuItems = Array.from(
      menu.querySelectorAll<HTMLElement>("[data-menu-item]"),
    );
    const openLabel = label.textContent ?? "";
    const closeLabel = label.dataset.closeLabel ?? openLabel;

    const outside = [
      document.getElementById("contenido"),
      document.querySelector("footer"),
    ].filter((el): el is HTMLElement => el !== null);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let isOpen = false;
    let disposed = false;
    let play: ((open: boolean) => void) | null = null;
    let flicker: ((text: string) => void) | null = null;
    let teardownMotion: (() => void) | null = null;

    function setOpen(next: boolean): void {
      if (next === isOpen || menu === null || toggle === null) return;
      isOpen = next;

      menu.toggleAttribute("inert", !next);
      if (next) menu.setAttribute("data-open", "");
      else menu.removeAttribute("data-open");

      toggle.setAttribute("aria-expanded", String(next));
      document.documentElement.style.overflow = next ? "hidden" : "";
      outside.forEach((el) => el.toggleAttribute("inert", next));

      play?.(next);
      flicker?.(next ? closeLabel : openLabel);
      if (!next) toggle.focus();
    }

    function onToggleClick(): void {
      setOpen(!isOpen);
    }

    function onKeydown(event: KeyboardEvent): void {
      if (event.key === "Escape" && isOpen) setOpen(false);
    }

    function onNavigate(): void {
      setOpen(false);
    }

    closeRef.current = onNavigate;

    async function setupMotion(): Promise<void> {
      const [gsapModule, splitModule] = await Promise.all([
        import("gsap"),
        import("gsap/SplitText"),
      ]);
      if (disposed || menu === null || label === null) return;

      const gsap = gsapModule.gsap;
      const SplitText = splitModule.SplitText;
      gsap.registerPlugin(SplitText);

      await document.fonts.ready;
      if (disposed) return;

      const splits: InstanceType<typeof SplitText>[] = [];

      const rootStyles = getComputedStyle(document.documentElement);
      const ctaStart = readRgb(
        rootStyles.getPropertyValue("--color-cta-start"),
      );
      const ctaEnd = readRgb(rootStyles.getPropertyValue("--color-cta-end"));

      const parts: ItemParts[] = [];
      menuItems.forEach((item) => {
        const index = item.querySelector<HTMLElement>("[data-item-index]");
        const itemLabel = item.querySelector<HTMLElement>("[data-item-label]");
        const divider = item.querySelector<HTMLElement>("[data-item-divider]");
        if (index === null || itemLabel === null || divider === null) return;

        const labelSplit = new SplitText(itemLabel, {
          type: "chars",
          mask: "chars",
        });
        splits.push(labelSplit);
        const chars = labelSplit.chars;
        const [firstChar, ...trailingChars] = chars;
        if (firstChar === undefined) return;

        const trailingCharBox = document.createElement("span");
        trailingCharBox.className = styles.itemBody ?? "";
        trailingChars.forEach((char) => {
          const mask = char.parentElement;
          if (mask !== null) trailingCharBox.appendChild(mask);
        });
        itemLabel.after(trailingCharBox);

        // The arrow rides inside the unfold box so the width tween reveals it
        // with the word rather than leaving it hanging outside.
        const arrow = item.querySelector<HTMLElement>("[data-item-arrow]");
        const trailing: Element[] = [...trailingChars];
        if (arrow !== null) {
          trailingCharBox.appendChild(arrow);
          trailing.push(arrow);
        }

        if (item.hasAttribute("data-menu-cta")) {
          const glyphs = [
            firstChar,
            ...trailingChars,
            ...(arrow ? [arrow] : []),
          ];
          const last = glyphs.length - 1;
          glyphs.forEach((glyph, i) => {
            if (glyph instanceof HTMLElement) {
              glyph.style.color = mixRgb(
                ctaStart,
                ctaEnd,
                last === 0 ? 1 : i / last,
              );
            }
          });
          item.setAttribute("data-split", "");
        }

        const indexSplit = new SplitText(index, {
          type: "words",
          mask: "words",
        });
        splits.push(indexSplit);

        gsap.set([indexSplit.words, firstChar], { yPercent: 100 });
        gsap.set(trailing, { xPercent: 125 });
        gsap.set(trailingCharBox, { width: 0 });

        parts.push({
          indexWord: indexSplit.words,
          firstChar,
          trailingChars: trailing,
          trailingCharBox,
          divider,
        });
      });

      let timeline = buildTimeline();

      function buildTimeline(): gsap.core.Timeline {
        const tl = gsap.timeline({
          paused: true,
          defaults: { ease: "power3.out" },
        });

        if (menuBg !== null) tl.to(menuBg, { opacity: 1, duration: 0.75 }, 0);

        parts.forEach(
          (
            { indexWord, firstChar, trailingChars, trailingCharBox, divider },
            i,
          ) => {
            const startTime = 0.5 + i * 0.15;

            tl.to(
              [indexWord, firstChar],
              { yPercent: 0, duration: 0.75 },
              startTime,
            )
              .to(
                divider,
                { scaleY: 1, duration: 1, ease: "power3.out" },
                startTime + 0.05,
              )
              .to(
                trailingCharBox,
                {
                  width: trailingCharBox.scrollWidth,
                  duration: 1,
                  ease: "power4.inOut",
                },
                startTime + 0.25,
              )
              .to(
                trailingChars,
                { xPercent: 0, duration: 0.75, stagger: 0.05 },
                startTime + 0.5,
              );
          },
        );

        return tl;
      }

      // The unfold tweens to a measured scrollWidth, and the item type is sized
      // in vw — so a resize leaves those targets stale.
      let resizeFrame = 0;
      function onResize(): void {
        if (isOpen) return;
        window.cancelAnimationFrame(resizeFrame);
        resizeFrame = window.requestAnimationFrame(() => {
          timeline.kill();
          timeline = buildTimeline();
        });
      }

      let flickerSplit: InstanceType<typeof SplitText> | null = null;
      flicker = (text) => {
        flickerSplit?.revert();
        label.textContent = text;
        flickerSplit = new SplitText(label, { type: "chars" });
        gsap.fromTo(
          flickerSplit.chars,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.05,
            ease: "power2.inOut",
            overwrite: true,
            stagger: { amount: 0.3, from: "random" },
          },
        );
      };

      play = (open) => {
        if (open) timeline.play();
        else timeline.reverse();
      };

      window.addEventListener("resize", onResize);
      menu.setAttribute("data-ready", "");

      teardownMotion = () => {
        window.cancelAnimationFrame(resizeFrame);
        window.removeEventListener("resize", onResize);
        timeline.kill();
        flickerSplit?.revert();
        splits.forEach((split) => split.revert());
        menu.removeAttribute("data-ready");
      };

      if (isOpen) timeline.progress(1);
    }

    function sync(): void {
      if (reduceMotion.matches) {
        play = null;
        flicker = null;
        teardownMotion?.();
        teardownMotion = null;
        menu?.setAttribute("data-ready", "");
        return;
      }
      if (teardownMotion === null) void setupMotion();
    }

    sync();
    reduceMotion.addEventListener("change", sync);
    toggle.addEventListener("click", onToggleClick);
    document.addEventListener("keydown", onKeydown);
    const navLinks = Array.from(root.querySelectorAll<HTMLAnchorElement>("a"));
    navLinks.forEach((link) => link.addEventListener("click", onNavigate));

    return () => {
      disposed = true;
      reduceMotion.removeEventListener("change", sync);
      toggle.removeEventListener("click", onToggleClick);
      document.removeEventListener("keydown", onKeydown);
      navLinks.forEach((link) => link.removeEventListener("click", onNavigate));
      closeRef.current = null;
      teardownMotion?.();
      document.documentElement.style.overflow = "";
      outside.forEach((el) => el.removeAttribute("inert"));
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.root}>
      {children}
    </div>
  );
}
