import { IPlayer } from "@/schema/IPlayer";
import React, { FormEvent, MouseEvent, useState } from "react";
import { ButtonForm } from "../Button/ButtonForm";
import { InputForm } from "../Input/InputForm";
import { createGame } from "@/services/game.service";
import { useNavigate } from "react-router-dom";

export const FormCreate = () => {

  const navigate = useNavigate()
  const [name, setName] = useState<string>("");

  const handleChangeName = (e: MouseEvent<HTMLInputElement>) => setName((e.target as HTMLInputElement).value);

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
      <InputForm
        placeholder="Nom du player"
        value={name}
        handle={handleChangeName}
      />
      <ButtonForm type="submit" value="Go!" />
    </form>
  );
};
