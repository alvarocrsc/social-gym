import Image from "next/image";
import type { ReactElement } from "react";

import type { ImageAsset } from "@/types/content";

import styles from "./Disciplina.module.css";

export interface CoachTagProps {
  name: string;
  image?: ImageAsset;
  role?: string;
  size?: "sm" | "lg";
}

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

/**
 * A coach, wherever one is named — the timetable column, the weekend card, the
 * sidebar. Falls back to a monogram until a portrait and its consent land, so
 * the layout is already correct when `coaches.ts` gains an image.
 */
export function CoachTag({
  name,
  image,
  role,
  size = "sm",
}: CoachTagProps): ReactElement {
  const hasImage = image !== undefined && image.src !== "";

  return (
    <span className={styles.coachTag} data-size={size}>
      <span className={styles.coachAvatar} aria-hidden>
        {hasImage ? (
          <Image
            className={styles.coachAvatarImage}
            src={image.src}
            alt=""
            width={image.width}
            height={image.height}
          />
        ) : (
          initialsOf(name)
        )}
      </span>
      <span className={styles.coachIdentity}>
        <span className={styles.coachName}>{name}</span>
        {role !== undefined && role !== "" ? (
          <span className={styles.coachRole}>{role}</span>
        ) : null}
      </span>
    </span>
  );
}
