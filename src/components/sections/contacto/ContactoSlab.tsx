import Image from "next/image";
import type { ReactElement } from "react";

import { contacto } from "@/content/contacto";
import { legalNav } from "@/content/nav";
import { site } from "@/content/site";
import { Link } from "@/i18n/navigation";
import { existingImage } from "@/lib/media/public-file";

import styles from "./Contacto.module.css";
import { revealDelay } from "./reveal";

const ATHLETE_SRC = "/contacto/atleta.png";
const MONOGRAM_SRC = "/white-logo.png";
const LEGAL_STEP_MS = 70;

export function ContactoSlab(): ReactElement {
  // Declared whether or not the file is on disk: dropping the cut-out into
  // `public/contacto/` is the only step needed to make it appear, and until
  // then the halo, monogram and wordmark still compose on their own.
  const athlete = existingImage(ATHLETE_SRC);

  return (
    <section className={styles.slab} aria-labelledby="legal">
      <div className={styles.slabTop}>
        <div>
          <h2 className={styles.label} id="legal" data-rv>
            {contacto.legalLabel}
          </h2>
          <ul className={styles.legalList}>
            {legalNav.map((item, index) => (
              <li
                key={item.href}
                data-rv
                style={revealDelay((index + 1) * LEGAL_STEP_MS)}
              >
                <Link
                  className={`${styles.legalLink} ${styles.line}`}
                  href={item.href}
                >
                  <span className={styles.legalIndex} aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.manifestoCell} data-rv style={revealDelay(90)}>
          <p className={styles.manifesto}>{contacto.manifesto}</p>
        </div>
      </div>

      <div className={styles.stage} data-stage>
        <span className={styles.halo} aria-hidden>
          <span className={styles.haloCore} />
        </span>

        <span className={styles.monoBox} aria-hidden>
          <Image
            className={styles.mono}
            src={MONOGRAM_SRC}
            alt=""
            width={1600}
            height={1600}
            sizes="(min-width: 48rem) 28vw, 220px"
          />
        </span>

        {athlete === "" ? null : (
          <div className={styles.athlete}>
            <Image
              className={styles.athleteImage}
              src={athlete}
              alt=""
              fill
              sizes="(min-width: 48rem) 52vw, 100vw"
            />
          </div>
        )}

        <div className={styles.wordmark}>
          <span className={styles.wordmarkText}>{site.name.toUpperCase()}</span>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <span>
          {`© ${String(new Date().getFullYear())} ${site.name} · ${site.address.locality}`}
        </span>
        <Link
          className={`${styles.bottomAction} ${styles.line}`}
          href="/membresias"
        >
          {contacto.slabAction}
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
