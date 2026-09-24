import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Returns a `/public` path only when the file is actually on disk.
 *
 * Content declares the path every discipline *would* use, so dropping a photo
 * into `public/` is the only step needed to make it appear. A declared but
 * missing file would otherwise render as a broken image, which is worse than
 * the placeholder it replaces.
 *
 * Server-only — `existsSync` runs while the pages are statically generated, so
 * a file added afterwards needs a rebuild, which a deploy does anyway.
 */
export function existingImage(src: string): string {
  if (src === "") return "";
  return existsSync(join(process.cwd(), "public", src)) ? src : "";
}

/**
 * Prefers a pre-cropped variant of an image, falling back to the original.
 *
 * `croppedImage("/disciplinas/hyrox.jpg", "chip")` looks for
 * `/disciplinas/hyrox-chip.jpg` first. Cropping in CSS costs bytes: a wide,
 * short box filled from a tall portrait discards most of every fetched pixel,
 * so the browser has to download several times the data it can show. A variant
 * already at the display shape wastes nothing.
 */
export function croppedImage(src: string, variant: string): string {
  if (src === "") return "";
  const cropped = existingImage(src.replace(/\.jpg$/, `-${variant}.jpg`));
  return cropped !== "" ? cropped : existingImage(src);
}
