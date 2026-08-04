import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { routing } from "./routing";

/**
 * Per-request i18n configuration, resolved from the `[locale]` segment.
 *
 * That segment acts as a catch-all, so an unknown value can reach this function
 * (e.g. a request for `/unknown.txt`). `hasLocale` narrows it back to a real
 * locale before it is used.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    // English content is deferred (AGENTS.md §4.3), so every locale reads the
    // Spanish catalogue until `messages/en.json` exists.
    messages: (await import("../messages/es.json")).default,
  };
});
