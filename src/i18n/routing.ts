import { defineRouting } from "next-intl/routing";

/**
 * Locale routing for the site.
 *
 * Spanish is served unprefixed at `/`, English under `/en/*`. The structure
 * exists now because retrofitting it later is expensive; English *content* is
 * deliberately deferred (AGENTS.md §4.3).
 *
 * Keys in `pathnames` are the internal pathnames and match the
 * `src/app/[locale]` file structure. The `en` values are public URLs only.
 */
export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "as-needed",

  // next-intl otherwise sets `Link: <...>; rel="alternate"; hreflang="..."`
  // response headers, which Google reads as hreflang. Hard rule 8 forbids that
  // until English content exists.
  alternateLinks: false,

  // `/` must always serve Spanish. With detection on, a visitor or crawler
  // sending `Accept-Language: en` gets redirected to `/en`, which has no real
  // content yet.
  localeDetection: false,

  // Nothing reads a stored locale preference yet, and every cookie has to be
  // documented in the cookie policy (§13). Re-enable with a language switcher.
  localeCookie: false,

  // Written as literals on purpose. Deriving the six discipline entries from
  // `src/content/disciplines.ts` would lose the const inference that makes an
  // unknown `Link href` a compile error — `Discipline.slug` is `string`, so the
  // keys widen and every route becomes assignable. A new discipline therefore
  // needs an entry here too, matching its `slug` and `enSlug`; the guard in
  // `src/lib/seo/routes.ts` fails the build if they drift apart.
  pathnames: {
    "/": "/",
    "/membresias": { es: "/membresias", en: "/memberships" },
    "/disciplinas": { es: "/disciplinas", en: "/disciplines" },
    "/disciplinas/hyrox": {
      es: "/disciplinas/hyrox",
      en: "/disciplines/hyrox",
    },
    "/disciplinas/boxeo": {
      es: "/disciplinas/boxeo",
      en: "/disciplines/boxing",
    },
    "/disciplinas/entrenamiento-funcional": {
      es: "/disciplinas/entrenamiento-funcional",
      en: "/disciplines/functional-training",
    },
    "/disciplinas/spinning": {
      es: "/disciplinas/spinning",
      en: "/disciplines/spinning",
    },
    "/disciplinas/pilates": {
      es: "/disciplinas/pilates",
      en: "/disciplines/pilates",
    },
    "/disciplinas/gap": { es: "/disciplinas/gap", en: "/disciplines/gap" },
    "/horarios": { es: "/horarios", en: "/schedule" },
    "/contacto": { es: "/contacto", en: "/contact" },
    "/aviso-legal": { es: "/aviso-legal", en: "/legal-notice" },
    "/privacidad": { es: "/privacidad", en: "/privacy" },
    "/cookies": { es: "/cookies", en: "/cookies" },
  },
});
