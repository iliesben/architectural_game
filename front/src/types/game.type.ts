export interface Element {
  name: ElementType,
  weakness: ElementType,
  strength: ElementType
}

export type ElementType = "fire" | "water" | "grass" | "iron"