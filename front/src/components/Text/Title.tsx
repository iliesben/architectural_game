import React from "react";

interface PropsTitle {
    content: string
}

export const Title = ({ content }: PropsTitle) => {
  return (
    <h1 className="w-11/12 text-5xl font-bold font-mono text-gray-300 text-center">
      {content}
    </h1>
  );
};
