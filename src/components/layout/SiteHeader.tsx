import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { ReactElement } from "react";

import { headerNav, menuCta, menuNav } from "@/content/nav";
import { site } from "@/content/site";
import { Link } from "@/i18n/navigation";

import { NavOverlay } from "./NavOverlay";
import styles from "./NavOverlay.module.css";

const MENU_ID = "menu-principal";

/**
 * Fixed site header plus the full-screen menu it opens.
 *
 * Both are server-rendered — `NavOverlay` only wraps this markup and drives it
 * imperatively, so every menu link sits in the HTML whether the menu is open or
 * not, and GSAP's SplitText can rewrite the DOM without React reconciling it.
 *
 * `fixed` rather than `sticky`: sticky would take layout space and push the
 * full-bleed hero down. `<main>` clears the bar with `--header-height` and the
 * hero cancels that with a negative margin.
 */
export async function SiteHeader(): Promise<ReactElement> {
  const t = await getTranslations("Nav");

  return (
    <NavOverlay>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40">
        <nav
          aria-label={t("label")}
          className="pointer-events-auto relative z-20 mx-auto mt-3 flex min-h-[var(--header-height)] w-[var(--container-page)] items-center justify-between gap-4 rounded-full bg-surface-raised px-4 md:mt-0 md:rounded-t-none md:rounded-b-md md:px-8"
        >
          <Link
            href="/"
            className="flex items-center gap-3 rounded-sm text-ink md:gap-4"
          >
            <Image
              src="/white-logo.png"
              alt=""
              aria-hidden
              width={52}
              height={52}
              sizes="52px"
              loading="eager"
              className="size-9 md:size-13"
            />
            <span className="text-body leading-display font-semibold md:font-display md:text-heading md:tracking-display md:uppercase">
              {site.name}
            </span>
          </Link>

          <div className="flex items-center gap-2 md:gap-8">
            {headerNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hidden bg-linear-to-r from-cta-start to-cta-end bg-clip-text font-nav text-subheading font-bold text-transparent md:block"
              >
                {item.label}
              </Link>
            ))}

            <button
              type="button"
              data-nav-toggle
              aria-expanded="false"
              aria-controls={MENU_ID}
              className="inline-flex size-11 items-center justify-center gap-3 rounded-sm text-ink md:w-auto md:px-2"
            >
              {/* Kept in the DOM at every width so the accessible name is
                  always the visible label — no aria-label that could drift. */}
              <span
                data-nav-toggle-label
                data-close-label={t("closeShort")}
                className="sr-only font-nav text-subheading font-bold md:not-sr-only"
              >
                {t("menu")}
              </span>
              <span aria-hidden className="flex w-6 flex-col gap-1.5">
                <span className="h-0.5 w-full rounded-full bg-current" />
                <span className="h-0.5 w-full rounded-full bg-current" />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <nav
        id={MENU_ID}
        aria-label={t("menu")}
        data-menu
        inert
        className={styles.menu}
      >
        <div data-menu-bg className={styles.menuBg} />

        {menuNav.map((item, index) => {
          const isCta = item.href === menuCta.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              data-menu-item
              data-menu-cta={isCta ? "" : undefined}
              className={`${styles.menuItem} ${index % 2 === 1 ? styles.sans : ""} ${isCta ? styles.menuCta : ""}`}
            >
              <span data-item-index className={styles.itemIndex}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span data-item-label>{item.label}</span>
              {isCta ? (
                <span data-item-arrow aria-hidden className={styles.itemArrow}>
                  →
                </span>
              ) : null}
              <span
                data-item-divider
                aria-hidden
                className={styles.itemDivider}
              />
            </Link>
          );
        })}
      </nav>
    </NavOverlay>
  );
}
