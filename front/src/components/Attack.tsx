import React from "react";
import { ElementType } from "@/types/game.type";
import styled from "styled-components";
import { upperFirst} from 'lodash';

interface Props {
  type: ElementType;
}

export const Attack = ({ type }: Props) => <AttackImg src={`/src/assets/attack/attack${upperFirst(type)}.gif`} />;

const AttackImg = styled.img`
  position: absolute;
  top: 0px;
  transform: scale(2);
  filter: blur(0.75px);
  max-width: 100%;
`;
