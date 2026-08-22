import type { NavItem } from "@/types/content";

const disciplinas = {
  label: "Disciplinas",
  href: "/disciplinas",
} satisfies NavItem;

const membresias = {
  label: "Membresías",
  href: "/membresias",
} satisfies NavItem;

const horarios = { label: "Horarios", href: "/horarios" } satisfies NavItem;
const contacto = { label: "Contacto", href: "/contacto" } satisfies NavItem;

export const mainNav = [
  disciplinas,
  membresias,
  horarios,
  contacto,
] satisfies NavItem[];

export const headerNav = [membresias] satisfies NavItem[];

export const menuNav = [
  membresias,
  disciplinas,
  horarios,
  contacto,
] satisfies NavItem[];

export const menuCta = membresias;

/** Footer-only links. Every page must reach these three. */
export const legalNav = [
  { label: "Aviso legal", href: "/aviso-legal" },
  { label: "Política de privacidad", href: "/privacidad" },
  { label: "Política de cookies", href: "/cookies" },
] satisfies NavItem[];
