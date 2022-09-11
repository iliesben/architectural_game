import React from "react"
import styled from "styled-components";

export const Waiting = () => {
  return (
    <WaitingContainer>
      <ArenaImg src="/src/assets/waiting.gif" />
    </WaitingContainer>
  );
};

export const OverLimit = () => {
  return (
    <WaitingContainer>
      <ArenaImg src="/src/assets/cry.gif" />
    </WaitingContainer>
  );
};

const WaitingContainer = styled.div`
  position: relative;
`;

const ArenaImg = styled.img`
`;