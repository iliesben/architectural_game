import React from "react"
import styled from "styled-components";

interface Props {
  children: JSX.Element[]
}

export const ArenaImg = ({ children }: Props) => (
  <ArenaContainer>
    <img src="/assets/arena/arena.webp" />
    {children}
  </ArenaContainer>
);

const ArenaContainer = styled.div`
  position: relative;
`;
