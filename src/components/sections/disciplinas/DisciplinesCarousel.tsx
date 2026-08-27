import type { CSSProperties, ReactElement } from "react";

import { disciplinas } from "@/content/disciplinas";
import { disciplines } from "@/content/disciplines";
import { Link } from "@/i18n/navigation";

import { CarouselMotion } from "./CarouselMotion";
import { DisciplineCard } from "./DisciplineCard";
import styles from "./DisciplinesCarousel.module.css";

const CARD_COUNT = disciplines.length + 1;

export function DisciplinesCarousel(): ReactElement {
  const names = [
    ...disciplines.map((d) => d.name),
    disciplinas.cta.action,
  ] as const;

  const trackStyle = { "--card-count": CARD_COUNT } as CSSProperties;

  return (
    <CarouselMotion names={names}>
      <section
        id="disciplinas"
        className={styles.section}
        style={trackStyle}
        data-carousel
      >
        <div className={styles.stage} data-stage>
          <div className={styles.ghost} data-ghost aria-hidden>
            {`${names.join("  /  ")}  /  `}
          </div>

          <div className={styles.viewport}>
            <div className={styles.track} data-track>
              {disciplines.map((discipline, index) => (
                <div
                  key={discipline.slug}
                  className={styles.cardShell}
                  data-card-shell
                >
                  <DisciplineCard
                    discipline={discipline}
                    index={index}
                    total={disciplines.length}
                    metricsLabel={disciplinas.metricsLabel}
                  />
                </div>
              ))}

              <div className={styles.cardShell} data-card-shell>
                <article className={styles.ctaCard} data-cta-card>
                  <div data-card-copy>
                    <p className={styles.ctaEyebrow}>
                      {disciplinas.cta.eyebrow}
                    </p>
                    <h2 className={styles.ctaHeading}>
                      {disciplinas.cta.headlineTop}
                      <br />
                      {disciplinas.cta.headlineBottom}
                    </h2>
                    <Link className={styles.ctaAction} href="/membresias">
                      {disciplinas.cta.action}
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                </article>
              </div>
            </div>
          </div>

          <div className={styles.progress} aria-hidden>
            <p className={styles.progressIndex}>
              <span data-index>01</span>
              <span className={styles.progressTotal}>
                {` / ${String(CARD_COUNT).padStart(2, "0")}`}
              </span>
            </p>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} data-bar />
            </div>
            <p className={styles.progressName} data-name>
              {disciplines[0]?.name}
            </p>
          </div>
        </div>
      </section>
    </CarouselMotion>
  );
}
