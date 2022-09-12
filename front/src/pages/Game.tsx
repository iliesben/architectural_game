// recupere le socket si on rejoint, sinon créer un
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ChooseGame } from "../components/Container/Game/Choose.container";
import { OverLimitImg, WaitingImg } from "../components/Image/Waiting.image";
import { GameColumn } from "../components/Container/Game/ColumnGame.container";
import { ArenaGame } from "../components/Container/Game/ArenaGame.container";
import { PlayerGame } from "../components/Container/Game/PlayerGame.container";
import { IPlayer } from "@/schema/IPlayer";
import { ButtonLink } from "@/components/Button/Link.button";
import { ElementType } from "@/types/game.type";
import { useLocation } from "react-router-dom";
import { SocketContext } from '@/context/socket';
import { useTimer } from 'react-timer-hook';
import * as _ from 'lodash';

interface LocationState {
  player: IPlayer;
  lobbyId: string
}

export const Game = () => {

  const location = useLocation()
  if (!location.state) return <div className = "text-xl">Repasse par la home frérot</div>
  const { player: playerState, lobbyId } = location.state as LocationState;

  const socket = useContext(SocketContext);
  if (!socket) return <div className="text-xl">Repasse par la home frérot</div>

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
        <OverLimitImg /><br/>Vous ne pouvez pas rejoindre cette room
      </>:      
      <>
        <Heading className="text-xl">
            {currentPlayer && !otherPlayer && <div onClick={() => { navigator.clipboard.writeText(lobbyId) }} className="cursor-pointer">Clique pour copier le lien !</div>}
            { (currentPlayer && otherPlayer) &&
                (!isRunning
                ? currentPlayer.id === "player1"
                    ? <div className="text-teal-300 underline cursor-pointer" onClick={startGame}>Lancez une partie !</div>
                    : <div>C'est au premier joueur de lancer !</div>
                : <div>Choisissez un élément: ( {seconds} s)</div>
                )
            }
        </Heading>
        <GameContainer className="flex flex-row">
            <GameColumn>
            <PlayerGame player={currentPlayer}/>
            </GameColumn>
            <GameColumn column="half" className="flex justify-center">
            {
                (currentPlayer && otherPlayer)
                ? (
                    isRunning
                    ?
                    <ChooseGame onClick={getElement} />
                    : (currentPlayer.currentChoice && otherPlayer.currentChoice)
                        ? <ArenaGame currentPlayer={currentPlayer} otherPlayer={otherPlayer} />
                        : <WaitingImg />
                    )
                : <WaitingImg />
            }
            </GameColumn>
            <GameColumn>
            <PlayerGame player={otherPlayer} />
            </GameColumn>
        </GameContainer>
        <ButtonContainer>
            <ButtonLink
            link="/"
            label="Quitter la partie"
            color="gray"
            opacity="00"
            onClick={() => socket.emit('leave room', { lobbyId, playerId: currentPlayer.id }) }
            />
        </ButtonContainer>
        </> 
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

const GameContainer= styled.div``;
