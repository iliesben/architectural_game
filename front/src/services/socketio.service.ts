import { Dispatch, SetStateAction } from 'react';
import { io, Socket } from 'socket.io-client';
// import { DefaultEventsMap, EventNames, EventParams, EventsMap, Emitter } from "@socket.io/component-emitter";

let socket: Socket;

export const initiateSocketConnection = () => {
  socket = io("http://localhost:3000");
	console.log(`Connecting socket...`);
}

export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if(socket) socket.disconnect();
}

export const joinSocket = (lobbyId: string): Socket => {
  console.log('socket', socket)
  return socket.emit('join room', lobbyId)
}

export const currentLobbySocket = (setPlayers: Dispatch<SetStateAction<any[]>>) =>
  socket.on('current lobby', (_players: any[]) => setPlayers(_players))