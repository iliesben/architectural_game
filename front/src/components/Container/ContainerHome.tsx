import React from "react";
import { Title } from "../Text/Title";
import { ButtonLink } from "../Button/ButtonLink";
import  * as gameService  from "@/services/game.service";
import { IPlayer } from "@/schema/IPlayer";
import { useNavigate } from "react-router-dom";
import { IRoom } from "@/schema/IRoom";

export const ContainerHome = () => {
  const navigate = useNavigate();
  
  const createNewGame = async (player: IPlayer) => {
    let path = gameService.createGame(player)
    navigate(path)
  };

  const joinGame = async (lobby: IRoom) => {
    let path = gameService.joinGame(lobby)
    navigate(path)
  };


  return (
    <div className="flex flex-col justify-center items-center mt-40">
      <Title content="Bienvenu sur le meilleur chifoumi de ta vie!" />
      <div className="flex flex-row flex-wrap justify-center items-center mt-10">
        <ButtonLink link="/create" color="green" text="Créer une partie" />
        <ButtonLink link="/join" color="blue" text="Rejoindre une partie" />
        <ButtonLink link="/tuto" color="red" text="Voir le tuto" />
      </div>
    </div>
  );
};
