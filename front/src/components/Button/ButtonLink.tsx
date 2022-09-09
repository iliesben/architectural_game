import React from "react";
import { Link as RouterLink } from "react-router-dom";
import styled, { ColorsNames, css } from "styled-components";

interface ButtonLinkProps {
  link: string
  color: ColorsNames;
  text: string;
}


export const ButtonLink = ({ link, color, text }: ButtonLinkProps) => {
  return (
    <Link
      to={link}
      className="m-2 px-4 py-6 rounded-lg font-mono"
      color={color}
    >
      {text}
    </Link>
  );
};

const Link = styled(RouterLink)<{ color: ColorsNames }>`
  background-color: ${({ theme, color }) => theme.colors[color][600]}25;
  color: ${({ theme, color }) => theme.colors[color][700]};
  :hover {
    background-color: ${({ theme, color }) => theme.colors[color][300]};
  }
`;