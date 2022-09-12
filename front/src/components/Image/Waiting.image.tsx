import React from "react"
import styled from "styled-components";

export const WaitingImg = () => (
  <WaitingContainer>
    <img src="/assets/waiting.gif" />
  </WaitingContainer>
);

export const OverLimitImg = () => (
  <WaitingContainer>
    <img src="/assets/cry.gif" />
  </WaitingContainer>
);

const WaitingContainer = styled.div`
  position: relative;
`;
