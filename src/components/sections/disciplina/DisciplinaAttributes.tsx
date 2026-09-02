import type { ReactElement } from "react";

import { disciplina } from "@/content/disciplina";
import type { Discipline, DisciplineMetric } from "@/types/content";

import styles from "./Disciplina.module.css";
import { rampIndex, revealDelay } from "./reveal";

export interface DisciplinaAttributesProps {
  discipline: Discipline;
}

const RADIUS = 66;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function levelFor(value: number): string {
  const { high, mid, low } = disciplina.attributeLevels;
  return value >= 70 ? high : value >= 40 ? mid : low;
}

function Attribute({
  metric,
  index,
}: {
  metric: DisciplineMetric;
  index: number;
}): ReactElement {
  const value = Math.max(0, Math.min(100, metric.value));

  return (
    <li className={styles.attribute} data-rv style={revealDelay(index * 80)}>
      <div
        className={styles.attributeRing}
        style={rampIndex("--ring-i", index)}
      >
        <svg
          className={styles.attributeSvg}
          viewBox="0 0 160 160"
          role="img"
          aria-label={`${metric.label}: ${String(value)} de 100`}
        >
          <circle
            className={styles.attributeTrack}
            cx="80"
            cy="80"
            r={RADIUS}
          />
          <circle
            className={styles.attributeValue}
            cx="80"
            cy="80"
            r={RADIUS}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - value / 100)}
            data-ring-value
            data-value={value}
          />
        </svg>

        <span className={styles.attributeReadout} aria-hidden>
          <span className={styles.attributeNumber}>
            <span data-ring-number data-value={value}>
              {value}
            </span>
          </span>
          <span className={styles.attributeLevel}>{levelFor(value)}</span>
        </span>
      </div>

      <span className={styles.attributeLabel} aria-hidden>
        {metric.label}
      </span>
    </li>
  );
}

export function DisciplinaAttributes({
  discipline,
}: DisciplinaAttributesProps): ReactElement {
  return (
    <section
      className={styles.section}
      data-rings
      aria-labelledby="que-trabaja"
    >
      <div className={styles.headingRow} data-rv>
        <span className={styles.headingRule} aria-hidden />
        <h2 className={styles.sectionTitle} id="que-trabaja">
          {disciplina.attributesHeading}
        </h2>
      </div>

      <ul className={styles.attributeGrid}>
        {discipline.metrics.map((metric, i) => (
          <Attribute key={metric.label} metric={metric} index={i} />
        ))}
      </ul>
    </section>
  );
}
