import React from "react";
import styled, { ColorsNames } from "styled-components";

interface Props {
  color: ColorsNames;
  text: string;
}

export const List = ({ color, text }: Props) => <Li color={color} className="text-xl">{text}</Li>


const Li = styled("li")<{ color: ColorsNames }>`
  color: ${({ theme, color }) => theme.colors[color][700]};
`;