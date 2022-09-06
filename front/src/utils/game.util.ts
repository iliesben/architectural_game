import { Element } from "../types/game.type"

export const gameResult = (key: string) => {
  switch (key) {
    case "name":
      return "Same"
    case "strength":
      return "Win"
    case "weakness":
      return "Lose"
  }
}

export const gameTurn = (firstElement: Element, secondElement: Element) => {
  for (const [firstElement_key, firstElement_value] of Object.entries(firstElement)) {
    if(firstElement_value === secondElement.name) return gameResult(firstElement_key)
  }
}