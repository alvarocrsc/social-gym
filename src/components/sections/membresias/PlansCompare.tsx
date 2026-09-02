import type { ReactElement } from "react";

import { membresias } from "@/content/membresias";
import { plans } from "@/content/plans";

import styles from "./Membresias.module.css";
import { revealDelay } from "./reveal";

const PRICE_ROW = "Precio por mes";

export function PlansCompare(): ReactElement {
  return (
    <section
      className={`${styles.section} ${styles.sectionRule}`}
      aria-labelledby="que-incluye"
    >
      <div className={styles.headingRow} data-rv>
        <span className={styles.headingRule} aria-hidden />
        <h2 className={styles.headingTitle} id="que-incluye">
          {membresias.compareHeading}
        </h2>
      </div>

      <div className={styles.compareScroll} data-rv style={revealDelay(80)}>
        <table className={styles.compareTable}>
          <caption className="sr-only">{membresias.compareHeading}</caption>
          <thead>
            <tr>
              <th className={styles.compareConcept} scope="col">
                {membresias.compareConcept}
              </th>
              {plans.map((plan) => (
                <th
                  key={plan.slug}
                  className={styles.comparePlan}
                  scope="col"
                  data-featured={plan.highlighted ? "" : undefined}
                >
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {membresias.compareRows.map((row) => (
              <tr
                key={row.label}
                className={styles.compareRow}
                data-price={row.label === PRICE_ROW ? "" : undefined}
              >
                <th className={styles.compareLabel} scope="row">
                  {row.label}
                </th>
                {row.values.map((value, i) => (
                  <td
                    key={plans[i]?.slug ?? String(i)}
                    className={styles.compareValue}
                    data-featured={plans[i]?.highlighted ? "" : undefined}
                  >
                    {value === "sí" ? (
                      <>
                        <span className={styles.compareCheck} aria-hidden>
                          ✓
                        </span>
                        <span className="sr-only">{value}</span>
                      </>
                    ) : (
                      value
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
