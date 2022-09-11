import React from "react";

interface Props {
  children: string | JSX.Element | JSX.Element[];
  column?: "half" | "quarter";
  className?: string
}

const basis = {
  quarter: "basis-1/4",
  half: "basis-1/2",
};

export const GameColumn = ({ children, column = "quarter", className: className= "" }: Props) => <div className={`mt-4 px-12 text-center ${basis[column]} ${className}`}>{children}</div>

