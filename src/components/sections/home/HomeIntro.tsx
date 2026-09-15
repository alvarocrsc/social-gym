import Image from "next/image";
import type { ReactElement } from "react";

import { home } from "@/content/home";

import styles from "./Home.module.css";
import { revealDelay } from "./reveal";
import { resolveSlot } from "./slot";

const TITLE_ID = "el-centro";

export function HomeIntro(): ReactElement {
  const { intro } = home;
  const image = resolveSlot(intro.image);

  return (
    <section className={styles.intro} aria-labelledby={TITLE_ID}>
      <div className={styles.introHead}>
        <span className={styles.eyebrow} data-rv>
          {intro.eyebrow}
        </span>
        <h2 className={styles.title} id={TITLE_ID}>
          <span className={styles.titleLine} data-rv-line>
            <span>{intro.headingSolid}</span>
          </span>
          <span
            className={`${styles.titleLine} ${styles.titleOutlined} ${styles.titleShift}`}
            data-rv-line
            style={revealDelay(140)}
          >
            <span>{intro.headingOutlined}</span>
          </span>
        </h2>
      </div>

      <div className={styles.introBody}>
        <p className={styles.lead} data-rv style={revealDelay(120)}>
          {intro.lead}
        </p>
        <dl className={styles.facts}>
          {intro.facts.map((fact, index) => (
            <div
              key={fact.label}
              className={styles.fact}
              data-rv
              style={revealDelay(index * 110)}
            >
              <dt className={styles.factLabel}>{fact.label}</dt>
              <dd className={styles.factValue} data-count={fact.count}>
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {image === null ? null : (
        <div className={styles.introMedia} data-parallax data-rv>
          <div className={styles.introFrame}>
            <Image
              className={styles.introImage}
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 90rem) 1400px, 100vw"
            />
            <div className={styles.introTags} aria-hidden>
              <span>{intro.place}</span>
              <span>{intro.coordinates}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
