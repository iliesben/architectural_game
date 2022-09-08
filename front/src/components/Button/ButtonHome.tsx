import React from "react";
import { Link } from "react-router-dom";

interface ProsButtonHome {
  color: string;
  opacity: string;
  text: string;
}

export const ButtonHome = ({ color, opacity, text }: ProsButtonHome) => {
  return (
    <Link
      to="/"
      className={`absolute top-5 left-5 px-4 py-6 bg-${color}-600 bg-opacity-50 rounded-lg font-mono text-white hover:bg-opacity-${opacity}`}
    >
      {text}
    </Link>
  );
};