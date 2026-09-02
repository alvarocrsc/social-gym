import Image from "next/image";
import type { ReactElement } from "react";

import { disciplina } from "@/content/disciplina";
import type { Discipline } from "@/types/content";

import styles from "./Disciplina.module.css";
import { revealDelay } from "./reveal";

export interface DisciplinaGalleryProps {
  discipline: Discipline;
}

export function DisciplinaGallery({
  discipline,
}: DisciplinaGalleryProps): ReactElement {
  const { gallery } = discipline;
  const videoCount = gallery.filter(
    (piece) => piece.video !== undefined && piece.video.length > 0,
  ).length;

  const meta = [
    `${String(gallery.length).padStart(2, "0")} ${disciplina.galleryPieces}`,
    videoCount > 0
      ? `${String(videoCount)} ${
          videoCount === 1 ? disciplina.galleryVideo : disciplina.galleryVideos
        }`
      : undefined,
  ]
    .filter((part) => part !== undefined)
    .join(" · ");

  return (
    <section className={styles.gallery} data-gallery aria-labelledby="galeria">
      <div className={styles.galleryStage}>
        <div className={styles.galleryHead}>
          <h2 className={styles.sectionTitle} id="galeria" data-rv>
            {disciplina.galleryHeading}
          </h2>
          <span className={styles.sectionMeta} data-rv style={revealDelay(120)}>
            {meta}
          </span>
        </div>

        <div className={styles.galleryViewport}>
          <ul className={styles.galleryTrack} data-gallery-track>
            {gallery.map((piece, i) => {
              const hasImage = piece.image.src !== "";
              const hasVideo =
                piece.video !== undefined && piece.video.length > 0;

              return (
                <li
                  key={piece.caption}
                  className={styles.piece}
                  data-piece
                  data-span={piece.span}
                >
                  <div className={styles.pieceMedia} aria-hidden>
                    {hasImage ? (
                      <Image
                        className={styles.pieceImage}
                        src={piece.image.src}
                        alt=""
                        fill
                        sizes="(min-width: 48rem) 40vw, 78vw"
                      />
                    ) : (
                      <div className={styles.piecePlaceholder}>
                        <span className={styles.piecePlaceholderIndex}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{discipline.code}</span>
                      </div>
                    )}
                    {hasVideo ? (
                      <video
                        className={styles.pieceVideo}
                        poster={hasImage ? piece.image.src : undefined}
                        muted
                        loop
                        playsInline
                        preload="none"
                        tabIndex={-1}
                        data-piece-video
                      >
                        {piece.video?.map((source) => (
                          <source
                            key={source.src}
                            src={source.src}
                            type={source.type}
                          />
                        ))}
                      </video>
                    ) : null}
                  </div>

                  {hasVideo ? (
                    <span className={styles.pieceBadge}>
                      <span className={styles.pieceBadgeGlyph} aria-hidden />
                      {`${disciplina.galleryVideo} ${piece.duration ?? ""}`.trim()}
                    </span>
                  ) : null}

                  <p className={styles.pieceCaption}>
                    {`${String(i + 1).padStart(2, "0")} · ${piece.caption}`}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
