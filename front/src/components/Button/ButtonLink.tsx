import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import styled, { ColorsNames, css } from "styled-components";
import  * as gameService  from "@/services/game.service";
import { IPlayer } from "@/schema/IPlayer";
import { IRoom } from "@/schema/IRoom";
import * as io from 'socket.io-client';


interface ButtonLinkProps {
  link: string
  color: ColorsNames;
  text: string;
}


export const ButtonLink = ({ link, color, text }: ButtonLinkProps) => {

  const navigate = useNavigate();
  
  // const createNewGame = async (link: string) => {

  //   let path = gameService.createGame(player)
  //   navigate(path)
  // };

  // const joinGame = async (lobby: IRoom) => {
  //   let path = gameService.joinGame(lobby)
  //   navigate('er')
  // };

  const goTo = async (link: string) => {
    if(link === "/game") {
      createNewGame({
        name: "players1",
        nbWin: 0,
        currentChoice: "fire"})
    } else if(link === "/join") {
      
    }
  }

  function createNewGame(player: IPlayer) {
    let path = gameService.createGame(player)
    navigate(path)
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