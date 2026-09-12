import Image from "next/image";
import type { ReactElement } from "react";

import { footer } from "@/content/footer";
import { legalNav } from "@/content/nav";
import { site } from "@/content/site";
import { Link } from "@/i18n/navigation";
import { existingImage } from "@/lib/media/public-file";

import { FooterMotion } from "./FooterMotion";
import styles from "./SiteFooter.module.css";

const ATHLETE_SRC = "/footer/atleta.png";
const MONOGRAM_SRC = "/white-logo.png";
const LEGAL_STEP_MS = 70;
const LEGAL_LABEL_ID = "footer-legal";

function revealDelay(ms: number): React.CSSProperties {
  return { "--rv-delay": `${String(ms)}ms` } as React.CSSProperties;
}

export function SiteFooter(): ReactElement {
  const athlete = existingImage(ATHLETE_SRC);

  return (
    <FooterMotion>
      <div className={styles.top}>
        <nav className={styles.legalNav} aria-labelledby={LEGAL_LABEL_ID}>
          <span className={styles.label} id={LEGAL_LABEL_ID} data-rv>
            {footer.legalLabel}
          </span>
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
        </nav>

        <div className={styles.manifestoCell} data-rv style={revealDelay(90)}>
          <p className={styles.manifesto}>{footer.manifesto}</p>
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
          {footer.action}
          <span aria-hidden>→</span>
        </Link>
      </div>
    </FooterMotion>
  );
}
