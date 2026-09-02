import type { ReactElement } from "react";

import { membresias } from "@/content/membresias";

import styles from "./Membresias.module.css";

const GROUPS = [0, 1];

export function BenefitsTicker(): ReactElement {
  return (
    <section className={styles.ticker} aria-label={membresias.plansMeta}>
      <div className={styles.tickerTrack}>
        {GROUPS.map((group) => (
          <div
            key={group}
            className={styles.tickerGroup}
            aria-hidden={group === 1}
          >
            {membresias.tickerItems.map((item) => (
              <span key={item} className={styles.tickerItem}>
                {item}
                <span className={styles.tickerSlash} aria-hidden>
                  {" /"}
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
