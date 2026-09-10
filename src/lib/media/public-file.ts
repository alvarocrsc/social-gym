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
