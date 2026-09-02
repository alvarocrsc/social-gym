import type { ReactElement } from "react";

import { disciplina } from "@/content/disciplina";
import { Link } from "@/i18n/navigation";
import type { Discipline } from "@/types/content";

import styles from "./Disciplina.module.css";
import { revealDelay } from "./reveal";

export interface DisciplinaCtaProps {
  discipline: Discipline;
}

const MARQUEE_REPEATS = 5;

export function DisciplinaCta({
  discipline,
}: DisciplinaCtaProps): ReactElement {
  return (
    <section className={styles.cta} data-cta aria-labelledby="membresias-cta">
      <span className={styles.ctaMarquee} data-cta-marquee aria-hidden>
        {Array.from({ length: MARQUEE_REPEATS }, (_, i) => (
          <span key={i}>{`${discipline.name} /`}</span>
        ))}
      </span>

      <h2 className={styles.ctaTitle} id="membresias-cta" data-rv>
        {discipline.cta.heading}
      </h2>
      <p className={styles.ctaBody} data-rv style={revealDelay(120)}>
        {discipline.cta.body}
      </p>
      <Link
        className={styles.ctaAction}
        href="/membresias"
        data-rv
        style={revealDelay(200)}
      >
        {`${disciplina.ctaAction} →`}
      </Link>
    </section>
  );
}
