import React from "react";
import { ElementType } from "@/types/game.type";
import styled from "styled-components";
import { upperFirst} from 'lodash';

interface Props {
  type: ElementType;
  side: "front" | "back";
}

export const AvatarImg = ({ type, side }: Props) => <Img src={`/assets/avatar/avatar${upperFirst(side)}${upperFirst(type)}.gif`} />;

const Img = styled.img`
  opacity: 1;
  transition: all 0.25s ease-out;
  width: 55px;
`;
