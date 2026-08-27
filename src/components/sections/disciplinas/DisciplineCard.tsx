import Image from "next/image";
import type { ReactElement } from "react";

import { Link } from "@/i18n/navigation";
import { disciplinePathname } from "@/lib/seo/routes";
import type { Discipline } from "@/types/content";

import styles from "./DisciplinesCarousel.module.css";
import { MetricRing } from "./MetricRing";

export interface DisciplineCardProps {
  discipline: Discipline;
  index: number;
  total: number;
  metricsLabel: string;
}

export function DisciplineCard({
  discipline,
  index,
  total,
  metricsLabel,
}: DisciplineCardProps): ReactElement {
  const { image, video } = discipline;
  const hasVideo = video !== undefined && video.length > 0;
  const hasImage = image.src !== "";

  return (
    <article className={styles.card} data-card>
      <div className={styles.cardMedia} data-card-media aria-hidden>
        {hasImage ? (
          <Image
            className={styles.cardImage}
            src={image.src}
            alt=""
            fill
            sizes="(min-width: 48rem) 68vw, 100vw"
          />
        ) : (
          // Placeholder until photography lands
          <div className={styles.cardPlaceholder}>
            <span className={styles.cardPlaceholderCode}>
              {discipline.code}
            </span>
            <span className={styles.cardPlaceholderHint}>
              {discipline.name}
            </span>
          </div>
        )}
        {hasVideo ? (
          <video
            className={styles.cardVideo}
            poster={hasImage ? image.src : undefined}
            muted
            loop
            playsInline
            preload="none"
            tabIndex={-1}
            data-card-video
          >
            {video.map((source) => (
              <source key={source.src} src={source.src} type={source.type} />
            ))}
          </video>
        ) : null}
      </div>

      <div className={styles.cardScrim} aria-hidden />
      <div className={styles.cardRing} data-card-ring aria-hidden />

      <div className={styles.cardInner}>
        <div className={styles.cardTop}>
          <span className={styles.cardIndex}>
            {String(index + 1).padStart(2, "0")}
            <span className={styles.cardIndexTotal}>
              {` / ${String(total).padStart(2, "0")}`}
            </span>
          </span>
          <span className={styles.cardBadge}>{discipline.badge}</span>
        </div>

        <div className={styles.cardCopy} data-card-copy>
          <h2 className={styles.cardTitle}>
            <Link
              className={styles.cardLink}
              href={disciplinePathname(discipline.slug)}
            >
              {discipline.name}
            </Link>
          </h2>
          <p className={styles.cardText}>{discipline.shortDescription}</p>

          <div
            className={styles.metrics}
            role="group"
            aria-label={`${metricsLabel} — ${discipline.name}`}
          >
            {discipline.metrics.map((metric) => (
              <MetricRing
                key={metric.label}
                metric={metric}
                gradientId={`ring-${discipline.slug}-${metric.label.toLowerCase()}`}
              />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
