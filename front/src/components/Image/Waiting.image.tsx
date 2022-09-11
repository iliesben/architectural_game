import React from "react"
import styled from "styled-components";

export const WaitingImg = () => (
  <WaitingContainer>
    <img src="/src/assets/waiting.gif" />
  </WaitingContainer>
);

const WaitingContainer = styled.div`
  position: relative;
`;
