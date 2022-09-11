import React from "react";

interface Props {
  children: string | JSX.Element;
  className?: string;
}

export const ChoiceGame = ({ children, className }: Props) => (
  <div className={`basis-1/4 text-center mt-4 px-12 ${className}`}>
    {children}
  </div>
);
