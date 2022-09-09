import React from "react";
import { Link } from "react-router-dom";

interface ProsButtonHome {
  link: string;
  text: string;
}

export const ButtonHome = ({ link, text }: ProsButtonHome) => {
  return (
    <Link
      to={link}
      className={`absolute top-5 left-5 px-4 py-6 bg-gray-600 bg-opacity-50 rounded-lg font-mono text-white hover:bg-opacity-75`}
    >
      {text}
    </Link>
  );
};
