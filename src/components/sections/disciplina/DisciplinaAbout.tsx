import type { ReactElement } from "react";

import { coaches } from "@/content/coaches";
import { disciplina } from "@/content/disciplina";
import { disciplines } from "@/content/disciplines";
import { Link } from "@/i18n/navigation";
import { disciplinePathname } from "@/lib/seo/routes";
import type { Discipline } from "@/types/content";

import { CoachTag } from "./CoachTag";
import styles from "./Disciplina.module.css";
import { revealDelay } from "./reveal";

export interface DisciplinaAboutProps {
  discipline: Discipline;
}

export function DisciplinaAbout({
  discipline,
}: DisciplinaAboutProps): ReactElement {
  const team = coaches.filter((coach) =>
    discipline.coachSlugs.includes(coach.slug),
  );

  return (
    <section className={styles.about} aria-labelledby="la-disciplina">
      <div>
        <span className={styles.eyebrow} data-rv>
          {disciplina.aboutEyebrow}
        </span>

        <h2 className={styles.aboutTitle} id="la-disciplina" data-rv>
          <span>{discipline.headline.solid}</span>
          <span className={styles.aboutTitleOutlined}>
            {discipline.headline.outlined}
          </span>
        </h2>

        <div className={styles.aboutBody} data-rv style={revealDelay(120)}>
          <p>{discipline.longDescription}</p>
          {discipline.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <dl className={styles.metaStrip} data-rv style={revealDelay(200)}>
          {discipline.meta.map((item) => (
            <div key={item.label}>
              <dt className={styles.metaLabel}>{item.label}</dt>
              <dd className={styles.metaValue}>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <aside className={styles.aside}>
        <nav
          className={styles.switcher}
          aria-label={disciplina.switcherHeading}
        >
          <p className={styles.switcherHead}>{disciplina.switcherHeading}</p>
          <ul className={styles.switcherList}>
            {disciplines.map((entry) => (
              <li key={entry.slug} className={styles.switcherItem}>
                {entry.slug === discipline.slug ? (
                  <span className={styles.switcherCurrent} aria-current="page">
                    {entry.name}
                  </span>
                ) : (
                  <Link
                    className={styles.switcherLink}
                    href={disciplinePathname(entry.slug)}
                  >
                    {entry.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* The coach card renders only once `coaches.ts` is populated. */}
        {team.length > 0 ? (
          <div className={styles.panel}>
            <span className={styles.eyebrow}>{disciplina.coachEyebrow}</span>
            <ul className={styles.coachList}>
              {team.map((coach) => (
                <li key={coach.slug}>
                  <CoachTag
                    name={coach.name}
                    image={coach.image}
                    role={coach.role}
                    size="lg"
                  />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </aside>
    </section>
  );
}
