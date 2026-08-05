import { ImageResponse } from "next/og";

import { site } from "@/content/site";
import { routing } from "@/i18n/routing";
import {
  OG_COLOR_ACCENT,
  OG_COLOR_BASE,
  OG_COLOR_INK,
  OG_COLOR_INK_MUTED,
} from "@/lib/seo/og-theme";

export const alt = `${site.name} · Centro de entrenamiento en ${site.address.locality}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Without this the image route renders on demand — every other route is SSG,
 * and §3 requires static rendering throughout.
 */
export function generateStaticParams(): Array<{ locale: string }> {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Default social share image, 1200×630 (§8.2).
 *
 * Uses no custom font: next/font emits woff2, which Satori cannot read (it
 * accepts only ttf, otf and woff), so the system fallback is used until a
 * TTF of Archivo Black is added to the repo.
 */
export default async function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: OG_COLOR_BASE,
        color: OG_COLOR_INK,
        padding: "72px",
      }}
    >
      <div style={{ display: "flex", fontSize: 30, color: OG_COLOR_ACCENT }}>
        {`${site.address.locality} · ${site.address.region}`}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ display: "flex", fontSize: 132, letterSpacing: "-4px" }}>
          {site.name.toUpperCase()}
        </div>
        <div
          style={{ display: "flex", fontSize: 34, color: OG_COLOR_INK_MUTED }}
        >
          {site.tagline}
        </div>
      </div>
    </div>,
    size,
  );
}
