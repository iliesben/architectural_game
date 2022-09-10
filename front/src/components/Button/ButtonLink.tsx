import React from "react";
import { Link as RouterLink } from "react-router-dom";
import styled, { ColorsNames, css } from "styled-components";

interface ButtonLinkProps {
  link: string
  color: ColorsNames;
  text: string;
  opacity?: string
}


export const ButtonLink = ({ link, color, text, opacity="25" }: ButtonLinkProps) => {
  return (
    <Link
      to={link}
      className="m-2 px-4 py-6 rounded-lg font-mono"
      color={color}
      opacity={opacity}
    >
      {text}
    </Link>
  );
};

const Link = styled(RouterLink)<{ color: ColorsNames; opacity: string }>`
  background-color: ${({ theme, color, opacity}) =>
    `${theme.colors[color][600]}${opacity}`};
  color: ${({ theme, color }) => theme.colors[color][700]};
  :hover {
    background-color: ${({ theme, color }) => theme.colors[color][300]};
  }
`;