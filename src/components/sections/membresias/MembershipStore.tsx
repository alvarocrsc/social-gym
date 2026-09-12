import { getTranslations } from "next-intl/server";
import type { ReactElement } from "react";

import { ConsentFrame } from "@/components/consent/ConsentFrame";
import { membresias } from "@/content/membresias";
import { site } from "@/content/site";

import styles from "./Membresias.module.css";
import { revealDelay } from "./reveal";

/**
 * The Virtuagym webshop, as the checkout step only. Prices and contents are
 * rendered above as our own HTML from `plans.ts`.
 *
 * The frame opens on the shop index and `MembresiasMotion` swaps its `src` to a
 * product page when a plan card is clicked. `scrolling="no"` is the only thing
 * that stops a cross-origin frame capturing the wheel, and the embed's document
 * stretches to fill whatever height it is given and then overflows by a
 * constant — so the clipped remainder is empty space, but only while the box
 * stays taller than the content. A product page is taller than the shop index
 * and ends in the Checkout button, hence the separate `--size-embed-product`.
 *
 * The frame itself is behind `ConsentFrame`: Virtuagym sets its own cookies on
 * load, so it is not mounted until the visitor accepts external content.
 */
/*
 * Matches the `.storeSection` rule in the module. The embed is hidden on
 * phones — it sizes itself, captures the wheel and clips its own checkout
 * button in a narrow viewport — so it must not load there either.
 */
const STORE_MEDIA = "(min-width: 48rem)";

export async function MembershipStore(): Promise<ReactElement> {
  const t = await getTranslations("Membresias");
  const hostedShop: string = site.virtuagym.shopUrl;
  const fallbackUrl =
    hostedShop === "" ? site.virtuagym.shopEmbedUrl : hostedShop;

  return (
    <section
      className={`${styles.section} ${styles.sectionRule} ${styles.storeSection}`}
      id="tienda"
      aria-labelledby="tienda-online"
    >
      <div className={styles.storeHead}>
        <div>
          <span className={styles.eyebrow} data-rv>
            {membresias.storeEyebrow}
          </span>
          <h2
            className={styles.sectionTitle}
            id="tienda-online"
            data-rv
            style={revealDelay(60)}
          >
            {membresias.storeHeading}
          </h2>
          <p className={styles.storeLead} data-rv style={revealDelay(120)}>
            {membresias.storeLead}
          </p>
        </div>

        <div className={styles.storeActions} data-rv style={revealDelay(180)}>
          <button className={styles.pill} type="button" data-store-reset hidden>
            {membresias.storeAllPlans}
          </button>
          <a
            className={styles.pill}
            href={site.virtuagym.shopEmbedUrl}
            target="_blank"
            rel="noopener"
            data-store-external
          >
            {`${membresias.storeNewTab} ↗`}
          </a>
        </div>
      </div>

      <ConsentFrame
        media={STORE_MEDIA}
        className={styles.storeFrame}
        iframeClassName={styles.storeIframe}
        src={site.virtuagym.shopEmbedUrl}
        title={t("storeFrameTitle")}
        fallbackUrl={fallbackUrl}
        fallbackLabel={membresias.storeNewTab}
      />
    </section>
  );
}
