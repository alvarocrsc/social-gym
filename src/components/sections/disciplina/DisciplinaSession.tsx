import type { ReactElement } from "react";

import { disciplina } from "@/content/disciplina";
import type { Discipline } from "@/types/content";

import styles from "./Disciplina.module.css";
import { rampIndex, revealDelay } from "./reveal";

export interface DisciplinaSessionProps {
  discipline: Discipline;
}

export function DisciplinaSession({
  discipline,
}: DisciplinaSessionProps): ReactElement {
  const duration = discipline.meta.find(
    (item) => item.label === "Duración",
  )?.value;

  const meta = [
    duration,
    `${String(discipline.session.length)} ${disciplina.sessionBlocks}`,
  ]
    .filter((part) => part !== undefined)
    .join(" · ");

  return (
    <section
      className={styles.section}
      data-session
      aria-labelledby="una-sesion"
    >
      <div className={styles.sessionHead}>
        <h2 className={styles.sectionTitle} id="una-sesion" data-rv>
          {disciplina.sessionHeading}
        </h2>
        <span className={styles.sectionMeta} data-rv style={revealDelay(120)}>
          {meta}
        </span>
      </div>

      <div className={styles.sessionBody}>
        <span className={styles.rail} aria-hidden />
        <span className={styles.railFill} data-session-fill aria-hidden />

        <ol className={styles.blocks}>
          {discipline.session.map((block, i) => (
            <li
              key={block.time}
              className={styles.block}
              data-rv
              style={revealDelay(i * 90)}
            >
              <span
                className={styles.blockDot}
                style={rampIndex("--block-i", i)}
                aria-hidden
              />
              <span className={styles.blockTime}>{block.time}</span>
              <h3 className={styles.blockTitle}>{block.title}</h3>
              <p className={styles.blockText}>{block.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
