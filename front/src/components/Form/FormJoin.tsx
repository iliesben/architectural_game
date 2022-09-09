import React, { useState } from "react";
import { ButtonForm } from "../Button/ButtonForm";
import { InputForm } from "../Input/InputForm";

export const FormJoin = () => {
  const [pseudo, setPseudo] = useState("");
  const [room, setRoom] = useState("");

  const handleChangePseudo = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setPseudo(e.target.value);
  };

  const handleChangeRoom = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setRoom(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    pseudo && room ? alert("Ok form") : alert("Erreur form");
    console.log("Pseudo", pseudo);
    console.log("Room", room);
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
      <InputForm
        placeholder="Lien de la salle"
        value={room}
        handle={(e: any) => {
          handleChangeRoom(e);
        }}
      />
      <ButtonForm type="submit" value="Go!" />
    </form>
  );
};
