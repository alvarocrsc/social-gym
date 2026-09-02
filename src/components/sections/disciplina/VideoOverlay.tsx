"use client";

import { useRef, type ReactElement } from "react";

import { lockScroll } from "@/lib/motion/scroll-lock";
import type { HeroVideoSource } from "@/types/content";

import styles from "./Disciplina.module.css";

export interface VideoOverlayProps {
  sources: readonly HeroVideoSource[];
  poster: string | undefined;
  playLabel: string;
  closeLabel: string;
  title: string;
}

/**
 * `'use client'` — opening a modal dialog is an interaction.
 *
 * A native `<dialog showModal>` is used rather than a hand-built overlay: it
 * brings the focus trap, the `Escape` handler, the inert backdrop and the
 * `dialog` role with it, all of which §12 requires.
 */
export function VideoOverlay({
  sources,
  poster,
  playLabel,
  closeLabel,
  title,
}: VideoOverlayProps): ReactElement {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  function open(): void {
    dialogRef.current?.showModal();
    lockScroll(true);
    void videoRef.current?.play();
  }

  function close(): void {
    dialogRef.current?.close();
  }

  function onClose(): void {
    lockScroll(false);
    videoRef.current?.pause();
  }

  return (
    <>
      <button
        type="button"
        className={styles.playButton}
        onClick={open}
        aria-label={playLabel}
      >
        <span className={styles.playRing} aria-hidden />
        <span className={styles.playGlyph} aria-hidden />
      </button>

      <dialog
        ref={dialogRef}
        className={styles.overlay}
        onClose={onClose}
        aria-label={`${playLabel} — ${title}`}
      >
        <div className={styles.overlayFrame}>
          <video
            ref={videoRef}
            className={styles.overlayVideo}
            poster={poster}
            controls
            playsInline
            preload="none"
          >
            {sources.map((source) => (
              <source key={source.src} src={source.src} type={source.type} />
            ))}
          </video>
          <span className={styles.overlayScan} aria-hidden />
        </div>

        <button type="button" className={styles.overlayClose} onClick={close}>
          {`${closeLabel} ✕`}
        </button>
      </dialog>
    </>
  );
}
