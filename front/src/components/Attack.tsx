import React from "react";
import { ElementType } from "@/types/game.type";
import styled from "styled-components";

interface Props {
  type: ElementType;
}

export const Attack = ({ type }: Props) => {
  return <AttackImg src={`src/assets/attack/attack${type}.gif`} />;
};

const AttackImg = styled.img`
  position: absolute;
  top: 0px;
  transform: scale(2);
  filter: blur(0.75px);
`;
