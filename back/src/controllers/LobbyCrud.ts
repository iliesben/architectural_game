import { Request, Response } from 'express'
import ILobby from '../models/ILobby'
import IPlayer from '../models/IPlayer'
import IMessage from '../models/IMessage'
import { GameResolution } from '../services/GameResolution'
import { find, values } from 'lodash'

interface ILobbies {
  [uuid: string]: ILobby
}

export class LobbyCrud {

  private static lobbies: ILobbies = {}

  public static initSockets(sockets: any) {
    sockets.on('connection', (socket: any) => {

      socket.on('join room', (lobbyId: string) => {
        socket.join(lobbyId)
        const currentLobby = LobbyCrud.lobbies[lobbyId]

        if (currentLobby) {
          sockets.sockets.to(lobbyId).emit('current lobby', values(currentLobby.players));
        }
      });

      socket.on('leave room', ({ lobbyId, playerId }: any) => {
        socket.leave(lobbyId)
        const currentLobby = LobbyCrud.lobbies[lobbyId]
        if (currentLobby?.players[playerId]) {
          delete currentLobby.players[playerId]
          LobbyCrud.lobbies[lobbyId] = currentLobby
          sockets.sockets.to(lobbyId).emit('current lobby', values(currentLobby.players));
        }
      })

      socket.on('start game', (lobbyId: string) => {
        const currentLobby = LobbyCrud.lobbies[lobbyId]
        if (!currentLobby) return

        GameResolution.resetGameTurn(currentLobby.players)
        sockets.sockets.to(lobbyId).emit('is starting');
      })

      socket.on('user choice', ({ lobbyId, player }: any) => {
        const currentLobby = LobbyCrud.lobbies[lobbyId]
        if (!currentLobby) return

        const currentPlayer = currentLobby.players[player.id]
        if (!currentPlayer) return

        currentPlayer.setCurrentUserChoice(player.currentChoice)
        currentLobby.players[player.id] = currentPlayer
        LobbyCrud.lobbies[lobbyId] = currentLobby

        if (Object.keys(currentLobby.players).length < 2 || find(currentLobby.players, player => player.currentChoice === '')) {
          sockets.sockets.to(lobbyId).emit('winner', null);
        } else {
          sockets.sockets.to(lobbyId).emit('winner', GameResolution.playTurn(currentLobby.players))};
      })

      socket.on('send message', ({ lobbyId, playerName, content }: any) => {
        const currentLobby = LobbyCrud.lobbies[lobbyId]
        if (currentLobby) {
          currentLobby.addNewMessage(new IMessage(playerName, content))
          LobbyCrud.lobbies[lobbyId] = currentLobby
          sockets.sockets.to(lobbyId).emit('current lobby messages', currentLobby.messages);
        }
      })

      socket.on('disconnect', () => {
        const roomsMapIterator = socket.adapter.rooms.keys()
        let lobbyId = ''

        for (let i = 0; i < 2; i++) {
          if (i === 1) lobbyId = roomsMapIterator.next().value
          roomsMapIterator.next().value
        }
        const currentLobby = LobbyCrud.lobbies[lobbyId]
        if (!currentLobby) return

        const currentPlayer = find(currentLobby.players, player => player.ip === socket.conn.remoteAddress)
        if (!currentPlayer) return

        delete currentLobby.players[currentPlayer.id]
        sockets.sockets.to(currentLobby.uuid).emit('current lobby', values(currentLobby.players));
      });
    });
  }

  public static async create(req: Request, res: Response) {
    try {
      const player = new IPlayer(
        req.socket.remoteAddress as string,
        req.body.name || req.body.playerName,
        'player1'
      )
      const newLobby = new ILobby({ [player.id]: player })
      LobbyCrud.lobbies[newLobby.uuid] = newLobby

      return res.status(200).send({ lobbyId: newLobby.uuid, player })
    } catch (error) {
      res.send({ message: 'error', error })
    }
  }

  public static async join(req: Request, res: Response) {
    try {
      const lobbyId = req.body.lobbyId || req.params.lobbyId
      const currentLobby = LobbyCrud.lobbies[lobbyId]
      const currentLobbyLength = Object.keys(currentLobby.players).length

      if (currentLobby && currentLobbyLength < 2) {
        const newPlayer = new IPlayer(
          req.socket.remoteAddress as string,
          req.body.name || req.body.playerName,
          `player${currentLobbyLength + 1}`
        )

        currentLobby.addNewPlayer(newPlayer)

        return res.status(200).send({ lobbyId: currentLobby.uuid, player: newPlayer })
      }
      return currentLobby && currentLobbyLength >= 2
        ? res.status(404).send({ message: 'error', error: 'This lobby cannot contain more players' })
        : res.status(404).send({ message: 'error', error: 'Lobby not found' })
    } catch (error) {
      res.send({ message: 'error', error })
    }
  }

  public static async quit(req: Request, res: Response) {
    try {
      const lobbyId = req.body.lobbyId || req.params.lobbyId
      const currentLobby = LobbyCrud.lobbies[lobbyId]

      if (currentLobby) {
        if (currentLobby.players[req.body.playerId]) {
          delete currentLobby.players[req.body.playerId]

          return res.status(200).send({ players: values(currentLobby.players) })
        }

        return res.status(404).send({ message: 'error', error: 'Player not found' })
      }

      return res.status(404).send({ message: 'error', error: 'Lobby not found' })
    } catch (error) {
      res.send({ message: 'error', error })
    }
  }
}