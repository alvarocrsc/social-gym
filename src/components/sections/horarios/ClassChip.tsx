import Image from "next/image";
import type { ReactElement } from "react";

import { disciplines } from "@/content/disciplines";
import { Link } from "@/i18n/navigation";
import { existingImage } from "@/lib/media/public-file";
import { disciplinePathname } from "@/lib/seo/routes";
import type { ClassType, Coach } from "@/types/content";

import styles from "./Horarios.module.css";
import { cssVars } from "./reveal";

export interface ClassChipProps {
  classType: ClassType;
  day: string;
  dayLabel: string;
  start: string;
  end: string;
  durationMin: number;
  coach: Coach | undefined;
  delay: number;
}

export function ClassChip({
  classType,
  day,
  dayLabel,
  start,
  end,
  durationMin,
  coach,
  delay,
}: ClassChipProps): ReactElement {
  const discipline = disciplines.find(
    (entry) => entry.slug === classType.disciplineSlug,
  );
  const photo = existingImage(discipline?.image.src ?? "");
  const hasImage = photo !== "";
  const label = [dayLabel, classType.name, `${start}–${end}`, coach?.name]
    .filter((part) => part !== undefined)
    .join(", ");

  const inner = (
    <>
      <span className={styles.classMedia} aria-hidden>
        {hasImage ? (
          <Image
            className={styles.classImage}
            src={photo}
            alt=""
            fill
            sizes="(min-width: 48rem) 200px, 150px"
          />
        ) : (
          <span className={styles.classImageFallback} />
        )}
      </span>
      <span className={styles.classScrim} aria-hidden />

      <span className={styles.classBody}>
        <span className={styles.className}>{classType.name}</span>
        <span className={styles.classFoot}>
          <span className={styles.classLength}>
            {`${String(durationMin)}′`}
          </span>
          {coach === undefined ? null : (
            <span className={styles.classCoach}>{coach.name}</span>
          )}
        </span>
      </span>
    </>
  );

  const shared = {
    className: styles.classChip,
    "data-class": classType.slug,
    "data-day": day,
    "data-tier": classType.tier,
    "data-coach": coach?.slug,
    "data-chip-delay": delay,
    style: cssVars({ "--duration": durationMin }),
    "aria-label": label,
    title: label,
  };

  return classType.disciplineSlug === undefined ? (
    <span {...shared}>{inner}</span>
  ) : (
    <Link {...shared} href={disciplinePathname(classType.disciplineSlug)}>
      {inner}
    </Link>
  );
}
