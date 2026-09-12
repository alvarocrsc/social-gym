"use client";

import { useEffect, useId, useState, type ReactElement } from "react";

import { consent as copy } from "@/content/consent";
import { Link } from "@/i18n/navigation";
import {
  applyConsentDefaults,
  applyConsentMode,
  DENIED,
  GRANTED,
  readConsent,
  writeConsent,
  type ConsentState,
} from "@/lib/analytics/consent";

import styles from "./CookieBanner.module.css";
import { useConsent } from "./useConsent";

interface ToggleProps {
  checked: boolean;
  disabled?: boolean;
  label: string;
  onChange: (next: boolean) => void;
}

function Toggle({
  checked,
  disabled = false,
  label,
  onChange,
}: ToggleProps): ReactElement {
  return (
    <button
      className={styles.toggle}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      data-on={checked ? "" : undefined}
      onClick={() => {
        onChange(!checked);
      }}
    >
      <span className={styles.toggleKnob} aria-hidden />
    </button>
  );
}

/**
 * `'use client'` — the banner exists only when there is no stored choice, and
 * storage is not readable while the page is being generated.
 *
 * Nothing here renders on the server, so the banner never appears in the
 * static HTML and cannot shift layout: it is fixed to the viewport and mounts
 * after hydration.
 */
export function CookieBanner(): ReactElement | null {
  const value = useConsent();
  const [detail, setDetail] = useState(false);
  const [draft, setDraft] = useState<ConsentState>(DENIED);
  const titleId = useId();
  const bodyId = useId();

  useEffect(() => {
    // Defaults go in before anything can measure, then the stored choice — if
    // there is one — immediately updates them.
    applyConsentDefaults();
    const stored = readConsent();
    if (stored !== null) applyConsentMode(stored);
  }, []);

  // `undefined` is pre-hydration, anything else is a choice already made. The
  // banner is therefore never in the static HTML and cannot shift layout.
  if (value !== null) return null;

  function decide(state: ConsentState): void {
    writeConsent(state);
  }

  return (
    <div
      className={styles.banner}
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      aria-describedby={bodyId}
      data-detail={detail ? "" : undefined}
    >
      <div className={styles.panel}>
        <div className={styles.head}>
          <span className={styles.eyebrow}>
            <span className={styles.dot} aria-hidden />
            {copy.eyebrow}
          </span>
          <h2 className={styles.title} id={titleId}>
            {copy.title}
          </h2>
          <p className={styles.body} id={bodyId}>
            {copy.body}
          </p>
        </div>

        {detail ? (
          <ul className={styles.categories}>
            <li className={styles.category}>
              <div className={styles.categoryText}>
                <span className={styles.categoryName}>
                  {copy.categories.necessary.name}
                </span>
                <p className={styles.categoryBody}>
                  {copy.categories.necessary.body}
                </p>
              </div>
              <span className={styles.always}>{copy.alwaysOn}</span>
            </li>

            <li className={styles.category}>
              <div className={styles.categoryText}>
                <span className={styles.categoryName}>
                  {copy.categories.analytics.name}
                </span>
                <p className={styles.categoryBody}>
                  {copy.categories.analytics.body}
                </p>
              </div>
              <Toggle
                checked={draft.analytics}
                label={copy.categories.analytics.name}
                onChange={(next) => {
                  setDraft((prev) => ({ ...prev, analytics: next }));
                }}
              />
            </li>

            <li className={styles.category}>
              <div className={styles.categoryText}>
                <span className={styles.categoryName}>
                  {copy.categories.external.name}
                </span>
                <p className={styles.categoryBody}>
                  {copy.categories.external.body}
                </p>
              </div>
              <Toggle
                checked={draft.external}
                label={copy.categories.external.name}
                onChange={(next) => {
                  setDraft((prev) => ({ ...prev, external: next }));
                }}
              />
            </li>
          </ul>
        ) : null}

        <div className={styles.actions}>
          <button
            className={`${styles.action} ${styles.accept}`}
            type="button"
            onClick={() => {
              decide(GRANTED);
            }}
          >
            {copy.accept}
          </button>

          <button
            className={styles.action}
            type="button"
            onClick={() => {
              decide(DENIED);
            }}
          >
            {copy.reject}
          </button>

          {detail ? (
            <button
              className={styles.action}
              type="button"
              onClick={() => {
                decide(draft);
              }}
            >
              {copy.save}
            </button>
          ) : (
            <button
              className={styles.action}
              type="button"
              aria-expanded={false}
              onClick={() => {
                setDetail(true);
              }}
            >
              {copy.configure}
            </button>
          )}
        </div>

        <Link className={styles.policy} href="/cookies">
          {copy.policyAction}
        </Link>
      </div>
    </div>
  );
}
