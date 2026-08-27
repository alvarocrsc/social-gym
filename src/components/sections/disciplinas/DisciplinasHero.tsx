import type { ReactElement } from "react";

import { disciplinas } from "@/content/disciplinas";

import styles from "./DisciplinesCarousel.module.css";

const TITLE_ID = "disciplinas-titulo";

export function DisciplinasHero(): ReactElement {
  return (
    <section className={styles.hero} aria-labelledby={TITLE_ID}>
      <h1 id={TITLE_ID} className={styles.heroTitle}>
        <span className={styles.heroEyebrow}>{disciplinas.eyebrow}</span>
        <span className={styles.heroSolid}>{disciplinas.headlineSolid}</span>
        <span className={styles.heroOutlined}>
          {disciplinas.headlineOutlined}
        </span>
      </h1>

      <div className={styles.heroFoot}>
        <p className={styles.heroLead}>{disciplinas.lead}</p>
        <p className={styles.heroHint} aria-hidden>
          {disciplinas.scrollHint}
          <span className={styles.heroHintArrow}>→</span>
        </p>
      </div>

      <div className={styles.heroRule} aria-hidden />
    </section>
  );
}
