"use client";

import { useState, type ReactElement } from "react";

import { useConsent } from "@/components/consent/useConsent";

import styles from "./Contacto.module.css";

export interface ContactoMapProps {
  src: string;
  title: string;
  action: string;
  consent: string;
}

/**
 * `'use client'` — the frame exists only once the visitor has allowed it.
 *
 * Two ways in. Accepting external content in the banner shows the map on
 * arrival, with no extra step. Declining leaves the placeholder, and pressing
 * its button loads the map that once without changing the stored choice
 */
export function ContactoMap({
  src,
  title,
  action,
  consent,
}: ContactoMapProps): ReactElement {
  const value = useConsent();
  const [opened, setOpened] = useState(false);

  // `value` is `undefined` until hydration, so the placeholder is also what the
  // server renders and what a visitor without JS sees.
  const show = value?.external === true || opened;

  return (
    <div className={styles.mapPanel}>
      {show ? (
        <iframe
          className={styles.mapFrame}
          src={src}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className={styles.mapPlaceholder}>
          <span className={styles.mapGrid} aria-hidden />
          <button
            className={styles.mapButton}
            type="button"
            onClick={() => {
              setOpened(true);
            }}
          >
            {action}
            <span aria-hidden>→</span>
          </button>
          <p className={styles.mapConsent}>{consent}</p>
        </div>
      )}
    </div>
  );
}
