import type { ReactElement } from "react";

import { membresias } from "@/content/membresias";
import { plans } from "@/content/plans";

import styles from "./Membresias.module.css";
import { revealDelay } from "./reveal";

const PRICE_ROW = "Precio por mes";
const YES = "sí";

/*
 * Half these rows are identical across all four plans, so on a phone a
 * four-column table spends its width restating "sí" and pushes the columns
 * that actually differ off screen. Splitting the data lets the narrow layout
 * state the shared features once and then compare only what varies.
 */
const rows = membresias.compareRows;
const sharedRows = rows.filter((row) => row.values.every((v) => v === YES));
const varyingRows = rows.filter((row) => !row.values.every((v) => v === YES));

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

      {/* Wide layout. `display: none` below the breakpoint takes it out of the
          accessibility tree too, so the two layouts are never both announced. */}
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
            {rows.map((row) => (
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
                    {value === YES ? (
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

      {/* Narrow layout. */}
      <div className={styles.compareStack} data-rv style={revealDelay(80)}>
        <div className={styles.compareShared}>
          <span className={styles.compareSharedLabel}>
            {membresias.compareSharedLabel}
          </span>
          <ul className={styles.compareSharedList}>
            {sharedRows.map((row) => (
              <li key={row.label} className={styles.compareSharedItem}>
                <span className={styles.compareCheck} aria-hidden>
                  ✓
                </span>
                {row.label}
              </li>
            ))}
          </ul>
        </div>

        <ul className={styles.compareCards}>
          {plans.map((plan, planIndex) => (
            <li
              key={plan.slug}
              className={styles.compareCard}
              data-featured={plan.highlighted ? "" : undefined}
            >
              <span className={styles.compareCardName}>{plan.name}</span>
              <dl className={styles.compareCardRows}>
                {varyingRows.map((row) => (
                  <div key={row.label} className={styles.compareCardRow}>
                    <dt className={styles.compareCardTerm}>{row.label}</dt>
                    <dd
                      className={styles.compareCardValue}
                      data-price={row.label === PRICE_ROW ? "" : undefined}
                    >
                      {row.values[planIndex] ?? ""}
                    </dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
