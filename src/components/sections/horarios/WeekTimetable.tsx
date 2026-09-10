import { getTranslations } from "next-intl/server";
import type { ReactElement } from "react";

import {
  classSchedule,
  classScheduleLastUpdated,
} from "@/content/class-schedule";
import { classTypes } from "@/content/class-types";
import { coaches } from "@/content/coaches";
import { horarios } from "@/content/horarios";
import type { ClassSlot, ClassType, DayCode } from "@/types/content";

import { ClassChip } from "./ClassChip";
import { DayAgenda } from "./DayAgenda";
import { Filters } from "./Filters";
import styles from "./Horarios.module.css";
import { toClock, toMinutes } from "./reveal";

const DAY_ORDER: DayCode[] = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const COLUMN_STAGGER_MS = 60;
const ROW_STAGGER_MS = 40;

function typeFor(slug: string): ClassType | undefined {
  return classTypes.find((entry) => entry.slug === slug);
}

export async function WeekTimetable(): Promise<ReactElement> {
  const short = await getTranslations("DaysShort");
  const long = await getTranslations("Days");

  // `satisfies` keeps the literal types, which hides the optional
  // `durationMin` that only a handful of slots would ever carry.
  const schedule: ClassSlot[] = classSchedule;

  const days = DAY_ORDER.filter((day) =>
    schedule.some((slot) => slot.day === day),
  );
  const starts = [...new Set(schedule.map((slot) => slot.start))].sort(
    (a, b) => toMinutes(a) - toMinutes(b),
  );

  const usedTypes = classTypes.filter((entry) =>
    schedule.some((slot) => slot.classSlug === entry.slug),
  );
  const usedCoaches = coaches.filter((coach) =>
    schedule.some((slot) => slot.coachSlug === coach.slug),
  );

  return (
    <section
      className={`${styles.section} ${styles.sectionRule}`}
      id={horarios.weekAnchor}
      aria-labelledby="clases-dirigidas"
      data-week
    >
      <div className={styles.sectionHead}>
        <h2 className={styles.sectionTitle} id="clases-dirigidas" data-rv>
          {horarios.weekHeading}
        </h2>
        <span className={styles.sectionMeta} data-rv>
          {`${String(schedule.length)} clases · ${String(usedTypes.length)} formatos · semana tipo`}
        </span>
      </div>

      <Filters classTypes={usedTypes} coaches={usedCoaches} />

      <div
        className={styles.tableScroll}
        tabIndex={0}
        role="region"
        aria-label={horarios.weekHeading}
        data-rv
      >
        <table className={styles.table} data-timetable>
          <caption className="sr-only">{horarios.weekHeading}</caption>
          <thead>
            <tr>
              <th className={styles.hourHead} scope="col">
                {horarios.hourColumn}
              </th>
              {days.map((day) => (
                <th
                  className={styles.dayHead}
                  key={day}
                  scope="col"
                  data-day={day}
                >
                  <span className={styles.dayHeadLabel}>{short(day)}</span>
                  <span className={styles.todayFlag}>
                    {horarios.todayLabel}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {starts.map((start, rowIndex) => (
              <tr className={styles.row} key={start} data-start={start}>
                <th className={styles.hourCell} scope="row">
                  {start}
                </th>
                {days.map((day, columnIndex) => {
                  const slots = schedule.filter(
                    (slot) => slot.day === day && slot.start === start,
                  );

                  return (
                    <td
                      className={styles.slotCell}
                      key={day}
                      data-day={day}
                      data-empty={slots.length === 0 ? "" : undefined}
                    >
                      {slots.length === 0 ? (
                        <span className={styles.emptyCell} aria-hidden>
                          ·
                        </span>
                      ) : (
                        <ul className={styles.slotStack}>
                          {slots.map((slot) => {
                            const classType = typeFor(slot.classSlug);
                            if (classType === undefined) return null;
                            const durationMin =
                              slot.durationMin ?? classType.durationMin;
                            return (
                              <li key={`${slot.classSlug}-${slot.start}`}>
                                <ClassChip
                                  classType={classType}
                                  day={day}
                                  dayLabel={long(day)}
                                  start={slot.start}
                                  durationMin={durationMin}
                                  end={toClock(
                                    toMinutes(slot.start) + durationMin,
                                  )}
                                  coach={coaches.find(
                                    (entry) => entry.slug === slot.coachSlug,
                                  )}
                                  delay={
                                    columnIndex * COLUMN_STAGGER_MS +
                                    rowIndex * ROW_STAGGER_MS
                                  }
                                />
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DayAgenda
        days={days}
        dayLabel={long}
        todayLabel={horarios.todayLabel}
        schedule={schedule}
        classTypes={classTypes}
        coaches={coaches}
      />

      <p className={styles.noMatch} data-no-match hidden>
        {horarios.emptyFiltered}
      </p>

      <p className={styles.footnote} data-rv>
        <span>{horarios.weekFootnote}</span>
        <span>{`${horarios.lastUpdatedLabel} ${classScheduleLastUpdated}`}</span>
      </p>
    </section>
  );
}
