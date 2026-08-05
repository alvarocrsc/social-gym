import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

/**
 * 404 inside the locale tree.
 *
 * **Currently unreachable for URL-level 404s.** Because the root layout lives
 * under `[locale]`, unmatched URLs resolve to the synthesised `/_not-found`
 * entry and render Next's unstyled builtin instead of this file — verified
 * against `/no-existe`, `/disciplinas/no-existe`, `/en/no-existe` and
 * `/foo.txt`, all of which return a correct 404 but none of which reach here.
 * This only renders when a matched route calls `notFound()` explicitly, which
 * no page does today.
 *
 * Kept because it is the right home for the designed 404 and becomes live once
 * `experimental.globalNotFound` lands. See AGENTS.md §21.
 *
 * Next injects `<meta name="robots" content="noindex">` on 404 responses
 * automatically, so nothing extra is needed here.
 */
export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <section className="mx-auto flex flex-col gap-4 px-5 py-24">
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
      <Link href="/">{t("backHome")}</Link>
    </section>
  );
}
