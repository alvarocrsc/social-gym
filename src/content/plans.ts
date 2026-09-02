import type { MembershipPlan } from "@/types/content";

/**
 * The four memberships, in ascending commitment.
 *
 * Names, prices, durations and product ids were read from the live Virtuagym
 * webshop on 2026-09-02, not from the design file. They render as our own HTML
 * on /membresias and must be re-checked whenever the shop changes — it is on
 * the monthly maintenance checklist (§6.4).
 *
 * Access is identical across all four; only duration and price differ, so the
 * page's job is to make the longer-commitment discount legible rather than to
 * invent feature tiers.
 */
export const plans = [
  {
    slug: "mensual",
    name: "Mensual",
    price: 50,
    period: "mes",
    months: 1,
    durationLabel: "1 mes",
    periodLabel: "al mes",
    badge: "Autorrenovable",
    pitch:
      "Para probar el sitio sin pensar en meses. Si no encaja, lo dejas y ya está.",
    monthlyLabel: "50,00 € al mes",
    savingLabel: "",
    description:
      "Acceso ilimitado al gimnasio durante 1 mes desde la fecha de activación.",
    features: [
      "Sala y máquinas sin límite",
      "Las seis disciplinas dirigidas",
      "Se autorrenueva cada mes",
    ],
    highlighted: false,
    productId: "a200b6e5769ada04db734a5e84032ce49ba8",
  },
  {
    slug: "trimestral",
    name: "Trimestral",
    price: 140,
    period: "trimestre",
    months: 3,
    durationLabel: "3 meses",
    periodLabel: "cada 3 meses",
    badge: "Ahorras un 7 %",
    pitch:
      "El tiempo justo para que entrenar deje de costarte y empiece a apetecerte.",
    monthlyLabel: "46,67 € al mes",
    savingLabel: "Ahorras 10 €",
    description:
      "Acceso ilimitado al gimnasio durante 3 meses desde la fecha de activación.",
    features: [
      "Sala y máquinas sin límite",
      "Las seis disciplinas dirigidas",
      "Se autorrenueva cada 3 meses",
    ],
    highlighted: false,
    productId: "f2740c4d8cb727d87c0e456d95022cd155ab",
  },
  {
    slug: "semestral",
    name: "Semestral",
    price: 270,
    period: "semestre",
    months: 6,
    durationLabel: "6 meses",
    periodLabel: "cada 6 meses",
    badge: "Ahorras un 10 %",
    pitch:
      "Medio año da para cambiar de verdad. Es el que más gente elige, y por algo será.",
    monthlyLabel: "45,00 € al mes",
    savingLabel: "Ahorras 30 €",
    description:
      "Acceso ilimitado al gimnasio durante 6 meses desde la fecha de activación.",
    features: [
      "Sala y máquinas sin límite",
      "Las seis disciplinas dirigidas",
      "Se autorrenueva cada 6 meses",
    ],
    highlighted: true,
    productId: "df50802a3af366cf8c305c8d9a72f8ea7c9b",
  },
  {
    slug: "anual",
    name: "Anual",
    price: 500,
    period: "año",
    months: 12,
    durationLabel: "12 meses",
    periodLabel: "cada año",
    badge: "Ahorras un 17 %",
    pitch:
      "Si ya lo tienes claro. Sale a 41,67 € al mes y te olvidas del tema hasta el año que viene.",
    monthlyLabel: "41,67 € al mes",
    savingLabel: "Ahorras 100 €",
    description:
      "Acceso ilimitado al gimnasio durante 1 año desde la fecha de activación.",
    features: [
      "Sala y máquinas sin límite",
      "Las seis disciplinas dirigidas",
      "Se autorrenueva cada año",
    ],
    highlighted: false,
    productId: "3fbf1cbd59514d585a5e94f28321dda13f14",
  },
] satisfies MembershipPlan[];
