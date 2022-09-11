import React from "react";

interface Props {
    content: string
}

export const Title = ({ content }: Props) => (
  <h1 className="w-11/12 text-5xl font-bold font-mono text-gray-300 text-center">
    {content}
  </h1>
);
