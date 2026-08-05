import type { NavItem } from "@/types/content";

/**
 * Primary navigation. Anchor text is descriptive by design — never "haz clic
 * aquí" (§8.7).
 */
export const mainNav = [
  { label: "Disciplinas", href: "/disciplinas" },
  { label: "Membresías", href: "/membresias" },
  { label: "Horarios", href: "/horarios" },
  { label: "Contacto", href: "/contacto" },
] satisfies NavItem[];

/** Footer-only links. Every page must reach these three (§13). */
export const legalNav = [
  { label: "Aviso legal", href: "/aviso-legal" },
  { label: "Política de privacidad", href: "/privacidad" },
  { label: "Política de cookies", href: "/cookies" },
] satisfies NavItem[];
