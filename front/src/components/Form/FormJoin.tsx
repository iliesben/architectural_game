import { joinGame } from "@/services/game.service";
import React, { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonForm } from "../Button/ButtonForm";
import { InputForm } from "../Input/InputForm";

export const FormJoin = () => {
  const navigate = useNavigate()


  const [name, setName] = useState<string>("");
  const [lobbyId, setLobbyId] = useState("");

  const handleChangeName = (e: MouseEvent<HTMLInputElement>) => setName((e.target as HTMLInputElement).value);

  const handleChangeLobbyId = (e: MouseEvent<HTMLInputElement>) => setLobbyId((e.target as HTMLInputElement).value);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !lobbyId) return

    const lobby = await joinGame({
      lobbyId: lobbyId,
      name,
    })
    if (!lobby) return
    const { player } = lobby

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
      <InputForm
        placeholder="Lien de la salle"
        value={lobbyId}
        handle={handleChangeLobbyId}
      />
      <ButtonForm type="submit" value="Go!" />
    </form>
  );
};
