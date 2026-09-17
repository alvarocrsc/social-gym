import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { ReactElement } from "react";

import { contacto } from "@/content/contacto";
import { site } from "@/content/site";
import { existingImage } from "@/lib/media/public-file";
import type { DayCode } from "@/types/content";

import styles from "./Contacto.module.css";
import { OpeningNow } from "./OpeningNow";

const DAY_CODES: DayCode[] = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

export const MAPS_URL = `https://www.google.com/maps/place/?q=place_id:${site.googlePlaceId}`;

export async function ContactoPlane(): Promise<ReactElement> {
  const days = await getTranslations("Days");
  const dayNames = Object.fromEntries(
    DAY_CODES.map((code) => [code, days(code)]),
  ) as Record<DayCode, string>;

  // `site.ts` is `as const`, so an unresolved field is the literal type `""`
  // and comparing it would be provably false rather than a runtime check.
  const whatsapp: string = site.whatsapp;
  const hasWhatsapp = whatsapp !== "";

  const { address } = site;
  const photo = existingImage(contacto.heroImage);

  return (
    <section className={styles.plane} aria-labelledby="contacto-titulo">
      {photo === "" ? null : (
        <>
          <div className={styles.planeMedia} aria-hidden>
            <Image
              className={styles.planeImage}
              src={photo}
              alt=""
              fill
              sizes="100vw"
            />
          </div>
          <div className={styles.planeScrim} aria-hidden />
        </>
      )}
      <div className={styles.column}>
        <div>
          <span className={styles.label}>{contacto.whereLabel}</span>
          <address className={styles.address}>
            <a
              className={styles.line}
              href={MAPS_URL}
              target="_blank"
              rel="noopener"
            >
              {address.street}
              <br />
              {`${address.postalCode} ${address.locality}`}
              <br />
              {`${address.region}, ${address.countryLabel}`}
            </a>
          </address>
          <a
            className={`${styles.addressAction} ${styles.line}`}
            href={MAPS_URL}
            target="_blank"
            rel="noopener"
          >
            {contacto.whereAction}
            <span aria-hidden>→</span>
          </a>
        </div>

        <OpeningNow
          label={contacto.whenLabel}
          dayNames={dayNames}
          copy={{
            open: contacto.statusOpen,
            closed: contacto.statusClosed,
            opensAt: contacto.statusOpensAt,
            opensOn: contacto.statusOpensOn,
          }}
        />
      </div>

      <div className={styles.column}>
        <div>
          <span className={styles.label}>{contacto.talkLabel}</span>
          <div className={styles.channels}>
            <a
              className={`${styles.channel} ${styles.line}`}
              href={`tel:${site.phone}`}
              aria-label={`${contacto.phoneLabel} ${site.phoneDisplay}`}
            >
              {site.phoneDisplay}
            </a>
            {hasWhatsapp ? (
              <a
                className={`${styles.channel} ${styles.line}`}
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener"
              >
                {contacto.whatsappLabel}
              </a>
            ) : null}
            <a
              className={`${styles.channel} ${styles.line}`}
              href={`mailto:${site.email}`}
              aria-label={`${contacto.emailLabel} ${site.email}`}
            >
              {site.email}
            </a>
          </div>
        </div>

        <div>
          <span className={styles.label}>{contacto.followLabel}</span>
          <div className={styles.channels}>
            <a
              className={`${styles.channel} ${styles.line}`}
              href={site.socials.instagram}
              target="_blank"
              rel="noopener"
            >
              {contacto.instagramLabel}
            </a>
          </div>
        </div>
      </div>

      <div className={styles.invite}>
        <h1 className={styles.inviteTitle} id="contacto-titulo">
          <span>{contacto.headlineSolid}</span>
          <span>{contacto.headlineOutlined}</span>
          <span className={styles.inviteKeyword}>{contacto.keywordLine}</span>
        </h1>

        <p className={styles.inviteLead}>{contacto.lead}</p>

        <div className={styles.actions}>
          <a
            className={styles.actionPill}
            href={
              hasWhatsapp ? `https://wa.me/${whatsapp}` : `tel:${site.phone}`
            }
            target={hasWhatsapp ? "_blank" : undefined}
            rel={hasWhatsapp ? "noopener" : undefined}
          >
            <span className={styles.actionLabel}>
              {hasWhatsapp
                ? contacto.actionWhatsapp
                : `${contacto.actionPhone} · ${site.phoneDisplay}`}
            </span>
            <span className={styles.actionGlyph} aria-hidden>
              →
            </span>
          </a>

          {hasWhatsapp ? (
            <a
              className={`${styles.actionSecondary} ${styles.line}`}
              href={`tel:${site.phone}`}
              aria-label={`${contacto.phoneLabel} ${site.phoneDisplay}`}
            >
              {site.phoneDisplay}
            </a>
          ) : (
            <a
              className={`${styles.actionSecondary} ${styles.line}`}
              href={`mailto:${site.email}`}
              aria-label={`${contacto.emailLabel} ${site.email}`}
            >
              {site.email}
            </a>
          )}

          <p className={styles.actionNote}>{contacto.actionNote}</p>
        </div>
      </div>
    </section>
  );
}
