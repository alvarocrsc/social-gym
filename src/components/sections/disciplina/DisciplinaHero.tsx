import Image from "next/image";
import type { ReactElement } from "react";

import { disciplina } from "@/content/disciplina";
import { site } from "@/content/site";
import { Link } from "@/i18n/navigation";
import type { Discipline } from "@/types/content";

import styles from "./Disciplina.module.css";
import { VideoOverlay } from "./VideoOverlay";

export interface DisciplinaHeroProps {
  discipline: Discipline;
  index: number;
}

export function DisciplinaHero({
  discipline,
  index,
}: DisciplinaHeroProps): ReactElement {
  const { image, video } = discipline;
  const hasImage = image.src !== "";
  const hasVideo = video !== undefined && video.length > 0;

  return (
    <section className={styles.hero} data-hero>
      <div className={styles.heroMedia} data-hero-media aria-hidden>
        {hasImage ? (
          <Image
            className={styles.heroImage}
            src={image.src}
            alt=""
            fill
            priority
            sizes="100vw"
          />
        ) : (
          <div className={styles.heroFallback} />
        )}
      </div>
      <div className={styles.heroScrim} aria-hidden />

      <div className={styles.heroCopy} data-hero-copy>
        <nav className={styles.crumbs} aria-label={disciplina.hubLabel}>
          <Link className={styles.crumbLink} href="/disciplinas">
            {disciplina.hubLabel}
          </Link>
          <span className={styles.crumbSep} aria-hidden>
            /
          </span>
          <span className={styles.crumbCurrent}>
            {`${String(index + 1).padStart(2, "0")} ${discipline.name}`}
          </span>
        </nav>

        <h1 className={styles.heroTitle}>
          <span className={styles.heroWord}>{discipline.name}</span>
          <span className={styles.heroPlace}>
            {`en ${site.address.locality}, ${site.address.region}`}
          </span>
        </h1>

        <p className={styles.heroLead}>{discipline.tagline}</p>

        {hasVideo ? (
          <VideoOverlay
            sources={video}
            poster={hasImage ? image.src : undefined}
            playLabel={disciplina.playLabel}
            closeLabel={disciplina.closeLabel}
            title={discipline.name}
          />
        ) : null}
      </div>

      <span className={styles.heroHint} aria-hidden>
        {`↓ ${disciplina.heroHint}`}
      </span>
    </section>
  );
}
