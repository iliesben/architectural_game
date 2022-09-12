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
import { TextInput } from "@/components/Input/Text.input";
import { SubmitButton } from "@/components/Button/Submit.button";

interface LocationState {
  player: IPlayer;
  lobbyId: string
}

interface IMessage {
  author: string,
  content: string
}

export const Game = () => {

  const location = useLocation()
  if (!location.state) return <div className="text-xl">Repasse par la home frérot</div>
  const { player: playerState, lobbyId } = location.state as LocationState;

  const socket = useContext(SocketContext);
  if (!socket) return <div className="text-xl">Repasse par la home frérot</div>

  const [currentPlayer, setCurrentPlayer] = useState<IPlayer>(playerState)
  const [otherPlayer, setOtherPlayer] = useState<undefined | IPlayer>()
  const [messages, setMessages] = useState<IMessage[]>([])
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false)

  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 5);
  const { seconds, isRunning, start, restart } = useTimer({ expiryTimestamp, autoStart: false, onExpire: () => send() });

  const handlePlayer = useCallback((_players: IPlayer[]) => {

    const player = _players.find(player => player.id !== currentPlayer.id)
    setOtherPlayer(player);
  }, []);

  const handleWinner = (_players: IPlayer[] | null) => {
    if (!_players) return

    _players.map(player => {
      if (player.id === currentPlayer.id) setCurrentPlayer(player)
      else setOtherPlayer(player)
    })
  }

  const handleMessage = (messages: IMessage[]) => {
    setMessages(messages)

    if (!messagesContainerRef.current) return

    messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
  }

  const formRef = useRef<HTMLFormElement | null>(null)
  const messagesContainerRef = useRef<HTMLDivElement | null>(null)

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    socket.emit('send message', {
      lobbyId,
      playerName: currentPlayer.name,
      content: (e.target as HTMLFormElement).currentMessage.value
    })

    formRef.current?.reset()
  }

  useEffect(() => {
    const { connected } = socket.emit('join room', lobbyId)
    if (!connected) return

    socket.on('current lobby', handlePlayer);
    socket.on('is starting', startGameTimer)
    socket.on('winner', handleWinner)
    socket.on('current lobby messages', handleMessage)

    return () => {
      socket.off('current lobby', handlePlayer);
      socket.off('is starting')
      socket.off('winner')
      socket.off('current lobby messages')
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

  const playersIn = currentPlayer && otherPlayer

  return (
    <div style={{ position: 'relative' }}>
      {(currentPlayer === undefined) ?
        <>
          <OverLimitImg /><br />Vous ne pouvez pas rejoindre cette room
        </>
        :
        <>
          <Heading className="text-xl">
            {!otherPlayer && <div onClick={() => { navigator.clipboard.writeText(lobbyId) }} className="cursor-pointer">Clique pour copier le lien !</div>}
            {playersIn &&
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
              <PlayerGame player={currentPlayer} />
            </GameColumn>
            <GameColumn column="half" className="flex justify-center">
              {
                playersIn
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
              onClick={() => socket.emit('leave room', { lobbyId, playerId: currentPlayer.id })}
            />
          </ButtonContainer>

          { isChatOpen && 
            <form
              ref={formRef}
              className="flex flex-col items-center justify-center w-screen h-96 text-gray-800 p-10"
              style={{ position: 'absolute', bottom: '0px' }}
              onSubmit={sendMessage}
            >
              <div className="flex flex-col flex-grow w-full max-w-xl bg-zinc-700 shadow-xl rounded-lg overflow-hidden">
                <div ref={messagesContainerRef} className="flex flex-col flex-grow h-0 p-4 overflow-auto space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex w-full mt-2 space-x-3 ml-auto ${(message.author === currentPlayer.name) && "justify-end"}`}
                    >
                      <div>
                        <p className="text-sm font-bold text-gray-300 leading-none mb-2">{message.author}</p>
                        <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                          <p className="text-md">{message.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-300 p-4">
                  <input className="flex items-center h-10 w-full rounded px-3 text-sm" type="text" name="currentMessage" placeholder="Type your message…"  />
                  <button className="mt-5 w-full" type="submit" value="Envoyer!">Envoyer !</button>
                </div>
              </div>

            </form>
          }
          
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            style={{ position: 'absolute', bottom: '-10px', left: '30px' }}
          >
            <p>{isChatOpen ? 'Fermer le chat' : 'Ouvrir le chat'}</p>
          </button>
        </>
      }
    </div>
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
