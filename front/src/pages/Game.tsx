// recupere le socket si on rejoint, sinon créer un
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Choose } from "../components/Choose";
import { OverLimit, Waiting } from "../components/Waiting";
import { GameColumn } from "../components/Game/GameColumn";
import { ContainerArena } from "../components/Container/ContainerArena";
import { ContainerPlayer } from "../components/Container/ContainerPlayer";
import { io } from "socket.io-client";
import { IPlayer } from "@/schema/IPlayer";
import { ButtonLink } from "@/components/Button/ButtonLink";
import { ElementType } from "@/types/game.type";
import { Location, useLocation } from "react-router-dom";
import { SocketContext } from '@/context/socket';
import { useTimer } from 'react-timer-hook';
import * as _ from 'lodash';
interface LocationState {
  player: IPlayer;
  lobbyId: string
}

export const Game = () => {

  const location = useLocation()
  if (!location.state) return
  const { player: playerState, lobbyId } = location.state as LocationState;

  const socket = useContext(SocketContext);
  if (!socket) return

  // const socketRef = useRef();
  // socketRef.current = socket;

  const [currentPlayer, setCurrentPlayer] = useState<IPlayer>(playerState)
  const [otherPlayer, setOtherPlayer] = useState<undefined | IPlayer>()

  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 5);
  const { seconds, isRunning, start, restart } = useTimer({ expiryTimestamp, autoStart: false, onExpire: () => send() });

  const handlePlayer = useCallback((_players: IPlayer[] ) => {
    console.log('_players :', _players)

    const player = _players.find(player => player.id !== currentPlayer.id)
    setOtherPlayer(player);
  }, []);

  const thewineris = (_players: IPlayer[] | null) => {
    console.log('win _players :', _players)
    if (!_players) return

    _players.map(player => {
      if (player.id === currentPlayer.id) setCurrentPlayer(player)
      else setOtherPlayer(player)
    })
    // setCurrentPlayer(_players.find(player => player.id === currentPlayer.id) as IPlayer)
    // setOtherPlayer(_.find(_players, { id: "player2" }))
  }


  useEffect(() => {
    const { connected } = socket.emit('join room', lobbyId)
    console.log('connected', connected)
    if (!connected) return

    socket.on('current lobby', handlePlayer);
    socket.on('is starting', startGameTimer )
    socket.on('winner', thewineris )

    return () => {
      socket.off('current lobby', handlePlayer);
      socket.off('is starting')
      socket.off('winner')
    };
  }, [socket, handlePlayer]);

  const startGame = () => {
    socket.emit('start game', lobbyId)
  }
  const startGameTimer = () => {
    if (expiryTimestamp) return start()

    const time = new Date();
    time.setSeconds(time.getSeconds() + 10);
    restart(time)
  }

  const getElement = (elem: ElementType) => {
    setCurrentPlayer({ ...currentPlayer, currentChoice: elem })
  }

  const send = () => {
    socket.emit('user choice', {
      lobbyId,
      player: currentPlayer
    })
  }

  return (
    <>
      {(currentPlayer === undefined) ? 
      <>
        <OverLimit /><br/>Vous ne pouvez pas rejoindre cette room
      </>:      
      <>
      <Heading className="text-xl">
              {currentPlayer && !otherPlayer && <div>Envoyer le lien !</div>}
              {(currentPlayer && otherPlayer) &&
                  (!isRunning
                      ? currentPlayer.id === "player1"
                          ? <div className="text-teal-300 underline cursor-pointer" onClick={startGame}>Lancez une partie !</div>
                          : <div>C'est au premier joueur de lancer !</div>
                      : <div>Choisissez un élément: ({seconds} s)</div>
                  )}
          </Heading><GameContainer className="flex flex-row">
                  <GameColumn>
                      <ContainerPlayer player={currentPlayer} />
                  </GameColumn>
                  <GameColumn column="half" className="flex justify-center">
                      {(currentPlayer && otherPlayer)
                          ? (
                              isRunning
                                  ?
                                  <Choose onClick={getElement} />
                                  : (currentPlayer.currentChoice && otherPlayer.currentChoice)
                                      ? <ContainerArena currentPlayer={currentPlayer} otherPlayer={otherPlayer} currentWinner={currentPlayer.currentWinner} />
                                      : <Waiting />
                          )
                          : <Waiting />}
                  </GameColumn>
                  <GameColumn>
                      <ContainerPlayer player={otherPlayer} />
                  </GameColumn>
              </GameContainer><ButtonContainer>
                  <ButtonLink
                      link="/"
                      text="Quitter la partie"
                      color="gray"
                      opacity="00" />
              </ButtonContainer></> 
      }
    </>
  );
}

const Heading = styled.div`
  margin: 2rem;
  text-align: center;
`;

const ButtonContainer = styled.div`
  margin-top: 5rem;
  text-align: center;
`;

const GameContainer = styled.div``;
