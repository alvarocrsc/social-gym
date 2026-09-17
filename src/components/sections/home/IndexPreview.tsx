import Image from "next/image";
import type { CSSProperties, ReactElement } from "react";

import type { Discipline } from "@/types/content";

import styles from "./Home.module.css";
import { cardPhoto } from "./slot";

export interface IndexPreviewProps {
  items: Discipline[];
}

export function IndexPreview({ items }: IndexPreviewProps): ReactElement {
  const total = String(items.length).padStart(2, "0");
  const stripStyle = { "--frames": items.length } as CSSProperties;

  return (
    <div className={styles.preview} data-preview aria-hidden>
      <div className={styles.previewCard}>
        <div className={styles.previewStrip} style={stripStyle} data-strip>
          {items.map((discipline, position) => {
            const photo = cardPhoto(discipline);
            return (
              <div key={discipline.slug} className={styles.previewFrame}>
                {photo === "" ? (
                  <span className={styles.previewPlaceholder}>
                    {discipline.code}
                  </span>
                ) : (
                  <Image
                    className={styles.previewImage}
                    src={photo}
                    alt=""
                    fill
                    sizes="320px"
                  />
                )}
                <span className={styles.previewMeta}>
                  <span>{discipline.code}</span>
                  <span>{`${String(position + 1).padStart(2, "0")} / ${total}`}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
