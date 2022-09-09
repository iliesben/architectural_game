import React, { useState } from "react";
import { ButtonForm } from "../Button/ButtonForm";
import { InputForm } from "../Input/InputForm";

export const FormCreate = () => {
  const [pseudo, setPseudo] = useState("");

  const handleChangePseudo = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setPseudo(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    pseudo ? alert("Ok form") : alert("Erreur form");
    console.log("Pseudo", pseudo);
    e.preventDefault();
  };

  return (
    <form
      className="flex flex-col justify-center items-center mt-20 w-11/12"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <InputForm
        placeholder="Pseudo"
        value={pseudo}
        handle={(e: any) => {
          handleChangePseudo(e);
        }}
      />
      <ButtonForm type="submit" value="Go!" />
    </form>
  );
};
