import React from "react"
import { IPlayer } from "../../schema/IPlayer";
import { Arena } from "../Arena";
import { Avatar } from "../Avatar";
import { Attack } from "../Attack";
import { FirstPlace, SecondPlace } from "../Place";
import { ElementType } from "@/types/game.type";

interface ContainerArenaProps{
  currentPlayer: IPlayer
  otherPlayer: IPlayer
  currentWinner?: string
}
export const ContainerArena = ({ currentPlayer, otherPlayer, currentWinner }: ContainerArenaProps) => {

  return(
    <Arena>
      <FirstPlace>
        <Avatar type={currentPlayer.currentChoice as ElementType} side="back" />
        {otherPlayer.id === currentWinner && <Attack type={otherPlayer.currentChoice as ElementType} />}
      </FirstPlace>
      <SecondPlace>
        <Avatar type={otherPlayer.currentChoice as ElementType} side="front" />
         {currentPlayer.id === currentWinner && <Attack type={currentPlayer.currentChoice as ElementType} />}
      </SecondPlace>
    </Arena>
  )
}