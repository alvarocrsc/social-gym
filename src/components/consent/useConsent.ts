"use client";

import { useSyncExternalStore } from "react";

import {
  getConsentServerSnapshot,
  getConsentSnapshot,
  subscribeConsent,
  type ConsentValue,
} from "@/lib/analytics/consent";

/**
 * The current choice, or `undefined` before hydration.
 */
export function useConsent(): ConsentValue | undefined {
  return useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getConsentServerSnapshot,
  );
}
