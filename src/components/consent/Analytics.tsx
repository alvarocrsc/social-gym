"use client";

import dynamic from "next/dynamic";
import type { ReactElement } from "react";

import { useConsent } from "./useConsent";

// Inlined at build time. Empty until a property exists, which keeps the tag
// out of the page entirely rather than merely unfired.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

/*
 * Lazily imported so the wrapper's own ~32KB never reaches a visitor who has
 * not opted in. A static import would ship it on every page even with no
 * property configured.
 */
const GoogleAnalytics = dynamic(
  () => import("@next/third-parties/google").then((m) => m.GoogleAnalytics),
  { ssr: false },
);

/**
 * `'use client'` — whether the tag may load depends on a choice stored in the
 * visitor's browser, which no static render can know.
 *
 * Hard blocking rather than Consent Mode alone: gtag.js is never requested
 * until the analytics category is granted, so a visitor who declines makes no
 * request to Google at all (§13). The denied defaults in `lib/analytics/
 * consent.ts` still go in first, so ad_storage stays denied even afterwards.
 */
export function Analytics(): ReactElement | null {
  const value = useConsent();

  if (GA_ID === "") return null;
  if (value?.analytics !== true) return null;

  return <GoogleAnalytics gaId={GA_ID} />;
}
