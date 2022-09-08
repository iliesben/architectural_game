// recupere le socket si on rejoint, sinon créer un
import React from "react";
import styled from "styled-components";
import { Arena } from '../components/Arena'
import { Avatar } from "../components/Avatar";
import { Attack } from "../components/Attack";
import { FirstPlace, SecondPlace } from "../components/Place";

export const Game = () => {
    return (
      <GameContainer>
        <Arena>
          <FirstPlace>
            <Avatar type="fire" side="Back" />
          </FirstPlace>
          <SecondPlace>
            <Avatar type="grass" side="Front" />
            <Attack type="fire" />
          </SecondPlace>
        </Arena>
      </GameContainer>
    );
}


const GameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;
