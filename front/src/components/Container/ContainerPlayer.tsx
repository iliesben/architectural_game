import React from 'react'
import { IPlayer } from "../../schema/IPlayer";

interface PlayerProps {
  player?: IPlayer
}

export const ContainerPlayer = ({ player }: PlayerProps) => {
  return(
    <div className="flex justify-evenly flex-col h-full">
      {player ?
        <>
          <h2 className="text-2xl">{player.name}</h2>
          <div className="text-[11rem]">{player.nbWin}</div>
        </>
        : <h2 className="text-2xl">En attente du joueur ...</h2>
      }
    </div>
  )
}