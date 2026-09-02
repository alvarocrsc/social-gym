import type { ReactElement } from "react";

import { membresias } from "@/content/membresias";

import styles from "./Membresias.module.css";
import { cssVar, revealDelay } from "./reveal";

export function HowItWorks(): ReactElement {
  return (
    <section
      className={`${styles.section} ${styles.sectionRule} ${styles.howGrid}`}
      aria-labelledby="como-funciona"
    >
      <div>
        <span className={styles.eyebrow} data-rv>
          {membresias.howEyebrow}
        </span>
        <h2
          className={styles.howTitle}
          id="como-funciona"
          data-rv
          style={revealDelay(70)}
        >
          <span>{membresias.howHeadlineSolid}</span>
          <span className={styles.howOutlined}>
            {membresias.howHeadlineOutlined}
          </span>
        </h2>
        <p className={styles.howLead} data-rv style={revealDelay(140)}>
          {membresias.howLead}
        </p>
      </div>

      <ol className={styles.howSteps}>
        {membresias.howSteps.map((step, i) => (
          <li
            key={step.title}
            className={styles.howStep}
            data-rv
            style={revealDelay(i * 80)}
          >
            <span className={styles.howStepIndex} style={cssVar("--step-i", i)}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className={styles.howStepTitle}>{step.title}</h3>
              <p className={styles.howStepBody}>{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
