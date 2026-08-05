/**
 * Per-route SEO record. Every route in `src/content/seo.ts` has exactly one,
 * and every `metadata` export is built from it via `buildMetadata()`.
 */
export interface PageSeo {
  /** 50–60 chars, pattern `Primary keyword | Social Gym Calahorra` (§8.2). */
  title: string;
  /** 140–158 chars, contains the primary keyword, the city and a reason to click. */
  description: string;
  /** Spanish route path, leading slash, no trailing slash. Canonical source. */
  path: string;
  /** The single query this route targets (§8.3). One page, one primary query. */
  primaryKeyword: string;
  /** Supporting queries. Never used for stuffing — they inform copy, not markup. */
  secondaryKeywords: string[];
  /** Overrides the default OG image. Omit to use the generated one. */
  ogImage?: string;
}
