import React from "react";

interface Props {
  value: string;
}

export const SubmitButton = ({ value }: Props) => (
  <input
    type="submit"
    value={value}
    className="mt-10 px-4 py-4 bg-gray-300 bg-opacity-50 rounded-lg font-mono text-white cursor-pointer hover:bg-opacity-25"
  />
);
