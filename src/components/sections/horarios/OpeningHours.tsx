import type { ReactElement } from "react";

import { horarios } from "@/content/horarios";
import { schedule } from "@/content/schedule";

import styles from "./Horarios.module.css";
import { cssVars, toMinutes } from "./reveal";

const DAY_MINUTES = 24 * 60;
const REVEAL_STEP_MS = 90;
const BAR_DELAY_MS = 200;

export function OpeningHours(): ReactElement {
  return (
    <section
      className={`${styles.section} ${styles.sectionRule}`}
      aria-labelledby="sala-abierta"
    >
      <div className={styles.headingRow} data-rv>
        <span className={styles.headingRule} aria-hidden />
        <h2 className={styles.headingTitle} id="sala-abierta">
          {horarios.openHeading}
        </h2>
      </div>

      <ul className={styles.openGrid}>
        {schedule.map((block, i) => {
          const opens = toMinutes(block.opens);
          const closesRaw = toMinutes(block.closes);
          const wraps = closesRaw <= opens;
          // A band that ends after midnight reads as a smaller number than it
          // starts at; the track is one day wide, so it is clamped at the edge.
          // The badge counts the real span, which runs past that edge.
          const closes = wraps ? DAY_MINUTES : closesRaw;
          const hours = Math.round(
            ((wraps ? closesRaw + DAY_MINUTES : closesRaw) - opens) / 60,
          );
          const featured = block.days.length > 1;

          return (
            <li
              className={styles.openCard}
              key={block.label}
              data-featured={featured ? "" : undefined}
              data-rv
              style={cssVars({
                "--rv-delay": `${String(i * REVEAL_STEP_MS)}ms`,
              })}
            >
              {featured ? (
                <span className={styles.openRail} aria-hidden />
              ) : null}

              <div className={styles.openTop}>
                <span className={styles.openDay}>{block.label}</span>
                <span className={styles.openBadge}>
                  {`${String(hours)} h${featured ? " seguidas" : ""}`}
                </span>
              </div>

              <p className={styles.openHours}>
                {block.opens}
                <span
                  className={styles.openHoursEnd}
                >{`a ${block.closes}`}</span>
              </p>

              <div>
                <div className={styles.openTrack}>
                  <span
                    className={styles.openFill}
                    aria-hidden
                    style={cssVars({
                      "--fill-left": (opens / DAY_MINUTES) * 100,
                      "--fill-width": ((closes - opens) / DAY_MINUTES) * 100,
                      "--rv-delay": `${String(BAR_DELAY_MS + i * REVEAL_STEP_MS)}ms`,
                    })}
                  />
                </div>
                <div className={styles.openTicks} aria-hidden>
                  {horarios.openTrackTicks.map((tick) => (
                    <span key={tick}>{tick}</span>
                  ))}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
