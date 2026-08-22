import { getTranslations } from "next-intl/server";
import type { ReactElement } from "react";

import { site } from "@/content/site";

/**
 * The Virtuagym webshop, as the checkout step only.
 *
 * `loading="lazy"` rather than an intersection observer, so this stays a
 * server component and adds no JS — §6.4 accepts either. The wrapper reserves
 * `--size-embed-shop` up front so the late load cannot shift the page.
 *
 * TODO (§13, blocking for launch): this embed almost certainly sets cookies
 * and currently mounts unconditionally, because no consent banner exists yet.
 * It must not mount before consent — gate it here and render
 * `site.virtuagym.shopUrl` as a link fallback when cookies are rejected.
 */
export async function VirtuagymStore(): Promise<ReactElement> {
  const t = await getTranslations("Membresias");

  return (
    <section aria-label={t("storeLabel")} className="py-[var(--space-section)]">
      <div className="mx-auto w-[var(--container-page)]">
        {/* `scrolling="no"` is the only thing that stops a cross-origin frame
            capturing the wheel — the embed's document stretches to fill any
            height given and then overflows by a constant, so no height alone
            removes its scrollbar. It does mean anything past
            --size-embed-shop is clipped and unreachable, so that token has to
            grow with the product list. */}
        <div className="h-[var(--size-embed-shop)] overflow-hidden">
          <iframe
            src={site.virtuagym.shopEmbedUrl}
            title={t("storeFrameTitle")}
            loading="lazy"
            scrolling="no"
            className="h-full w-full overflow-hidden border-0"
          />
        </div>
      </div>
    </section>
  );
}
