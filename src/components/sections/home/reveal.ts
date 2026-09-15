import type { CSSProperties } from "react";

export function revealDelay(ms: number): CSSProperties {
  return { "--rv-delay": `${String(ms)}ms` } as CSSProperties;
}
