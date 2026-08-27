import type { ReactElement } from "react";

import type { DisciplineMetric } from "@/types/content";

import styles from "./DisciplinesCarousel.module.css";

export interface MetricRingProps {
  metric: DisciplineMetric;
  gradientId: string;
}

const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function MetricRing({
  metric,
  gradientId,
}: MetricRingProps): ReactElement {
  const value = Math.max(0, Math.min(100, metric.value));
  const offset = CIRCUMFERENCE * (1 - value / 100);

  return (
    <div className={styles.ring}>
      <div className={styles.ringGraphic}>
        <svg
          className={styles.ringSvg}
          viewBox="0 0 100 100"
          role="img"
          aria-label={`${metric.label}: ${String(value)} de 100`}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--color-cta-start)" />
              <stop offset="100%" stopColor="var(--color-cta-end)" />
            </linearGradient>
          </defs>

          <circle
            className={styles.ringTrack}
            cx="50"
            cy="50"
            r={RADIUS}
            fill="none"
          />
          <circle
            className={styles.ringValue}
            cx="50"
            cy="50"
            r={RADIUS}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            data-ring-value
            data-value={value}
          />
        </svg>

        <span className={styles.ringReadout} aria-hidden>
          <span className={styles.ringNumber}>
            <span data-ring-number data-value={value}>
              {value}
            </span>
            <span className={styles.ringPercent}>%</span>
          </span>
        </span>
      </div>

      <span className={styles.ringLabel} aria-hidden>
        {metric.label}
      </span>
    </div>
  );
}
