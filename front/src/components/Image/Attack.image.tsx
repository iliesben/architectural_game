import React, { CSSProperties } from "react";
import { ElementType } from "@/types/game.type";
import styled from "styled-components";
import { upperFirst} from 'lodash';

interface Props {
  type: ElementType;
  style?: CSSProperties
}

export const AttackImg = ({ type, style }: Props) => <Img style={style} src={`/assets/attack/attack${upperFirst(type)}.gif`} />;

const Img = styled.img`
  position: absolute;
  top: 0px;
  transform: scale(2);
  filter: blur(0.75px);
  max-width: 100%;
`;
