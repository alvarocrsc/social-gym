import type { ReactElement } from "react";

import type { ClassSlot, ClassType, Coach, DayCode } from "@/types/content";

import { ClassChip } from "./ClassChip";
import styles from "./Horarios.module.css";
import { toClock, toMinutes } from "./reveal";

export interface DayAgendaProps {
  days: DayCode[];
  dayLabel: (day: DayCode) => string;
  todayLabel: string;
  schedule: ClassSlot[];
  classTypes: ClassType[];
  coaches: Coach[];
}

export function DayAgenda({
  days,
  dayLabel,
  todayLabel,
  schedule,
  classTypes,
  coaches,
}: DayAgendaProps): ReactElement {
  return (
    <div className={styles.agenda}>
      {days.map((day) => {
        const slots = schedule
          .filter((slot) => slot.day === day)
          .sort((a, b) => toMinutes(a.start) - toMinutes(b.start));

        return (
          <section className={styles.agendaDay} key={day} data-day={day}>
            <h3 className={styles.agendaHeading}>
              {dayLabel(day)}
              <span className={styles.todayFlag}>{todayLabel}</span>
            </h3>
            <ul className={styles.agendaList}>
              {slots.map((slot) => {
                const classType = classTypes.find(
                  (entry) => entry.slug === slot.classSlug,
                );
                if (classType === undefined) return null;
                const durationMin = slot.durationMin ?? classType.durationMin;

                return (
                  <li
                    className={styles.agendaRow}
                    key={`${slot.classSlug}-${slot.start}`}
                  >
                    <span className={styles.agendaTime}>{slot.start}</span>
                    <ClassChip
                      classType={classType}
                      day={day}
                      dayLabel={dayLabel(day)}
                      start={slot.start}
                      durationMin={durationMin}
                      end={toClock(toMinutes(slot.start) + durationMin)}
                      coach={coaches.find(
                        (entry) => entry.slug === slot.coachSlug,
                      )}
                      delay={0}
                    />
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
