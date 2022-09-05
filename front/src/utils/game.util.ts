import { Element } from "../types/game.type"


export const gameTurn = (firstElement: Element, secondElement: Element) => {
  if(firstElement.strength === secondElement.weakness) {
    return firstElement.name
  }

  if(firstElement.weakness === secondElement.strength) {
    return secondElement.name
  }

  if(firstElement.name === secondElement.name) {
    return 'Match nul'
  }
}

// const isFire = (element: string) => {
//   return (element == 'fire' ? true : false)
// }

// const isWater = (element: string) => {
//   return (element == 'water' ? true : false)
// }

// const isGrass = (element: string) => {
//   return (element == 'grass' ? true : false)
// }