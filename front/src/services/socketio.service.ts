import { IPlayer } from '@/schema/IPlayer';
import { Dispatch, SetStateAction } from 'react';
import { io, Socket } from 'socket.io-client';

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

export const currentLobbySocket = (setPlayers: Dispatch<SetStateAction<IPlayer[]>>) =>
  socket.on('current lobby', (_players: IPlayer[]) => setPlayers(_players))