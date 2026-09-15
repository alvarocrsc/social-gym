import { schedule } from "@/content/schedule";
import type { DayCode, ScheduleBlock } from "@/types/content";

// `satisfies` in `schedule.ts` keeps the literal day tuples, which narrows
// `days` past `DayCode` and makes `includes` uncallable. Widened once here.
const blocks: ScheduleBlock[] = schedule;

const DAY_CODES: DayCode[] = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const DAY_MINUTES = 24 * 60;

const WEEKDAY_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

export interface OpenState {
  open: boolean;
  /** Index in `schedule` of the band that is live right now. */
  activeIndex: number | null;
  /** Closing time while open, next opening time while closed. */
  time: string;
  /** Set only when the next opening is not today. */
  day: DayCode | null;
}

function minutesOf(time: string): number {
  const [h = "0", m = "0"] = time.split(":");
  return Number(h) * 60 + Number(m);
}

/**
 * The clock in Calahorra, not the visitor's.
 *
 * Someone checking from another timezone still needs to know whether the door
 * is open, so the weekday and time are read in `Europe/Madrid` regardless of
 * where the browser is.
 */
export function madridClock(now: Date): { dayIndex: number; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Madrid",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);

  const find = (type: Intl.DateTimeFormatPartTypes): string =>
    parts.find((part) => part.type === type)?.value ?? "";

  return {
    dayIndex: WEEKDAY_INDEX[find("weekday")] ?? 0,
    minutes: Number(find("hour")) * 60 + Number(find("minute")),
  };
}

function bandOn(dayIndex: number): number {
  const code = DAY_CODES[dayIndex];
  if (code === undefined) return -1;
  return blocks.findIndex((block) => block.days.includes(code));
}

/** Whether the gym is open, and the next time that changes. */
export function resolveOpenState(now: Date): OpenState {
  const { dayIndex, minutes } = madridClock(now);

  const todayIndex = bandOn(dayIndex);
  const today = todayIndex === -1 ? undefined : blocks[todayIndex];

  if (today !== undefined) {
    const opens = minutesOf(today.opens);
    const closes = minutesOf(today.closes);
    // A band that closes at or before it opens runs past midnight, so its
    // real end is on the following day.
    const ends = closes <= opens ? closes + DAY_MINUTES : closes;
    if (minutes >= opens && minutes < ends) {
      return {
        open: true,
        activeIndex: todayIndex,
        time: today.closes,
        day: null,
      };
    }
  }

  // Still inside yesterday's overnight band — 00:30 on a Tuesday belongs to
  // Monday's 06:00–01:00.
  const yesterdayIndex = bandOn((dayIndex + 6) % 7);
  const yesterday = yesterdayIndex === -1 ? undefined : blocks[yesterdayIndex];
  if (yesterday !== undefined) {
    const opens = minutesOf(yesterday.opens);
    const closes = minutesOf(yesterday.closes);
    if (closes <= opens && minutes < closes) {
      return {
        open: true,
        activeIndex: yesterdayIndex,
        time: yesterday.closes,
        day: null,
      };
    }
  }

  if (today !== undefined && minutes < minutesOf(today.opens)) {
    return { open: false, activeIndex: null, time: today.opens, day: null };
  }

  for (let ahead = 1; ahead <= 7; ahead += 1) {
    const index = bandOn((dayIndex + ahead) % 7);
    const block = index === -1 ? undefined : blocks[index];
    if (block === undefined) continue;
    return {
      open: false,
      activeIndex: null,
      time: block.opens,
      day: DAY_CODES[(dayIndex + ahead) % 7] ?? null,
    };
  }

  return { open: false, activeIndex: null, time: "", day: null };
}

export interface OpenStateCopy {
  open: string;
  closed: string;
  opensAt: string;
  opensOn: string;
}

export function describeOpenState(
  state: OpenState,
  copy: OpenStateCopy,
  dayNames: Record<DayCode, string>,
): string {
  if (state.open) return copy.open.replace("{time}", state.time);
  if (state.time === "") return copy.closed;
  if (state.day === null) return copy.opensAt.replace("{time}", state.time);
  return copy.opensOn
    .replace("{day}", dayNames[state.day].toLowerCase())
    .replace("{time}", state.time);
}
