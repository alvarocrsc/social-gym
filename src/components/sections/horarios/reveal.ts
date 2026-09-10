import type { CSSProperties } from "react";

export function revealDelay(ms: number): CSSProperties {
  return { "--rv-delay": `${String(ms)}ms` } as CSSProperties;
}

export function cssVars(vars: Record<string, string | number>): CSSProperties {
  return vars as CSSProperties;
}

export function toMinutes(time: string): number {
  const [h = "0", m = "0"] = time.split(":");
  return Number(h) * 60 + Number(m);
}

export function toClock(minutes: number): string {
  const h = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}
