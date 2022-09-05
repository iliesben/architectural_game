import { Element } from "../types/game.type"

export const fire: Element = {
  weekness: "water",
  strength: "grass"
}

export const water: Element = {
  weekness: "grass",
  strength: "fire"
}

export const grass: Element = {
  weekness: "fire",
  strength: "water"
}

export const gameElement = {
  grass,
  water,
  fire
}
