import type { CSSProperties, ReactElement } from "react";

import { home } from "@/content/home";
import { site } from "@/content/site";

import styles from "./Home.module.css";
import { revealDelay } from "./reveal";

export const MAPS_URL = `https://www.google.com/maps/place/?q=place_id:${site.googlePlaceId}`;

export function VisitReviews(): ReactElement {
  const { visit } = home;
  const starsStyle = {
    ...revealDelay(220),
    "--fill": site.reviews.rating / 5,
  } as CSSProperties;

  return (
    <a
      className={styles.reviews}
      href={MAPS_URL}
      target="_blank"
      rel="noopener"
      data-rv
      style={starsStyle}
    >
      <span className={styles.reviewsLabel}>{visit.reviewsLabel}</span>
      <span className={styles.reviewsScore}>
        {visit.reviewsScore}
        <span className="sr-only">{` ${visit.reviewsOutOf}`}</span>
      </span>
      <span className={styles.stars} aria-hidden>
        <span className={styles.starsBase}>★★★★★</span>
        <span className={styles.starsFill}>★★★★★</span>
      </span>
      <span className={styles.reviewsText}>
        {visit.reviewsText}
        <span aria-hidden>↗</span>
      </span>
    </a>
  );
}
