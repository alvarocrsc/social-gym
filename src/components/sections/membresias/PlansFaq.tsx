import type { ReactElement } from "react";

import { faq } from "@/content/faq";
import { membresias } from "@/content/membresias";

import styles from "./Membresias.module.css";
import { revealDelay } from "./reveal";

export function PlansFaq(): ReactElement | null {
  if (faq.length === 0) return null;

  return (
    <section
      className={`${styles.section} ${styles.sectionRule}`}
      aria-labelledby="preguntas"
    >
      <h2 className={styles.sectionTitle} id="preguntas" data-rv>
        {membresias.faqHeading}
      </h2>

      <div className={styles.faqList}>
        {faq.map((item, i) => (
          <details
            key={item.question}
            className={styles.faqItem}
            name="faq-membresias"
            data-rv
            style={revealDelay(i * 60)}
          >
            <summary className={styles.faqSummary}>
              {item.question}
              <span className={styles.faqIcon} aria-hidden>
                +
              </span>
            </summary>
            <p className={styles.faqAnswer}>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
