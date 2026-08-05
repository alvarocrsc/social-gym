/**
 * Colour values for generated Open Graph images.
 *
 * Satori — the renderer behind `next/og` — resolves neither CSS custom
 * properties nor `var()`, so `src/styles/tokens.css` cannot be read at image
 * build time. This module is the one deliberate exception to "no hex outside
 * tokens.css", kept as a single importable file rather than inline literals so
 * that a token change has one greppable place to follow.
 *
 * Every constant here mirrors a token. Change them together.
 */

/** Mirrors `--color-base` in src/styles/tokens.css. */
export const OG_COLOR_BASE = "#050506";

/** Mirrors `--color-ink` in src/styles/tokens.css. */
export const OG_COLOR_INK = "#f2f2f5";

/** Mirrors `--color-ink-muted` in src/styles/tokens.css. */
export const OG_COLOR_INK_MUTED = "rgba(255,255,255,.62)";

/** Mirrors `--color-accent` in src/styles/tokens.css. */
export const OG_COLOR_ACCENT = "#5a78ff";
