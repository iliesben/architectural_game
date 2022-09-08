export interface Element {
  name: ElementType,
  weakness: ElementType,
  strength: ElementType
}

export type ElementType = "fire" | "water" | "grass" | "iron"

export const ElementId = new Map<string, number>([
  ["fire", 1],
  ["water", 2],
  ["grass", 3],
  ["iron", 4],
]);