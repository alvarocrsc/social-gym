import type { ReactElement } from "react";

import { membresias } from "@/content/membresias";
import { site } from "@/content/site";

import styles from "./Membresias.module.css";
import { revealDelay } from "./reveal";

const MARQUEE_REPEATS = 4;

export function AppCta(): ReactElement {
  return (
    <section className={styles.cta} data-cta aria-labelledby="la-app">
      <span className={styles.ctaMarquee} data-cta-marquee aria-hidden>
        {Array.from({ length: MARQUEE_REPEATS }, (_, i) => (
          <span key={i}>{`${site.name} /`}</span>
        ))}
      </span>

      <div className={styles.ctaRow}>
        <h2 className={styles.ctaTitle} id="la-app" data-rv>
          <span>{membresias.ctaHeadlineSolid}</span>
          <span className={styles.ctaOutlined}>
            {membresias.ctaHeadlineOutlined}
          </span>
        </h2>

        <div className={styles.ctaAside} data-rv style={revealDelay(120)}>
          <p className={styles.ctaBody}>{membresias.ctaBody}</p>

          <div className={styles.storeRow}>
            <a
              className={styles.storeBadge}
              href={site.app.appStore}
              target="_blank"
              rel="noopener"
            >
              <span className={styles.storeBadgeKicker}>
                {membresias.appStoreKicker}
              </span>
              <span className={styles.storeBadgeName}>App Store</span>
            </a>
            <a
              className={styles.storeBadge}
              href={site.app.googlePlay}
              target="_blank"
              rel="noopener"
            >
              <span className={styles.storeBadgeKicker}>
                {membresias.googlePlayKicker}
              </span>
              <span className={styles.storeBadgeName}>Google Play</span>
            </a>
          </div>

          <a className={styles.ctaAction} href="#planes">
            {`${membresias.ctaAction} →`}
          </a>
        </div>
      </div>
    </section>
  );
}
