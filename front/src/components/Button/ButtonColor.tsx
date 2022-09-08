import React from "react";
import { Link } from "react-router-dom";

interface ProsButtonColor {
  color: string;
  text: string;
}

export const ButtonColor = ({ color, text }: ProsButtonColor) => {
  return (
    <Link
      to="/tuto"
      className={`m-2 px-4 py-6 bg-${color}-600 bg-opacity-25 rounded-lg font-mono text-${color}-700 hover:bg-${color}-300`}
    >
      {text}
    </Link>
  );
};
