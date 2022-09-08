import React from "react"
import styled from "styled-components";

interface Props{
  children: JSX.Element[]
}

export const Arena = ({ children }: Props) => {
  return (
    <ArenaContainer>
      <ArenaImg src="src/assets/arena/arena.webp" />
      {children}
    </ArenaContainer>
  );
};

const ArenaContainer = styled.div`
  position: relative;
`;

const ArenaImg = styled.img`
`;