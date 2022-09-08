import React from "react";

interface ProsTextList {
  color: string;
  text: string;
}

export const TextList = ({ color, text }: ProsTextList) => {
  return (
    <li className={`text-${color}-700 text-xl`}>{text}</li>
  );
};