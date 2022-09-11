import React, { ChangeEvent, useState } from "react";
import { joinGame } from "@/services/game.service";
import { useNavigate } from "react-router-dom";
import { SubmitButton } from "../Button/Submit.button";
import { TextInput } from "../Input/Text.input";

export const JoinForm = () => {

  const navigate = useNavigate()

  const [name, setName] = useState<string>("");
  const [lobbyId, setLobbyId] = useState("");

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => setName((e.target as HTMLInputElement).value);
  const handleChangeLobbyId = (e: ChangeEvent<HTMLInputElement>) => setLobbyId((e.target as HTMLInputElement).value);

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
      <TextInput
        placeholder="Nom du player"
        value={name}
        onChange={handleChangeName}
      />
      <TextInput
        placeholder="Lien de la salle"
        value={lobbyId}
        onChange={handleChangeLobbyId}
      />
      <SubmitButton value="Go!" />
    </form>
  );
};
