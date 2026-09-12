import type { ReactElement } from "react";

import type { LegalDocument } from "@/types/content";

import styles from "./Legal.module.css";
import { LegalBlock } from "./LegalBlock";
import { LegalMotion } from "./LegalMotion";

export interface LegalDocProps {
  doc: LegalDocument;
  titleId: string;
  updatedLabel: string;
}

const DATE_FORMAT = new Intl.DateTimeFormat("es-ES", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

function index(position: number): string {
  return String(position).padStart(2, "0");
}

export function LegalDoc({
  doc,
  titleId,
  updatedLabel,
}: LegalDocProps): ReactElement {
  const updated = DATE_FORMAT.format(new Date(`${doc.updated}T00:00:00Z`));

  return (
    <LegalMotion>
      <header className={styles.hero}>
        <span className={styles.eyebrow}>{doc.eyebrow}</span>
        <h1 className={styles.title} id={titleId}>
          {doc.title}
        </h1>
        <p className={styles.lead}>{doc.lead}</p>
        <time className={styles.updated} dateTime={doc.updated}>
          {`${updatedLabel} ${updated}`}
        </time>
      </header>

      <div className={styles.body}>
        <nav className={styles.index} aria-label={doc.indexLabel}>
          <span className={styles.indexLabel}>{doc.indexLabel}</span>
          <ol className={styles.indexList}>
            {doc.sections.map((section, position) => (
              <li key={section.id}>
                <a
                  className={styles.indexLink}
                  href={`#${section.id}`}
                  data-index-link={section.id}
                >
                  <span className={styles.indexNumber} aria-hidden>
                    {index(position + 1)}
                  </span>
                  {section.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className={styles.sections}>
          {doc.sections.map((section, position) => (
            <section
              className={styles.section}
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-titulo`}
              data-section
            >
              <div className={styles.sectionHead} data-rv>
                <span className={styles.sectionNumber} aria-hidden>
                  {index(position + 1)}
                </span>
                <h2 className={styles.sectionTitle} id={`${section.id}-titulo`}>
                  {section.heading}
                </h2>
              </div>

              <div className={styles.blocks} data-rv>
                {section.blocks.map((block, blockIndex) => (
                  <LegalBlock block={block} key={blockIndex} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </LegalMotion>
  );
}
