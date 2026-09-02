import type { CSSProperties } from "react";

/** Stagger for `[data-rv]` reveals, consumed as `--rv-delay` in the module. */
export function revealDelay(ms: number): CSSProperties {
  return { "--rv-delay": `${String(ms)}ms` } as CSSProperties;
}

/** Index a ring or dot uses to pick its stop on the accent ramp. */
export function rampIndex(name: string, i: number): CSSProperties {
  return { [name]: i } as CSSProperties;
}
