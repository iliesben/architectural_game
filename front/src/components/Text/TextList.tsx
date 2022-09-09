import React from "react";
import styled, { ColorsNames } from "styled-components";

interface ProsTextList {
  color: ColorsNames;
  text: string;
}

export const TextList = ({ color, text }: ProsTextList) => {
  return (
    <Li color={color} className="text-xl">{text}</Li>
  );
};


const Li = styled("li")<{ color: ColorsNames }>`
  color: ${({ theme, color }) => theme.colors[color][700]};
`;