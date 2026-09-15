import Image from "next/image";
import { Fragment, type ReactElement } from "react";

import { Link } from "@/i18n/navigation";
import { existingImage } from "@/lib/media/public-file";
import { disciplinePathname } from "@/lib/seo/routes";
import type { Discipline } from "@/types/content";

import styles from "./Home.module.css";
import { revealDelay } from "./reveal";

export interface IndexRowProps {
  discipline: Discipline;
  position: number;
}

function Words({ text }: { text: string }): ReactElement {
  return (
    <>
      {text.split(" ").map((word, index) => (
        <Fragment key={`${word}-${String(index)}`}>
          {index === 0 ? null : " "}
          <span className={styles.rowWord}>{word}</span>
        </Fragment>
      ))}
    </>
  );
}

export function IndexRow({
  discipline,
  position,
}: IndexRowProps): ReactElement {
  const photo = existingImage(discipline.image.src);

  return (
    <li
      className={styles.row}
      data-rv
      style={revealDelay(position < 4 ? position * 70 : 0)}
    >
      <Link
        className={styles.rowLink}
        href={disciplinePathname(discipline.slug)}
        data-row={position}
      >
        <span className={styles.rowIndex} aria-hidden>
          {String(position + 1).padStart(2, "0")}
        </span>
        <span className={styles.rowThumb} aria-hidden>
          {photo === "" ? (
            <span className={styles.rowThumbCode}>{discipline.code}</span>
          ) : (
            <Image
              className={styles.rowThumbImage}
              src={photo}
              alt=""
              fill
              sizes="112px"
            />
          )}
        </span>
        <span className={styles.rowName}>
          <span className={styles.rowNameBase}>
            <Words text={discipline.name} />
          </span>
          <span className={styles.rowNameFill} aria-hidden>
            <Words text={discipline.name} />
          </span>
        </span>
        <span className={styles.rowCode} aria-hidden>
          {discipline.code}
        </span>
        <span className={styles.rowArrow} aria-hidden>
          →
        </span>
      </Link>
    </li>
  );
}
