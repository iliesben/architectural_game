import React from "react";

interface ButtonFormProps {
  type: string;
  value: string;
}

export const ButtonForm = ({ type, value }: ButtonFormProps) => {
  return (
    <input
      type={type}
      value={value}
      className="mt-10 px-4 py-4 bg-gray-300 bg-opacity-50 rounded-lg font-mono text-white cursor-pointer hover:bg-opacity-25"
    ></input>
  );
};
