import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { ReactElement } from "react";

import { contacto } from "@/content/contacto";
import { home } from "@/content/home";
import { site } from "@/content/site";
import { Link } from "@/i18n/navigation";
import type { DayCode } from "@/types/content";

import styles from "./Home.module.css";
import { revealDelay } from "./reveal";
import { resolveSlot } from "./slot";
import { VisitHours } from "./VisitHours";
import { MAPS_URL, VisitReviews } from "./VisitReviews";

const TITLE_ID = "visitanos";
const DAY_CODES: DayCode[] = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

export async function HomeVisit(): Promise<ReactElement> {
  const { visit } = home;
  const image = resolveSlot(visit.image);
  const days = await getTranslations("Days");
  const dayNames = Object.fromEntries(
    DAY_CODES.map((code) => [code, days(code)]),
  ) as Record<DayCode, string>;

  return (
    <section className={styles.visit} aria-labelledby={TITLE_ID}>
      <div className={styles.visitBody}>
        <span className={styles.eyebrow} data-rv>
          {visit.eyebrow}
        </span>
        <h2 className={styles.title} id={TITLE_ID}>
          <span className={styles.titleLine} data-rv-line>
            <span>{visit.headingSolid}</span>
          </span>
          <span
            className={`${styles.titleLine} ${styles.titleOutlined}`}
            data-rv-line
            style={revealDelay(140)}
          >
            <span>{visit.headingOutlined}</span>
          </span>
        </h2>
        <p className={styles.visitLead} data-rv style={revealDelay(160)}>
          {visit.lead}
        </p>

        <dl className={styles.info}>
          <div className={styles.infoRow} data-rv>
            <dt className={styles.infoLabel}>{visit.addressLabel}</dt>
            <dd className={styles.infoValue}>
              <address className={styles.address}>
                {site.address.street}
                <br />
                {`${site.address.postalCode} ${site.address.locality}, ${site.address.region}`}
              </address>
              <a
                className={`${styles.textAction} ${styles.line}`}
                href={MAPS_URL}
                target="_blank"
                rel="noopener"
              >
                {visit.directionsAction}
                <span aria-hidden>↗</span>
              </a>
            </dd>
          </div>
          <div className={styles.infoRow} data-rv style={revealDelay(80)}>
            <dt className={styles.infoLabel}>{visit.phoneLabel}</dt>
            <dd className={styles.infoValue}>
              <a className={styles.phone} href={`tel:${site.phone}`}>
                {site.phoneDisplay}
              </a>
            </dd>
          </div>
          <div className={styles.infoRow} data-rv style={revealDelay(160)}>
            <dt className={styles.infoLabel}>{visit.hoursLabel}</dt>
            <dd className={styles.infoValue}>
              <VisitHours
                dayNames={dayNames}
                copy={{
                  open: contacto.statusOpen,
                  closed: contacto.statusClosed,
                  opensAt: contacto.statusOpensAt,
                  opensOn: contacto.statusOpensOn,
                }}
              />
            </dd>
          </div>
        </dl>

        <div className={styles.actions} data-rv>
          <Link className={styles.cta} href="/membresias">
            <span>{visit.membershipsAction}</span>
            <span className={styles.ctaGlyph} aria-hidden>
              →
            </span>
          </Link>
          <Link
            className={`${styles.textAction} ${styles.line}`}
            href="/horarios"
          >
            {visit.scheduleAction}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      <div className={styles.visitMedia} data-parallax>
        <div className={styles.visitFrame} data-rv>
          {image === null ? null : (
            <Image
              className={styles.visitImage}
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 68rem) 40vw, 100vw"
            />
          )}
          <span className={styles.since} aria-hidden>
            {visit.since}
          </span>
        </div>

        <VisitReviews />
      </div>
    </section>
  );
}
