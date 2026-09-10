import type { ReactElement } from "react";

import { horarios } from "@/content/horarios";

import styles from "./Horarios.module.css";
import { cssVars, revealDelay } from "./reveal";

export function WhenToCome(): ReactElement {
  return (
    <section
      className={`${styles.section} ${styles.sectionRule} ${styles.densityGrid}`}
      aria-labelledby="cuando-venir"
    >
      <div>
        <span className={styles.eyebrow} data-rv>
          {horarios.densityEyebrow}
        </span>
        <h2
          className={styles.densityTitle}
          id="cuando-venir"
          data-rv
          style={revealDelay(70)}
        >
          <span>{horarios.densityHeadlineSolid}</span>
          <span className={styles.densityOutlined}>
            {horarios.densityHeadlineOutlined}
          </span>
        </h2>
        <p className={styles.densityLead} data-rv style={revealDelay(140)}>
          {horarios.densityLead}
        </p>
      </div>

      <ul className={styles.densityList}>
        {horarios.densityRows.map((row, i) => (
          <li
            className={styles.densityRow}
            key={row.range}
            data-peak={row.peak ? "" : undefined}
            data-rv
            style={revealDelay(i * 80)}
          >
            <div>
              <span className={styles.densityRange}>{row.range}</span>
              <span className={styles.densityNote}>{row.note}</span>
            </div>
            <div className={styles.densityBars} aria-hidden>
              {row.bars.map((bar, barIndex) => (
                <span
                  className={styles.densityBar}
                  key={barIndex}
                  style={cssVars({ "--bar": bar, "--bar-i": barIndex })}
                />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
