import { ElementType } from "@/types/game.type";

export class IPlayer {
  id?: string
  ip?: string
  name?: string;
  nbWin?: number;
  currentChoice?: ElementType
  currentWinner?: string
}