"use client";

import type { ReactElement } from "react";

import { consent as copy } from "@/content/consent";
import { GRANTED, writeConsent } from "@/lib/analytics/consent";

import styles from "./ConsentFrame.module.css";
import { useConsent } from "./useConsent";

export interface ConsentFrameProps {
  src: string;
  title: string;
  /** Where to send the visitor when they decline. Empty drops the link. */
  fallbackUrl: string;
  fallbackLabel: string;
  className?: string;
  iframeClassName?: string;
}

export function ConsentFrame({
  src,
  title,
  fallbackUrl,
  fallbackLabel,
  className,
  iframeClassName,
}: ConsentFrameProps): ReactElement {
  const value = useConsent();

  if (value === undefined) {
    return <div className={className} data-store-frame data-lenis-prevent />;
  }

  if (value?.external === true) {
    return (
      <div className={className} data-store-frame data-lenis-prevent>
        <iframe
          className={iframeClassName}
          src={src}
          title={title}
          loading="lazy"
          scrolling="no"
          data-store-iframe
        />
      </div>
    );
  }

  return (
    <div className={className} data-store-frame>
      <div className={styles.blocked}>
        <span className={styles.eyebrow}>{copy.frameBlockedTitle}</span>
        <p className={styles.body}>{copy.frameBlockedBody}</p>
        <div className={styles.actions}>
          <button
            className={styles.accept}
            type="button"
            onClick={() => {
              writeConsent(GRANTED);
            }}
          >
            {copy.frameBlockedAccept}
          </button>
          {fallbackUrl === "" ? null : (
            <a
              className={styles.external}
              href={fallbackUrl}
              target="_blank"
              rel="noopener"
            >
              {`${fallbackLabel} ↗`}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
