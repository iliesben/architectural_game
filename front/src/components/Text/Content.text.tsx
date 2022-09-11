import React from "react";

interface Props {
  text: string;
}

export const Content = ({ text }: Props) => <p className="text-xl">{text}</p>