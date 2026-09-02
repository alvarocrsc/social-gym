import type { CSSProperties, ReactElement } from "react";

import type { ImageAsset } from "@/types/content";

import { CoachTag } from "./CoachTag";
import styles from "./Disciplina.module.css";

export interface WeekTimetableRow {
  id: string;
  day: string;
  time: string;
  coach: { name: string; image?: ImageAsset } | undefined;
  /** Bar position inside the ruler window, as fractions of it. */
  offset: number;
  width: number;
  /** Marks the session that breaks the week's usual hour. */
  outlier: boolean;
}

export interface WeekTimetableProps {
  caption: string;
  columns: { day: string; time: string; coach: string };
  ticks: string[];
  rows: WeekTimetableRow[];
}

const ROW_STAGGER_MS = 70;

/**
 * Weekly timetable as a real table plus an hour ruler.
 *
 * The ruler is `aria-hidden` and carries no text of its own: every value it
 * draws is already in the Hora column, so it can be dropped on narrow screens
 * without losing information, and a screen reader never hears the week twice.
 *
 * Presentational — pass different `rows` and it renders a different discipline.
 * Reveals come from the `[data-rv]` system on the page's motion root; without
 * one the table simply renders at rest.
 */
export function WeekTimetable({
  caption,
  columns,
  ticks,
  rows,
}: WeekTimetableProps): ReactElement {
  const showCoach = rows.some((row) => row.coach !== undefined);
  const trackStyle = {
    gridTemplateColumns: `repeat(${String(ticks.length)}, 1fr)`,
  } as CSSProperties;

  return (
    <table className={styles.timetable}>
      <caption className="sr-only">{caption}</caption>
      <thead>
        <tr>
          <th className={styles.timetableCol} scope="col">
            {columns.day}
          </th>
          <th className={styles.timetableCol} scope="col">
            {columns.time}
          </th>
          {showCoach ? (
            <th className={styles.timetableCol} scope="col">
              {columns.coach}
            </th>
          ) : null}
          <th className={styles.trackHead} scope="col" aria-hidden>
            <span className={styles.timetableTicks} style={trackStyle}>
              {ticks.map((tick) => (
                <span key={tick} className={styles.timetableTick}>
                  {tick}
                </span>
              ))}
            </span>
          </th>
        </tr>
      </thead>

      <tbody>
        {rows.map((row, i) => (
          <tr
            key={row.id}
            data-rv
            style={
              {
                "--rv-delay": `${String(i * ROW_STAGGER_MS)}ms`,
              } as CSSProperties
            }
          >
            <th className={styles.dayCell} scope="row">
              {row.day}
            </th>
            <td className={styles.timeCell}>{row.time}</td>
            {showCoach ? (
              <td className={styles.coachCell}>
                {row.coach !== undefined ? (
                  <CoachTag name={row.coach.name} image={row.coach.image} />
                ) : null}
              </td>
            ) : null}
            <td className={styles.trackCell} aria-hidden>
              <span className={styles.track} style={trackStyle}>
                {ticks.map((tick) => (
                  <span key={tick} className={styles.trackColumn} />
                ))}
                <span
                  className={styles.trackBar}
                  data-outlier={row.outlier ? "" : undefined}
                  style={
                    {
                      "--bar-left": row.offset,
                      "--bar-width": row.width,
                    } as CSSProperties
                  }
                />
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
