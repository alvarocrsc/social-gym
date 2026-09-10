"use client";

import { useEffect, useState, type ReactElement } from "react";

import { schedule } from "@/content/schedule";
import type { DayCode } from "@/types/content";

import { resolveOpenState, type OpenState } from "./clock";
import styles from "./Contacto.module.css";

export interface OpeningNowProps {
  label: string;
  /** Day names for the "opens on …" case, from the `Days` message group. */
  dayNames: Record<DayCode, string>;
  copy: {
    open: string;
    closed: string;
    opensAt: string;
    opensOn: string;
  };
}

const REFRESH_MS = 60_000;

function sentence(
  state: OpenState,
  copy: OpeningNowProps["copy"],
  dayNames: Record<DayCode, string>,
): string {
  if (state.open) return copy.open.replace("{time}", state.time);
  if (state.time === "") return copy.closed;
  if (state.day === null) return copy.opensAt.replace("{time}", state.time);
  return copy.opensOn
    .replace("{day}", dayNames[state.day].toLowerCase())
    .replace("{time}", state.time);
}

/**
 * `'use client'` — "abierto ahora" is only true relative to a clock, and a
 * statically generated page has none.
 *
 * The hours themselves are the indexable content and render identically on the
 * server; only the live line and the highlighted band wait for hydration, so
 * the first client render matches the server's and nothing shifts.
 */
export function OpeningNow({
  label,
  dayNames,
  copy,
}: OpeningNowProps): ReactElement {
  const [state, setState] = useState<OpenState | null>(null);

  useEffect(() => {
    function tick(): void {
      setState(resolveOpenState(new Date()));
    }
    tick();
    const timer = window.setInterval(tick, REFRESH_MS);
    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <span className={styles.label}>{label}</span>

      <ul className={styles.hours}>
        {schedule.map((block, index) => (
          <li
            className={styles.hoursRow}
            key={block.label}
            data-active={state?.activeIndex === index ? "" : undefined}
          >
            <span>{block.label}</span>
            <span className={styles.hoursTime}>
              {`${block.opens} – ${block.closes}`}
            </span>
          </li>
        ))}
      </ul>

      <p
        className={styles.status}
        data-state={state === null ? undefined : state.open ? "open" : "closed"}
      >
        <span className={styles.statusDot} aria-hidden />
        {state === null ? "" : sentence(state, copy, dayNames)}
      </p>
    </div>
  );
}
