import { Request, Response } from 'express'
import ILobby from '../models/ILobby'
import IPlayer from '../models/IPlayer'
import { GameResolution } from '../services/GameResolution'

// TODO gérer la déconnexion du client comme ça je n'oublie pas
export class LobbyCrud {

  private static lobbies: ILobby[] = []

  static checkWhoIsTheWinner(players: IPlayer[]) {
    return GameResolution.playTurn(players)
  }

  public static initSockets(sockets: any) {
    sockets.on('connection', (socket: any) => {

      socket.on('join room', (lobbyId: string) => {
        console.log('join room', lobbyId)

        socket.join(lobbyId)
        const currentLoby = LobbyCrud.lobbies.find(lobby => lobby.uuid === lobbyId)

        if (currentLoby) {
          sockets.sockets.to(lobbyId).emit('current lobby', currentLoby.players);
        }
      });

      socket.on('leave room', (lobbyId: string) => {
        socket.leave(lobbyId)
        const currentLoby = LobbyCrud.lobbies.find(lobby => lobby.uuid === lobbyId)
        if (currentLoby) {
          sockets.sockets.to(lobbyId).emit('current lobby', currentLoby.players);
        }
      })

      socket.on('start game', (lobbyId: string) => {

        const currentLobby = LobbyCrud.lobbies.find(lobby => lobby.uuid === lobbyId)

        if (!currentLobby) return
        GameResolution.resetGameTurn(currentLobby.players)

        sockets.sockets.to(lobbyId).emit('is starting');
      })

      socket.on('user choice', ({ lobbyId, player }: any) => {

        const currentLobby = LobbyCrud.lobbies.find(lobby => lobby.uuid === lobbyId)
        const currentLobbyIndex = LobbyCrud.lobbies.findIndex(lobby => lobby.uuid === lobbyId)

        if (!currentLobby) return

        const currentPlayer = currentLobby.players.find(p => p.id === player.id)
        if (!currentPlayer) return

        currentPlayer.setCurrentUserChoice(player.currentChoice)
        const currentPlayerIndex = currentLobby.players.findIndex(p => p.id === player.id)
        currentLobby.players.splice(currentPlayerIndex, 1, currentPlayer)
        LobbyCrud.lobbies.splice(currentLobbyIndex, 1, currentLobby)

        if (currentLobby.players.length < 2 || currentLobby.players.find(player => player.currentChoice === '')) {
          // console.log('in waiting :', currentLobby.players);
          sockets.sockets.to(lobbyId).emit('winner', null);
        } else {
          // console.log('result :', currentLobby.players);
          sockets.sockets.to(lobbyId).emit('winner', this.checkWhoIsTheWinner(currentLobby.players))};
      })
    });
  }

  public static async create(req: Request, res: Response) {
    try {
      const player = new IPlayer(req.socket.remoteAddress as string, req.body.name, 'player1')

      const newLobby = new ILobby([player])
      LobbyCrud.lobbies = [...LobbyCrud.lobbies, newLobby]

      return res.status(200).send({ lobbyId: newLobby.uuid, player })
    } catch (error) {
      res.send({ message: 'error', error })
    }
  }

  public static async join(req: Request, res: Response) {
    try {
      const lobbyId = req.body.lobbyId

      const currentLobby = LobbyCrud.lobbies.find(lobby => lobby.uuid === lobbyId)

      if (currentLobby && currentLobby.players.length < 2) {
        const newPlayer = new IPlayer(
          req.socket.remoteAddress as string,
          req.body.name,
          `player${currentLobby.players.length + 1}`
        )

        currentLobby.addNewPlayer(newPlayer)
        return res.status(200).send({ lobbyId: currentLobby.uuid, player: newPlayer })
      }
      return currentLobby && currentLobby.players.length >= 2
        ? res.status(404).send({ message: 'error', error: 'This lobby cannot contain more players' })
        : res.status(404).send({ message: 'error', error: 'Lobby not found' })
    } catch (error) {
      res.send({ message: 'error', error })
    }
  }

  public static async quit(req: Request, res: Response) {
    try {
      const lobbyId = req.params.lobbyId
      const currentLobby = LobbyCrud.lobbies.find(lobby => lobby.uuid === lobbyId)
      if (currentLobby) {
        const currentPlayerIndex = currentLobby.players.findIndex(player => player.id === req.body.playerId)
        if (currentPlayerIndex !== -1) {
          currentLobby.players.splice(currentPlayerIndex, 1)
          return res.status(200).send({ players: currentLobby.players })
        }
        return res.status(404).send({ message: 'error', error: 'Player not found' })
      }
      return res.status(404).send({ message: 'error', error: 'Lobby not found' })
    } catch (error) {
      res.send({ message: 'error', error })
    }
  }
}