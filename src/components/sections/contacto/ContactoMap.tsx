"use client";

import { useState, type ReactElement } from "react";

import styles from "./Contacto.module.css";

export interface ContactoMapProps {
  src: string;
  title: string;
  action: string;
  consent: string;
}

/**
 * `'use client'` — the frame mounts on click and nowhere else.
 *
 * Google Maps sets cookies, so it is treated as non-essential until the
 * consent banner exists (§13): nothing third-party is in the initial payload,
 * and the address above plus the "abrir en Google Maps" link below mean a
 * visitor who never presses the button still has everything they need.
 */
export function ContactoMap({
  src,
  title,
  action,
  consent,
}: ContactoMapProps): ReactElement {
  const [mounted, setMounted] = useState(false);

  return (
    <div className={styles.mapPanel}>
      {mounted ? (
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
              setMounted(true);
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
