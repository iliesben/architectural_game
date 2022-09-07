import React from "react"
import styled from "styled-components";

export const Avatar = () => {

  return (
    <Container>
      <AvatarImg src="src/assets/avatar/avatarGrass.gif" />
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 165px;
  right: 430px;
`;

const AvatarImg = styled.img`
`;