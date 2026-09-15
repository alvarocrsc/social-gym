"use client";

import { useEffect, useState, type ReactElement } from "react";

import { schedule } from "@/content/schedule";
import {
  describeOpenState,
  resolveOpenState,
  type OpenState,
  type OpenStateCopy,
} from "@/lib/schedule/open-state";
import type { DayCode } from "@/types/content";

import styles from "./Home.module.css";

export interface VisitHoursProps {
  dayNames: Record<DayCode, string>;
  copy: OpenStateCopy;
}

const REFRESH_MS = 60_000;

export function VisitHours({ dayNames, copy }: VisitHoursProps): ReactElement {
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
    <>
      <ul className={styles.hours}>
        {schedule.map((block, index) => (
          <li
            key={block.label}
            className={styles.hoursRow}
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
        {state === null ? "" : describeOpenState(state, copy, dayNames)}
      </p>
    </>
  );
}
