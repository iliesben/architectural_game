import React from "react";

interface ProsTextContent {
  text: string;
}

export const TextContent = ({ text }: ProsTextContent) => {
  return (
    <p className="text-xl">{text}</p>
  );
};