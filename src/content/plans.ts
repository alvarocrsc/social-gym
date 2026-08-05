import type { MembershipPlan } from "@/types/content";

/**
 * Membership plans. Deliberately empty.
 *
 * Names, prices and periods must match Virtuagym exactly — this is blocking
 * open question 2. An invented price would render as our own HTML on
 * /membresias *and* as `Offer` structured data, so it stays empty until
 * confirmed.
 *
 * When populated, this module must be kept in sync with the Virtuagym webshop
 * manually; it is on the monthly maintenance checklist (§6.4).
 *
 * TODO: confirm — plan names, prices and periods.
 *
 * Annotated rather than `satisfies`: an empty array under `satisfies` infers
 * `never[]`, which makes every downstream `plan.price` a type error. The same
 * applies to the other not-yet-populated content modules.
 */
// TODO: switch to satisfies once populated — empty arrays infer never[].
export const plans: MembershipPlan[] = [];
