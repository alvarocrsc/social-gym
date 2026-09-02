import type { FaqItem } from "@/types/content";

/**
 * Site-wide FAQ, shown on /membresias.
 *
 * The answers to 2 and 3 are verifiable in the Virtuagym webshop, which states
 * unlimited access to "Entrada" and "Clases dirigidas" on all four products and
 * counts the period from the activation date.
 *
 * TODO: confirm — 1 and 4 come from the design brief. The shop confirms the
 * memberships auto-renew but says nothing about cancellation terms or QR entry,
 * and both answers are contractual claims.
 */
export const faq = [
  {
    question: "¿Puedo cancelar cuando quiera?",
    answer:
      "Sí. Las cuatro membresías se autorrenuevan al final de su periodo, y puedes darlas de baja en cualquier momento antes de la siguiente renovación, sin penalización.",
  },
  {
    question: "¿Las clases dirigidas cuestan aparte?",
    answer:
      "No. Cualquier membresía incluye las seis disciplinas y todas las clases del horario. Solo necesitas reservar plaza en la app.",
  },
  {
    question: "¿Cuándo empieza a contar mi periodo?",
    answer:
      "Desde la fecha de activación, que es el día en que completas el pago. A partir de ahí tienes acceso ilimitado durante todo el periodo contratado.",
  },
  {
    question: "¿Necesito la app para entrenar?",
    answer:
      "Sí. El acceso a la sala se hace con un código QR desde la propia app, y las clases dirigidas también se reservan ahí. Es gratuita y está disponible para iOS y Android.",
  },
] satisfies FaqItem[];
