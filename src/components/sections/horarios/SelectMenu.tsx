"use client";

import { useEffect, useId, useRef, useState, type ReactElement } from "react";

import styles from "./Horarios.module.css";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectMenuProps {
  /** Filter group this menu drives, read back by `HorariosMotion`. */
  name: string;
  label: string;
  options: SelectOption[];
}

/**
 * `'use client'` — a listbox needs open state, roving focus and outside-click.
 *
 * Hand-built rather than a native `<select>`: on a dark page the option list
 * inherits the page's near-white text onto the operating system's white popup,
 * which made the choices unreadable. Follows the ARIA 1.2 combobox pattern, so
 * it keeps the keyboard behaviour a native select would have given us.
 */
export function SelectMenu({
  name,
  label,
  options,
}: SelectMenuProps): ReactElement {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(options[0]?.value ?? "all");
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const id = useId();

  const selectedIndex = options.findIndex((option) => option.value === value);
  const selected = options[selectedIndex] ?? options[0];

  useEffect(() => {
    // The page's filtering runs imperatively over server-rendered cells, so the
    // choice is published as a DOM event rather than lifted into React state.
    rootRef.current?.dispatchEvent(
      new CustomEvent("filterchange", { bubbles: true }),
    );
  }, [value]);

  useEffect(() => {
    function onReset(): void {
      setValue(options[0]?.value ?? "all");
    }
    document.addEventListener("horarios:reset", onReset);
    return () => {
      document.removeEventListener("horarios:reset", onReset);
    };
  }, [options]);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent): void {
      if (!(event.target instanceof Node)) return;
      if (rootRef.current?.contains(event.target) === true) return;
      setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    listRef.current?.focus();
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  function choose(index: number): void {
    const option = options[index];
    if (option === undefined) return;
    setValue(option.value);
    setActive(index);
    setOpen(false);
    rootRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
  }

  function onKeyDown(event: React.KeyboardEvent): void {
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) {
        setActive(Math.max(0, selectedIndex));
        setOpen(true);
        return;
      }
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActive((current) =>
        Math.min(options.length - 1, Math.max(0, current + step)),
      );
      return;
    }
    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      setActive(event.key === "Home" ? 0 : options.length - 1);
      return;
    }
    if (open && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      choose(active);
    }
  }

  return (
    <div
      ref={rootRef}
      className={styles.selectMenu}
      data-filter={name}
      data-value={value}
      onKeyDown={onKeyDown}
    >
      <span className={styles.filterLabel} id={`${id}-label`}>
        {label}
      </span>
      <button
        className={styles.selectButton}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-labelledby={`${id}-label ${id}-value`}
        data-active={value === "all" ? undefined : ""}
        onClick={() => {
          setActive(Math.max(0, selectedIndex));
          setOpen((current) => !current);
        }}
      >
        <span id={`${id}-value`}>{selected?.label}</span>
        <span className={styles.selectGlyph} aria-hidden>
          ▾
        </span>
      </button>

      <ul
        ref={listRef}
        className={styles.selectList}
        id={`${id}-list`}
        role="listbox"
        aria-labelledby={`${id}-label`}
        aria-activedescendant={open ? `${id}-opt-${String(active)}` : undefined}
        tabIndex={-1}
        hidden={!open}
      >
        {options.map((option, index) => (
          <li
            className={styles.selectOption}
            key={option.value}
            id={`${id}-opt-${String(index)}`}
            role="option"
            aria-selected={option.value === value}
            data-active={index === active ? "" : undefined}
            onClick={() => {
              choose(index);
            }}
            onPointerEnter={() => {
              setActive(index);
            }}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
