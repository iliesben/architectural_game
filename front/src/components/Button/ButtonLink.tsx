import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import styled, { ColorsNames, css } from "styled-components";
import  * as gameService  from "@/services/game.service";
import { IPlayer } from "@/schema/IPlayer";
import { IRoom } from "@/schema/IRoom";
import io from 'socket.io-client';

const socket = io(`http://localhost:3000`);

interface ButtonLinkProps {
  link: string
  color: ColorsNames;
  text: string;
}


export const ButtonLink = ({ link, color, text }: ButtonLinkProps) => {

  const navigate = useNavigate();

  const goTo = async (link: string) => {
    if(link === "/game") {
      const uuid = await createNewGame({
        name: "player1",
        nbWin: 0,
        currentChoice: "fire"})
      // navigate(link + "/" + uuid)
      navigate(link + "/" + uuid)
      console.warn(uuid + "-------------")
      socket.emit('join room', uuid)
    } else if(link === "/join") {
      let lobbyId="test"
      socket.emit('join room', uuid)
    }
  }

  async function createNewGame(player: IPlayer) {
    return gameService.createGame(player).then((response) => response)
  }

  function joinGame(lobby: IRoom) {
    let path = gameService.joinGame(lobby)
    navigate('er')
  }

  return (
    <Link
      to={link}
      className="m-2 px-4 py-6 rounded-lg font-mono"
      color={color}
      onClick={() =>{
        goTo(link)
      }}
    >
      {text}
    </Link>
  );
};

const Link = styled(RouterLink)<{ color: ColorsNames }>`
  background-color: ${({ theme, color }) => theme.colors[color][600]}25;
  color: ${({ theme, color }) => theme.colors[color][700]};
  :hover {
    background-color: ${({ theme, color }) => theme.colors[color][300]};
  }
`;