// recupere le socket si on rejoint, sinon créer un
import React, { MouseEventHandler, useState } from "react";
import styled from "styled-components";
import { Arena } from "../components/Arena";
import { Choose } from "../components/Choose";
import { Avatar } from "../components/Avatar";
import { Attack } from "../components/Attack";
import { GameColumn } from "../components/Game/GameColumn";
import { FirstPlace, SecondPlace } from "../components/Place";
import { ElementType } from "@/types/game.type";
import { ButtonHome } from "@/components/Button/ButtonHome";
import { ButtonLink } from "@/components/Button/ButtonLink";

export const Game = () => {
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
        <GameColumn column="half">
          {element ? (
            <Arena>
              <FirstPlace>
                <Avatar type={element} side="Back" />
                {/* <Attack type="fire" /> */}
              </FirstPlace>
              <SecondPlace>
                <Avatar type="water" side="Front" />
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
        />
      </ButtonContainer>
    </>
  );
};

const Heading = styled.div`
  margin: 2rem;
  text-align: center;
`;

const ButtonContainer = styled.div`
  margin-top: 5rem;
  text-align: center;
`;

const GameContainer = styled.div``;

const GameHeader = styled.div`
  padding-inline: 3rem;
  margin-top: 1rem;
`;

const GameContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
