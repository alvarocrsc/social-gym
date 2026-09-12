"use client";

import { useCallback, useSyncExternalStore, type ReactElement } from "react";

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
  /**
   * Media query that must match for the frame to mount at all. Lets a layout
   * that hides this section at some widths also stop it loading there, rather
   * than fetching a third party into a `display: none` box.
   */
  media?: string;
}

/** Subscribes to a media query without a setState-in-effect round trip. */
function useMediaMatches(query: string | undefined): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (query === undefined) return () => undefined;
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => {
        mql.removeEventListener("change", onChange);
      };
    },
    [query],
  );

  const get = useCallback(
    () => query === undefined || window.matchMedia(query).matches,
    [query],
  );

  // The server value is irrelevant: consent reads `undefined` before
  // hydration, so nothing here renders until the client has both answers.
  return useSyncExternalStore(subscribe, get, () => true);
}

export function ConsentFrame({
  src,
  title,
  fallbackUrl,
  fallbackLabel,
  className,
  iframeClassName,
  media,
}: ConsentFrameProps): ReactElement {
  const value = useConsent();
  const mediaMatches = useMediaMatches(media);

  if (value === undefined || !mediaMatches) {
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
