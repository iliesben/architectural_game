import { Element } from "../types/game.type"

export const fire: Element = {
  name: "fire",
  weakness: "water",
  strength: "grass"
}

export const water: Element = {
  name: "water",
  weakness: "grass",
  strength: "fire"
}

export const grass: Element = {
  name: "grass",
  weakness: "fire",
  strength: "water"
}

export const gameElement = {
  grass,
  water,
  fire
}
