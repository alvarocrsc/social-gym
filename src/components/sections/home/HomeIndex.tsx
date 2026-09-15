import type { ReactElement } from "react";

import { disciplines } from "@/content/disciplines";
import { home } from "@/content/home";
import { Link } from "@/i18n/navigation";
import type { Discipline } from "@/types/content";

import styles from "./Home.module.css";
import { IndexCursor } from "./IndexCursor";
import { IndexPreview } from "./IndexPreview";
import { IndexRow } from "./IndexRow";
import { revealDelay } from "./reveal";

const TITLE_ID = "disciplinas";

const items: Discipline[] = disciplines
  .slice()
  .sort((a, b) => a.order - b.order);

export function HomeIndex(): ReactElement {
  const { index } = home;

  return (
    <section className={styles.index} aria-labelledby={TITLE_ID}>
      <div className={styles.indexHead}>
        <span className={styles.eyebrow} data-rv>
          {index.eyebrow}
        </span>
        <h2 className={styles.title} id={TITLE_ID}>
          <span className={styles.titleLine} data-rv-line>
            <span>{index.headingSolid}</span>
          </span>
          <span
            className={`${styles.titleLine} ${styles.titleOutlined} ${styles.titleShift}`}
            data-rv-line
            style={revealDelay(140)}
          >
            <span>{index.headingOutlined}</span>
          </span>
        </h2>
        <div className={styles.indexAside} data-rv style={revealDelay(200)}>
          <p className={styles.indexLead}>{index.lead}</p>
          <Link
            className={`${styles.textAction} ${styles.line}`}
            href="/disciplinas"
          >
            {index.allAction}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      <IndexCursor>
        <ol className={styles.indexList}>
          {items.map((discipline, position) => (
            <IndexRow
              key={discipline.slug}
              discipline={discipline}
              position={position}
            />
          ))}
        </ol>
        <IndexPreview items={items} />
      </IndexCursor>
    </section>
  );
}
