import { existingImage } from "@/lib/media/public-file";
import type { HomeImageSlot, ImageAsset } from "@/types/content";

export function resolveSlot(slot: HomeImageSlot): ImageAsset | null {
  if (existingImage(slot.primary.src) !== "") return slot.primary;
  if (existingImage(slot.fallback.src) !== "") return slot.fallback;
  return null;
}
