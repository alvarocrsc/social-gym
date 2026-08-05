import type { Coach } from "@/types/content";

/**
 * Coaches. Deliberately empty.
 *
 * Google reviews mention David, Adrián and Álvaro, and an app screenshot shows
 * Manuel Lacaba — all four are unverified hints (§7.3). Nobody goes in here
 * until the client confirms spelling, role and photo consent; a guessed name
 * would end up in `Person` structured data.
 *
 * TODO: confirm — open question 4, needed by week 2.
 */
// TODO: switch to satisfies once populated — empty arrays infer never[].
export const coaches: Coach[] = [];
