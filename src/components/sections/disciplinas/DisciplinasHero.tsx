import Image from "next/image";
import type { ReactElement } from "react";

import { disciplinas } from "@/content/disciplinas";
import { existingImage } from "@/lib/media/public-file";

import styles from "./DisciplinesCarousel.module.css";

const TITLE_ID = "disciplinas-titulo";

export function DisciplinasHero(): ReactElement {
  const photo = existingImage(disciplinas.heroImage);

  return (
    <section className={styles.hero} aria-labelledby={TITLE_ID}>
      <div className={styles.heroMedia} aria-hidden>
        {photo === "" ? (
          <div className={styles.heroFallback} />
        ) : (
          <Image
            className={styles.heroImage}
            src={photo}
            alt=""
            fill
            priority
            sizes="100vw"
          />
        )}
      </div>
      <div className={styles.heroScrim} aria-hidden />
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
