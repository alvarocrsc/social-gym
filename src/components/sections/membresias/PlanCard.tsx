import type { ReactElement } from "react";

import { site } from "@/content/site";
import type { MembershipPlan } from "@/types/content";

import styles from "./Membresias.module.css";
import { revealDelay } from "./reveal";

export interface PlanCardProps {
  plan: MembershipPlan;
  index: number;
  action: string;
}

export function PlanCard({ plan, index, action }: PlanCardProps): ReactElement {
  const href = `${site.virtuagym.productEmbedBase}${plan.productId}`;
  const price = plan.price ?? 0;
  const label = `${action} ${plan.name.toLowerCase()}, ${String(price)} € ${plan.periodLabel}`;

  return (
    <li
      className={styles.plan}
      data-featured={plan.highlighted ? "" : undefined}
      data-plan
      data-rv
      style={revealDelay(index * 90)}
    >
      {plan.highlighted ? (
        <span className={styles.planRail} aria-hidden />
      ) : null}
      <span className={styles.planGlow} data-plan-glow aria-hidden />

      <div className={styles.planTop}>
        <div>
          <span className={styles.planIndex}>
            {`${String(index + 1).padStart(2, "0")} · ${plan.name}`}
          </span>
          <span className={styles.planDuration}>{plan.durationLabel}</span>
        </div>
        <span className={styles.planBadge}>{plan.badge}</span>
      </div>

      <p className={styles.planPrice}>
        <span>
          {"€"}
          <span data-plan-price data-value={price}>
            {price}
          </span>
        </span>
        <span className={styles.planPeriod}>{plan.periodLabel}</span>
      </p>

      <div className={styles.planRates}>
        <span className={styles.planMonthly}>{plan.monthlyLabel}</span>
        {plan.savingLabel !== "" ? (
          <span className={styles.planSaving}>{plan.savingLabel}</span>
        ) : null}
      </div>

      <p className={styles.planPitch}>{plan.pitch}</p>

      <ul className={styles.planFeatures}>
        {plan.features.map((feature) => (
          <li key={feature} className={styles.planFeature}>
            <span className={styles.planCheck} aria-hidden>
              ✓
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <a
        className={styles.planAction}
        href={href}
        aria-label={label}
        data-plan-shop={plan.productId}
        data-plan-name={plan.name}
      >
        {action}
        <span className={styles.planActionGlyph} aria-hidden>
          →
        </span>
      </a>
    </li>
  );
}
