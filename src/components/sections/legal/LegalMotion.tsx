"use client";

import { useEffect, useRef, type ReactElement, type ReactNode } from "react";

import styles from "./Legal.module.css";

export interface LegalMotionProps {
  children: ReactNode;
}

export function LegalMotion({ children }: LegalMotionProps): ReactElement {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (root === null) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const viewportH = window.innerHeight;

    const links = new Map<string, HTMLAnchorElement>();
    root
      .querySelectorAll<HTMLAnchorElement>("[data-index-link]")
      .forEach((link) => {
        const id = link.getAttribute("data-index-link");
        if (id !== null) links.set(id, link);
      });

    const visible = new Set<string>();
    const sections = Array.from(
      root.querySelectorAll<HTMLElement>("[data-section]"),
    );

    function paint(): void {
      let current: string | null = null;
      for (const section of sections) {
        const id = section.id;
        if (visible.has(id)) {
          current = id;
          break;
        }
      }
      links.forEach((link, id) => {
        link.toggleAttribute("data-current", id === current);
      });
    }

    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });
        paint();
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );
    sections.forEach((section) => {
      spy.observe(section);
    });

    let revealer: IntersectionObserver | null = null;

    if (!reduceMotion.matches) {
      revealer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.setAttribute("data-shown", "");
            revealer?.unobserve(entry.target);
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -5% 0px" },
      );
      root.querySelectorAll<HTMLElement>("[data-rv]").forEach((element) => {
        if (element.getBoundingClientRect().top < viewportH) {
          element.setAttribute("data-shown", "");
        }
        revealer?.observe(element);
      });
      root.setAttribute("data-motion", "");
    }

    return () => {
      spy.disconnect();
      revealer?.disconnect();
      root.removeAttribute("data-motion");
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.page}>
      <div className={styles.wash} aria-hidden />
      {children}
    </div>
  );
}
