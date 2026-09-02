import { getTranslations } from "next-intl/server";
import type { ReactElement } from "react";

import { classSchedule } from "@/content/class-schedule";
import { coaches } from "@/content/coaches";
import { disciplina } from "@/content/disciplina";
import { Link } from "@/i18n/navigation";
import type { ClassSlot, DayCode, Discipline } from "@/types/content";

import { CoachTag } from "./CoachTag";
import styles from "./Disciplina.module.css";
import { revealDelay } from "./reveal";
import { WeekTimetable, type WeekTimetableRow } from "./WeekTimetable";

export interface DisciplinaScheduleProps {
  discipline: Discipline;
}

const WEEKDAYS: DayCode[] = ["Mo", "Tu", "We", "Th", "Fr"];
const DAY_ORDER: DayCode[] = [...WEEKDAYS, "Sa", "Su"];
const MIN_COLUMNS = 4;

function toHours(time: string): number {
  const [h = "0", m = "0"] = time.split(":");
  return Number(h) + Number(m) / 60;
}

function toClock(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function coachFor(slug: string | undefined) {
  return coaches.find((coach) => coach.slug === slug);
}

/** The hour every session but the odd one out starts at. */
function modalStart(slots: ClassSlot[]): string | undefined {
  const tally = new Map<string, number>();
  slots.forEach((slot) => {
    tally.set(slot.start, (tally.get(slot.start) ?? 0) + 1);
  });
  return [...tally.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
}

export async function DisciplinaSchedule({
  discipline,
}: DisciplinaScheduleProps): Promise<ReactElement> {
  const t = await getTranslations("Days");

  const slots = classSchedule
    .filter((slot) => slot.disciplineSlug === discipline.slug)
    .sort((a, b) => DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day));

  const week = slots.filter((slot) => WEEKDAYS.includes(slot.day));
  const weekend = slots.filter((slot) => !WEEKDAYS.includes(slot.day));

  if (slots.length === 0) {
    return (
      <section className={styles.section} aria-labelledby="horarios">
        <ScheduleHead />
        <div className={styles.panel} data-rv>
          <p className={styles.panelBody}>{disciplina.schedulePending}</p>
          <Link className={styles.pill} href="/contacto">
            {`${disciplina.coachAction} →`}
          </Link>
        </div>
      </section>
    );
  }

  // The ruler window is grown symmetrically to MIN_COLUMNS so a week that all
  // happens inside two hours still reads as a position in the evening rather
  // than as two full-width bars.
  const bounds = week.map((slot) => ({
    start: toHours(slot.start),
    end: toHours(slot.start) + slot.durationMin / 60,
  }));
  let windowStart = Math.floor(Math.min(...bounds.map((b) => b.start)));
  let windowEnd = Math.ceil(Math.max(...bounds.map((b) => b.end)));
  const pad = Math.max(0, MIN_COLUMNS - (windowEnd - windowStart));
  windowStart = Math.max(0, windowStart - Math.ceil(pad / 2));
  windowEnd = Math.min(24, windowEnd + Math.floor(pad / 2));
  const span = windowEnd - windowStart;

  // Only hoisted to the card header when a single session owns it; two
  // weekend sessions with different coaches would read as unattributed.
  const soloCoach =
    weekend.length === 1 ? coachFor(weekend[0]?.coachSlug) : undefined;

  const usual = modalStart(week);
  const rows: WeekTimetableRow[] = week.map((slot) => {
    const start = toHours(slot.start);
    return {
      id: slot.day,
      day: t(slot.day),
      time: `${slot.start}–${toClock(start + slot.durationMin / 60)}`,
      coach: coachFor(slot.coachSlug),
      offset: (start - windowStart) / span,
      width: slot.durationMin / 60 / span,
      outlier: slot.start !== usual,
    };
  });

  return (
    <section className={styles.section} aria-labelledby="horarios">
      <ScheduleHead />

      <div className={styles.scheduleGrid}>
        {rows.length > 0 ? (
          <div>
            <p className={styles.rulerHead} data-rv>
              {disciplina.scheduleWeek}
            </p>
            <WeekTimetable
              caption={`${disciplina.scheduleHeading} — ${discipline.name}`}
              columns={disciplina.scheduleColumns}
              ticks={Array.from({ length: span }, (_, i) =>
                String(windowStart + i),
              )}
              rows={rows}
            />
          </div>
        ) : null}

        {weekend.length > 0 ? (
          <div className={styles.panel} data-rv style={revealDelay(160)}>
            <div className={styles.panelHead}>
              <span className={styles.eyebrow}>
                {disciplina.scheduleWeekend}
              </span>
              {soloCoach !== undefined ? (
                <CoachTag
                  name={soloCoach.name}
                  image={soloCoach.image}
                  role={soloCoach.role}
                />
              ) : null}
            </div>

            {weekend.map((slot) => {
              const end = toClock(toHours(slot.start) + slot.durationMin / 60);
              const coach = coachFor(slot.coachSlug);
              return (
                <div key={slot.day}>
                  <p className={styles.panelTitle}>{t(slot.day)}</p>
                  <div className={styles.weekendTimeRow}>
                    <p className={styles.weekendTime}>
                      {slot.start}
                      <span className={styles.weekendTimeEnd}>{`–${end}`}</span>
                    </p>
                    <span className={styles.pillStatic}>
                      {`${String(slot.durationMin)} min`}
                    </span>
                  </div>
                  {soloCoach === undefined && coach !== undefined ? (
                    <CoachTag
                      name={coach.name}
                      image={coach.image}
                      role={coach.role}
                    />
                  ) : null}
                </div>
              );
            })}

            <div className={styles.panelRow}>
              <span className={styles.pillStatic}>
                {disciplina.scheduleLimited}
              </span>
              <span className={`${styles.pillStatic} ${styles.pillAccent}`}>
                {disciplina.scheduleBooking}
              </span>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ScheduleHead(): ReactElement {
  return (
    <div className={styles.scheduleHead}>
      <h2 className={styles.sectionTitle} id="horarios" data-rv>
        {disciplina.scheduleHeading}
      </h2>
      <Link
        className={styles.pill}
        href="/horarios"
        data-rv
        style={revealDelay(120)}
      >
        {`${disciplina.scheduleAction} →`}
      </Link>
    </div>
  );
}
