import React from "react";
import { ElementType } from "@/types/game.type";
import styled from "styled-components";
interface Props {
  type: ElementType;
  side: "Front" | "Back";
}

export const Avatar = ({ type, side }: Props) => {
  return <AvatarImg src={`src/assets/avatar/avatar${side}${type}.gif`} />;
};

const AvatarImg = styled.img`
  opacity: 1;
  transition: all 0.25s ease-out;
`;
