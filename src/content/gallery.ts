import type { ImageAsset } from "@/types/content";

/**
 * Gallery images. Deliberately empty.
 *
 * A photography batch is arriving; every image goes through the optimisation
 * pipeline and gets descriptive Spanish alt text (§11, §12) before it lands
 * here. Nothing is added raw.
 *
 * TODO: confirm — photography pending.
 */
// TODO: switch to satisfies once populated — empty arrays infer never[].
export const gallery: ImageAsset[] = [];
