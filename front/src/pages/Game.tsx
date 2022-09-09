// recupere le socket si on rejoint, sinon créer un
import React, { useState } from "react";
import styled from "styled-components";
import { Arena } from "../components/Arena";
import { Choose } from "../components/Choose";
import { Avatar } from "../components/Avatar";
import { Attack } from "../components/Attack";
import { GameColumn } from "../components/Game/GameColumn";
import { FirstPlace, SecondPlace } from "../components/Place";
import { io } from "socket.io-client";
import { IPlayer } from "@/schema/IPlayer";
import { ButtonLink } from "@/components/Button/ButtonLink";
import { ElementType } from "@/types/game.type";

const socket = io(`http://localhost:3000`);

export const Game = () => {

  socket.on('current lobby', (players: IPlayer[]) => {
    console.warn(players.length)
    console.log('players ?', players);
  });
  const lobbyId = '64f134c7-385e-4df6-84f4-14b61118ae72';

  const [element, setElement] = useState<ElementType | undefined>()

  const getElement = (elem: ElementType) => setElement(elem)

  return (
    <>
      <Heading className="text-xl">
        {element ? "Timer" : "Choisissez un élément "}
      </Heading>
      <GameContainer className="flex flex-row">
        <GameColumn>
          <div className="flex justify-evenly flex-col h-full">
            <h2 className="text-2xl">Sem</h2>
            <div className="text-[11rem]">98</div>
          </div>
        </GameColumn>
        <GameColumn column="half" className="flex justify-center">
          {element ? (
            <Arena>
              <FirstPlace>
                <Avatar type={element} side="back" />
                {/* <Attack type="fire" /> */}
              </FirstPlace>
              <SecondPlace>
                <Avatar type="water" side="front" />
                <Attack type={element} />
              </SecondPlace>
            </Arena>
          ) : (
            <Choose onClick={getElement} />
          )}
        </GameColumn>
        <GameColumn>
          <div className="flex justify-evenly flex-col h-full">
            <h2 className="text-2xl">Pierre</h2>
            <div className="text-[11rem]">97</div>
          </div>
        </GameColumn>
      </GameContainer>
      <ButtonContainer>
        <ButtonLink
          link="/"
          text="Quitter la partie"
          color="gray"
          opacity="00"
          //onClick={() => { socket.emit('leave room', "64f134c7-385e-4df6-84f4-14b61118ae72") }}
        />
      </ButtonContainer>
    </>
  );
}

const Heading = styled.div`
  margin: 2rem;
  text-align: center;
`;

const ButtonContainer = styled.div`
  margin-top: 5rem;
  text-align: center;
`;

const GameContainer = styled.div``;
