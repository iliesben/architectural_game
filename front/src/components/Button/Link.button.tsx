import React from "react";
import { Link as RouterLink } from "react-router-dom";
import styled, { ColorsNames } from "styled-components";

interface ButtonLinkProps {
  link: string
  color: ColorsNames;
  label: string;
  onClick?: () => void;
  opacity?: string
}

export const ButtonLink = ({ link, color, label, onClick, opacity = "25" }: ButtonLinkProps) => (
  <Link
    to={link}
    color={color}
    opacity={opacity}
    onClick={onClick}
    className="m-2 px-4 py-6 rounded-lg font-mono"
  >
    {label}
  </Link>
);

const Link = styled(RouterLink) <{ color: ColorsNames; opacity: string }>`
  background-color: ${({ theme, color, opacity }) =>
    `${theme.colors[color][600]}${opacity}`};
  color: ${({ theme, color }) => theme.colors[color][700]};
  :hover {
    background-color: ${({ theme, color }) => theme.colors[color][300]};
  }
`;