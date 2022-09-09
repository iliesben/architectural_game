import React from "react";

interface InputFormProps {
  placeholder: string;
  value: string;
  handle: any;
}

export const InputForm = ({ placeholder, value, handle }: InputFormProps) => {
  return (
    <input
      className="input-form mt-8 p-4 w-full max-w-xs"
      placeholder={placeholder}
      type="text"
      value={value}
      required
      onChange={handle}
    />
  );
};
