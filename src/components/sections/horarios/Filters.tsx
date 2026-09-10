import type { ReactElement } from "react";

import { horarios } from "@/content/horarios";
import type { ClassType, Coach } from "@/types/content";

import styles from "./Horarios.module.css";
import { SelectMenu } from "./SelectMenu";

export interface FiltersProps {
  classTypes: ClassType[];
  coaches: Coach[];
}

export function Filters({ classTypes, coaches }: FiltersProps): ReactElement {
  return (
    <div className={styles.filters} data-rv>
      <SelectMenu
        name="class"
        label={horarios.filterClassLabel}
        options={[
          { value: "all", label: horarios.filterAllClasses },
          ...classTypes.map((classType) => ({
            value: classType.slug,
            label: classType.name,
          })),
        ]}
      />

      {coaches.length > 0 ? (
        <SelectMenu
          name="coach"
          label={horarios.filterCoachLabel}
          options={[
            { value: "all", label: horarios.filterAllCoaches },
            ...coaches.map((coach) => ({
              value: coach.slug,
              label: coach.name,
            })),
          ]}
        />
      ) : null}

      <button
        className={styles.filterClear}
        type="button"
        data-filter-clear
        hidden
      >
        {horarios.filterClear}
      </button>

      <p className={styles.filterCount} role="status" data-filter-status />
    </div>
  );
}
