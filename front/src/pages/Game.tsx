// recupere le socket si on rejoint, sinon créer un
import React from "react";
import styled from "styled-components";
import { Arena } from "../components/Arena";
import { Avatar } from "../components/Avatar";
import { Attack } from "../components/Attack";
import { GameColumn } from "../components/Game/GameColumn";
import { FirstPlace, SecondPlace } from "../components/Place";

export const Game = () => {
  return (
    <>
      <Heading className="text-xl">Timer : </Heading>
      <GameContainer className="flex flex-row">
        <GameColumn>Score</GameColumn>
        <GameColumn column="half">
          {/* <h3 className="text-xl h-20">Choisissez un élément</h3>
            <div className="columns-3">
              <div className="flex justify-center">
                <img src="src/assets/water.gif" />
              </div>
              <div className="flex justify-center">
                <img src="src/assets/fire.gif" />
              </div>
              <div className="flex justify-center">
                <img src="src/assets/grass.gif" />
              </div>
            </div> */}
          <Arena>
            <FirstPlace>
              <Avatar type="fire" side="Back" />
              <Attack type="fire" />
            </FirstPlace>
            <SecondPlace>
              <Avatar type="water" side="Front" />
              <Attack type="grass" />
            </SecondPlace>
          </Arena>
        </GameColumn>
        <GameColumn>Score</GameColumn>
      </GameContainer>
      <Heading className="text-xl">Quiter la partie</Heading>
    </>
  );
};

const Heading = styled.div`
  margin: 2rem;
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
