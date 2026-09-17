import { existingImage } from "@/lib/media/public-file";
import type { Discipline, HomeImageSlot, ImageAsset } from "@/types/content";

export function resolveSlot(slot: HomeImageSlot): ImageAsset | null {
  if (existingImage(slot.primary.src) !== "") return slot.primary;
  if (existingImage(slot.fallback.src) !== "") return slot.fallback;
  return null;
}

/*
 * The index shows a 4:5 portrait, while most discipline covers are 16:9. Cover
 * cropping one into the other throws away half the width, so the browser was
 * upscaling a 640px fetch across a 605px box. These crops are already 4:5.
 */
export function cardPhoto(discipline: Discipline): string {
  const cropped = existingImage(`/disciplinas/${discipline.slug}-card.jpg`);
  return cropped !== "" ? cropped : existingImage(discipline.image.src);
}
