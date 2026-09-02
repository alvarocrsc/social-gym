import type { ReactElement } from "react";

import { membresias } from "@/content/membresias";
import { plans } from "@/content/plans";

import styles from "./Membresias.module.css";
import { PlanCard } from "./PlanCard";
import { revealDelay } from "./reveal";

export function PlansGrid(): ReactElement {
  return (
    <section
      className={`${styles.section} ${styles.sectionRule}`}
      id="planes"
      data-plans
      aria-labelledby="elige-tu-plan"
    >
      <div className={styles.sectionHead}>
        <h2 className={styles.sectionTitle} id="elige-tu-plan" data-rv>
          {membresias.plansHeading}
        </h2>
        <span className={styles.sectionMeta} data-rv style={revealDelay(120)}>
          {membresias.plansMeta}
        </span>
      </div>

      <ul className={styles.planGrid}>
        {plans.map((plan, i) => (
          <PlanCard
            key={plan.slug}
            plan={plan}
            index={i}
            action={membresias.planAction}
          />
        ))}
      </ul>

      <p className={styles.footnote} data-rv>
        {membresias.plansFootnote}
      </p>
    </section>
  );
}
