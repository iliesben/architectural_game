import React, { useEffect } from "react"
import { IPlayer } from "../../../schema/IPlayer";
import { ArenaImg } from "../../Image/Arena.image";
import { AvatarImg } from "../../Image/Avatar.image";
import { AttackImg } from "../../Image/Attack.image";
import { FirstPlace, SecondPlace } from "./PlaceGame.container";
import { ElementType } from "@/types/game.type";
import { useSpring, animated } from 'react-spring'

interface Props {
  currentPlayer: IPlayer
  otherPlayer: IPlayer
}

export const ArenaGame = ({ currentPlayer, otherPlayer }: Props) => (
  <ArenaImg>
    <FirstPlace>
      <AvatarImg type={currentPlayer.currentChoice as ElementType} side="back" />
      {
        otherPlayer.currentWinner &&
        <AnimateAvatar>
          <AttackImg type={otherPlayer.currentChoice as ElementType} />
        </AnimateAvatar>
      }
    </FirstPlace>
    <SecondPlace>
      <AvatarImg type={otherPlayer.currentChoice as ElementType} side="front" />
      {
        currentPlayer.currentWinner &&
        <AnimateAvatar>
          <AttackImg type={currentPlayer.currentChoice as ElementType} />
        </AnimateAvatar>
      }
    </SecondPlace>
  </ArenaImg>
)

interface AnimateAvatarProps {
  children: JSX.Element
}

const AnimateAvatar = ({ children }: AnimateAvatarProps) => {

  const props = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { duration: 400 },
    delay: 700,
  })

  return <animated.div style={props}>{children}</animated.div>
}