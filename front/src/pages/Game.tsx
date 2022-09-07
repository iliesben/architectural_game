// recupere le socket si on rejoint, sinon créer un
import React from "react";
import styled from "styled-components";
import { Arena } from '../components/Arena'
import { Avatar } from "../components/Avatar";

export const Game = () => {
    return (
      <GameContainer>
        <Arena>
          <Avatar />
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
