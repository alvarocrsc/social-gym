"use client";

import { useEffect, useRef, type ReactElement, type ReactNode } from "react";

import { scrollToElement } from "@/lib/motion/scroll-lock";

import styles from "./Membresias.module.css";

export interface MembresiasMotionProps {
  children: ReactNode;
  shopUrl: string;
}

const COUNT_MS = 1400;
const COUNT_STAGGER_MS = 120;
const GLOW_RADIUS = 210;

function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}

/**
 * `'use client'` — scroll-linked writes, pointer tracking and the webshop
 * frame all need the DOM. Children stay server-rendered and are only ever read
 * here, so every price and every word is in the server HTML.
 */
export function MembresiasMotion({
  children,
  shopUrl,
}: MembresiasMotionProps): ReactElement {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (root === null) return;

    const frame = root.querySelector<HTMLElement>("[data-store-frame]");
    const iframe = root.querySelector<HTMLIFrameElement>("[data-store-iframe]");
    const reset = root.querySelector<HTMLButtonElement>("[data-store-reset]");
    const external = root.querySelector<HTMLAnchorElement>(
      "[data-store-external]",
    );
    const store = root.querySelector<HTMLElement>("#tienda");
    const shopLinks = Array.from(
      root.querySelectorAll<HTMLAnchorElement>("[data-plan-shop]"),
    );

    function headerOffset(): number {
      const raw = getComputedStyle(document.documentElement).getPropertyValue(
        "--header-height",
      );
      return -(Number.parseFloat(raw) || 72) - 16;
    }

    function showProduct(url: string, external_: string): void {
      if (iframe === null || frame === null) return;
      // `scrolling` stays "no" on both views. The product page is taller than
      // the shop index, so it swaps to --size-embed-product instead; that token
      // has to stay above the tallest product page or the Checkout button ends
      // up clipped and unreachable.
      iframe.setAttribute("loading", "eager");
      iframe.src = url;
      frame.toggleAttribute("data-product", url !== shopUrl);
      if (reset !== null) reset.hidden = url === shopUrl;
      if (external !== null) external.href = external_;
    }

    function onShopClick(event: MouseEvent): void {
      if (
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.button !== 0
      )
        return;
      const link = event.currentTarget as HTMLAnchorElement;
      event.preventDefault();
      showProduct(link.href, link.href);
      if (store !== null) scrollToElement(store, headerOffset());
    }

    function onReset(): void {
      showProduct(shopUrl, shopUrl);
    }

    shopLinks.forEach((link) => {
      link.addEventListener("click", onShopClick);
    });
    reset?.addEventListener("click", onReset);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let teardown: (() => void) | null = null;

    async function activate(): Promise<void> {
      const { gsap } = await import("gsap");
      if (disposed || root === null) return;

      const hero = root.querySelector<HTMLElement>("[data-hero]");
      const cta = root.querySelector<HTMLElement>("[data-cta]");
      const plansSection = root.querySelector<HTMLElement>("[data-plans]");
      const cards = Array.from(
        root.querySelectorAll<HTMLElement>("[data-plan]"),
      );
      const prices = Array.from(
        root.querySelectorAll<HTMLElement>("[data-plan-price]"),
      );

      let viewportH = window.innerHeight;
      let lastY = -1;
      let dirty = true;
      let idleTimer = 0;

      prices.forEach((price) => {
        price.textContent = "0";
      });

      function measure(): void {
        viewportH = window.innerHeight;
        dirty = true;
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
            clamp01(t / (viewportH * 0.75)).toFixed(4),
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

        const scrollable =
          document.documentElement.scrollHeight - viewportH || 1;
        document.documentElement.style.setProperty(
          "--page-progress",
          clamp01(scrollY / scrollable).toFixed(4),
        );
      }

      function onScroll(): void {
        root?.setAttribute("data-scrolling", "");
        window.clearTimeout(idleTimer);
        idleTimer = window.setTimeout(() => {
          root?.removeAttribute("data-scrolling");
        }, 160);
      }

      const countTweens: gsap.core.Tween[] = [];

      function runPrices(): void {
        prices.forEach((price, i) => {
          const value = Number(price.dataset.value ?? "0");
          const state = { n: 0 };
          countTweens.push(
            gsap.to(state, {
              n: value,
              duration: COUNT_MS / 1000,
              delay: (i * COUNT_STAGGER_MS) / 1000,
              ease: "power3.out",
              onUpdate: () => {
                price.textContent = String(Math.round(state.n));
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
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
      );
      root.querySelectorAll("[data-rv]").forEach((el) => revealer.observe(el));

      const priceObserver = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          runPrices();
          priceObserver.disconnect();
        },
        { threshold: 0.25 },
      );
      if (plansSection !== null) priceObserver.observe(plansSection);

      const glowHandlers: Array<
        [HTMLElement, (e: PointerEvent) => void, () => void]
      > = [];
      cards.forEach((card) => {
        const glow = card.querySelector<HTMLElement>("[data-plan-glow]");
        if (glow === null) return;
        const move = (event: PointerEvent): void => {
          if (event.pointerType !== "mouse") return;
          const box = card.getBoundingClientRect();
          glow.style.setProperty(
            "--glow-x",
            String(event.clientX - box.left - GLOW_RADIUS),
          );
          glow.style.setProperty(
            "--glow-y",
            String(event.clientY - box.top - GLOW_RADIUS),
          );
          glow.style.opacity = "1";
        };
        const leave = (): void => {
          glow.style.opacity = "0";
        };
        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", leave);
        glowHandlers.push([card, move, leave]);
      });

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
        glowHandlers.forEach(([card, move, leave]) => {
          card.removeEventListener("pointermove", move);
          card.removeEventListener("pointerleave", leave);
        });
        resizeObserver.disconnect();
        revealer.disconnect();
        priceObserver.disconnect();
        root.removeAttribute("data-motion");
        root.removeAttribute("data-scrolling");
        document.documentElement.style.removeProperty("--page-progress");
        prices.forEach((price) => {
          price.textContent = price.dataset.value ?? "";
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
      shopLinks.forEach((link) => {
        link.removeEventListener("click", onShopClick);
      });
      reset?.removeEventListener("click", onReset);
      teardown?.();
    };
  }, [shopUrl]);

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
