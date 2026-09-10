import { getTranslations } from "next-intl/server";
import type { ReactElement } from "react";

import { contacto } from "@/content/contacto";
import { site } from "@/content/site";

import styles from "./Contacto.module.css";
import { ContactoMap } from "./ContactoMap";
import { MAPS_URL } from "./ContactoPlane";
import { revealDelay } from "./reveal";

const EMBED_URL = `https://www.google.com/maps?q=${String(site.address.lat)},${String(site.address.lng)}&z=16&hl=es&output=embed`;

export async function ContactoBand(): Promise<ReactElement> {
  const t = await getTranslations("Contacto");
  const rating = site.reviews.rating.toLocaleString("es-ES");
  const count = site.reviews.count.toLocaleString("es-ES");

  return (
    <div className={styles.band}>
      {/*
       * Plain HTML, never `aggregateRating`. The rating is real and worth
       * showing, but self-serving review markup on a LocalBusiness is against
       * Google's policy and risks a manual action (hard rule 7).
       */}
      <section aria-labelledby="resenas" data-rv>
        <h2 className={styles.reviewScore} id="resenas">
          {contacto.reviewsHeadline.replace("{rating}", rating)}
          <span className={styles.reviewStars} aria-hidden>
            ★★★★★
          </span>
        </h2>
        <p className={styles.reviewBody}>
          {contacto.reviewsBody.replace("{count}", count)}
        </p>
        <a
          className={`${styles.reviewAction} ${styles.line}`}
          href={MAPS_URL}
          target="_blank"
          rel="noopener"
        >
          {contacto.reviewsAction}
          <span aria-hidden>→</span>
        </a>
      </section>

      <section aria-labelledby="como-llegar">
        <h2 className={styles.mapHeading} id="como-llegar" data-rv-line>
          <span>{contacto.mapHeading}</span>
        </h2>
        <p className={styles.mapBody} data-rv style={revealDelay(120)}>
          {contacto.mapBody}
        </p>

        <div data-rv style={revealDelay(200)}>
          <ContactoMap
            src={EMBED_URL}
            title={t("mapFrameTitle")}
            action={contacto.mapAction}
            consent={contacto.mapConsent}
          />
        </div>

        <div className={styles.mapFoot} data-rv style={revealDelay(260)}>
          <a
            className={`${styles.mapDirections} ${styles.line}`}
            href={MAPS_URL}
            target="_blank"
            rel="noopener"
          >
            {contacto.mapDirections}
            <span aria-hidden>→</span>
          </a>
          <p className={styles.area}>
            {`${contacto.areaLead} ${site.areaServed.join(" · ")}.`}
          </p>
        </div>
      </section>
    </div>
  );
}
