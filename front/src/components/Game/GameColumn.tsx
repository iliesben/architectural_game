// recupere le socket si on rejoint, sinon créer un
import React from "react";
import styled from "styled-components";

interface Props {
  children: string | JSX.Element | JSX.Element[];
  column?: "half" | "quarter";
}

const basis = {
  quarter: "basis-1/4",
  half: "basis-1/2",
};

export const GameColumn = ({ children, column = "quarter" }: Props) => {
  return (
    <div className={`mt-4 px-12 text-center ${basis[column]}`}>{children}</div>
  );
};

