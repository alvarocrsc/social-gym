import Image from "next/image";
import type { ReactElement } from "react";

import { horarios } from "@/content/horarios";
import { existingImage } from "@/lib/media/public-file";

import styles from "./Horarios.module.css";

export function HorariosHero(): ReactElement {
  const photo = existingImage(horarios.heroImage);

  return (
    <section className={styles.hero} data-hero>
      <div className={styles.heroMedia} data-hero-media aria-hidden>
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
      <div className={styles.heroCopy} data-hero-copy>
        <span className={styles.eyebrow}>{horarios.eyebrow}</span>

        <h1 className={styles.heroTitle}>
          <span>{horarios.headlineSolid}</span>
          <span className={styles.heroOutlined}>
            {horarios.headlineOutlined}
          </span>
          <span className={styles.heroKeyword}>{horarios.keywordLine}</span>
        </h1>

        <div className={styles.heroRow}>
          <p className={styles.heroLead}>{horarios.lead}</p>
          <a className={styles.heroAction} href={`#${horarios.weekAnchor}`}>
            {horarios.heroAction}
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
