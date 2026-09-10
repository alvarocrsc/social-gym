import Image from "next/image";
import type { ReactElement } from "react";

import { horarios } from "@/content/horarios";
import { site } from "@/content/site";
import { Link } from "@/i18n/navigation";

import styles from "./Horarios.module.css";
import { revealDelay } from "./reveal";

const MARQUEE_REPEATS = 4;

export function HorariosCta(): ReactElement {
  // `site.ts` is `as const`, so the paths are literal types and an
  // empty-string check against them would not compile.
  const icon: { appStore: string; googlePlay: string } = site.app.icon;

  return (
    <section className={styles.cta} data-cta aria-labelledby="reserva-app">
      <span className={styles.ctaMarquee} data-cta-marquee aria-hidden>
        {Array.from({ length: MARQUEE_REPEATS }, (_, i) => (
          <span key={i}>06:00 / 01:00 /</span>
        ))}
      </span>

      <div className={styles.ctaRow}>
        <h2 className={styles.ctaTitle} id="reserva-app" data-rv>
          <span>{horarios.ctaHeadlineSolid}</span>
          <span className={styles.ctaOutlined}>
            {horarios.ctaHeadlineOutlined}
          </span>
        </h2>

        <div className={styles.ctaAside} data-rv style={revealDelay(120)}>
          <p className={styles.ctaBody}>{horarios.ctaBody}</p>

          <div className={styles.storeRow}>
            <a
              className={styles.storeBadge}
              href={site.app.appStore}
              target="_blank"
              rel="noopener"
            >
              {icon.appStore === "" ? null : (
                <Image
                  className={styles.storeBadgeIcon}
                  src={icon.appStore}
                  alt=""
                  width={24}
                  height={24}
                />
              )}
              <span className={styles.storeBadgeText}>
                <span className={styles.storeBadgeKicker}>
                  {horarios.appStoreKicker}
                </span>
                <span className={styles.storeBadgeName}>App Store</span>
              </span>
            </a>
            <a
              className={styles.storeBadge}
              href={site.app.googlePlay}
              target="_blank"
              rel="noopener"
            >
              {icon.googlePlay === "" ? null : (
                <Image
                  className={styles.storeBadgeIcon}
                  src={icon.googlePlay}
                  alt=""
                  width={24}
                  height={24}
                />
              )}
              <span className={styles.storeBadgeText}>
                <span className={styles.storeBadgeKicker}>
                  {horarios.googlePlayKicker}
                </span>
                <span className={styles.storeBadgeName}>Google Play</span>
              </span>
            </a>
          </div>

          <Link className={styles.ctaAction} href="/membresias">
            {`${horarios.ctaAction} →`}
          </Link>
        </div>
      </div>
    </section>
  );
}
