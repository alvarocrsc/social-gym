import type { FaqItem } from "@/types/content";

/**
 * Site-wide FAQ, shown on /membresias. Deliberately empty.
 *
 * The questions that matter here — permanencia, matrícula, bajas, prueba
 * gratuita (§6.4) — all have answers that depend on the membership terms,
 * which are still unconfirmed. Guessing them would be inventing business data.
 *
 * `FAQPage` JSON-LD is omitted entirely while this is empty rather than
 * emitted hollow.
 *
 * TODO: confirm — membership terms, then write the answers.
 */
// TODO: switch to satisfies once populated — empty arrays infer never[].
export const faq: FaqItem[] = [];
