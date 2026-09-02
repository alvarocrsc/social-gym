import type { ReactElement } from "react";

import { membresias } from "@/content/membresias";

import styles from "./Membresias.module.css";

export function MembresiasHero(): ReactElement {
  return (
    <section className={styles.hero} data-hero>
      <div className={styles.heroMedia} data-hero-media aria-hidden>
        <div className={styles.heroFallback} />
      </div>
      <div className={styles.heroScrim} aria-hidden />

      <div data-hero-copy className={styles.heroCopy}>
        <span className={styles.eyebrow}>{membresias.eyebrow}</span>

        <h1 className={styles.heroTitle}>
          <span>{membresias.headlineSolid}</span>
          <span className={styles.heroOutlined}>
            {membresias.headlineOutlined}
          </span>
          <span className={styles.heroKeyword}>{membresias.keywordLine}</span>
        </h1>

        <div className={styles.heroRow}>
          <p className={styles.heroLead}>{membresias.lead}</p>
          <a className={styles.heroAction} href="#planes">
            {membresias.heroAction}
            <span className={styles.heroActionGlyph} aria-hidden>
              ↓
            </span>
          </a>
        </div>

        <div className={styles.heroRule} aria-hidden />
      </div>
    </section>
  );
}
