import React, { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { SubmitButton } from "../Button/Submit.button";
import { TextInput } from "../Input/Text.input";
import { createGame } from "@/services/game.service";
import { useNavigate } from "react-router-dom";

export const CreateForm = () => {

  const navigate = useNavigate()

  const [name, setName] = useState<string>("");

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => setName((e.target as HTMLInputElement).value);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name) return

    const lobby = await createGame({
      name
    })
    if (!lobby) return

    const { lobbyId, player } = lobby

    return navigate("/game/" + lobbyId,
      {
        state: { lobbyId, player }
      }
    )
  };

  return (
    <form
      className="flex flex-col justify-center items-center mt-20 w-11/12"
      onSubmit={handleSubmit}
    >
      <TextInput
        placeholder="Nom du player"
        value={name}
        onChange={handleChangeName}
      />
      <SubmitButton value="Go!" />
    </form>
  );
};
