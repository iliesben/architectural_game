import React, { ChangeEvent, MouseEvent } from "react";

interface Props {
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput = ({ placeholder, value, onChange }: Props) => (
  <input
    className="input-form mt-8 p-4 w-full max-w-xs"
    type="text"
    placeholder={placeholder}
    value={value}
    required
    onChange={onChange}
  />
);