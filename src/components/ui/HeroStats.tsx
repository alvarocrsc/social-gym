import type { ReactElement } from "react";

import type { HeroStat } from "@/types/content";

import styles from "./HeroStats.module.css";

export interface HeroStatsProps {
  stats: readonly HeroStat[];
}

/** Headline figures set beside a hero's lead: a gradient value and its label. */
export function HeroStats({ stats }: HeroStatsProps): ReactElement {
  return (
    <ul className={styles.stats}>
      {stats.map((stat) => (
        <li key={stat.label} className={styles.stat}>
          <span className={styles.value}>{stat.value}</span>
          <span className={styles.label}>{stat.label}</span>
        </li>
      ))}
    </ul>
  );
}
