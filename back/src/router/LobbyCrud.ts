import { Request, Response } from 'express'
import ILobby from '../classes/ILobby'
import IPlayer from '../classes/IPlayer'
import { GameResolution } from '../services/gameResolution'

export class LobbyCrud {

  private static lobbies: ILobby[] = []

  static checkWhoIsTheWinner(players: IPlayer[]) {
    GameResolution.playTurn(players)
    return players
  }

  static resetPlayersChoices(players: IPlayer[]){
    GameResolution.prepareForNextRound(players)
  }

  public static initSockets(sockets: any) {
    sockets.on('connection', (socket: any) => {
      socket.on('join room', (lobbyId: string) => {
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
      
      socket.on('user choice', ({ lobbyId, player }: any) => {
        const currentLobby = LobbyCrud.lobbies.find(lobby => lobby.uuid === lobbyId)
        const currentLobbyIndex = LobbyCrud.lobbies.findIndex(lobby => lobby.uuid === lobbyId)
        if (currentLobby) {
          const currentPlayer = currentLobby.players.find(p => p.id === player.id)
          if (currentPlayer) {
            currentPlayer.setCurrentUserChoice(player.currentChoice)
            const currentPlayerIndex = currentLobby.players.findIndex(p => p.id === player.id)
            currentLobby.players.splice(currentPlayerIndex, 1, currentPlayer)
            LobbyCrud.lobbies.splice(currentLobbyIndex, 1, currentLobby)
            if (currentLobby.players.find(player => player.currentChoice === '')) {
              return
            }
            sockets.sockets.to(lobbyId).emit('current lobby', this.checkWhoIsTheWinner(currentLobby.players));
            sockets.sockets.to(lobbyId).emit('current lobby', this.resetPlayersChoices(currentLobby.players));
          }
        }
      })
    });
  }

  public static async create(req: Request, res: Response) {
    try {
      const player = new IPlayer(req.socket.remoteAddress as string, req.body.playerName, 'player1')
      const newLobby = new ILobby([player])
      LobbyCrud.lobbies = [...LobbyCrud.lobbies, newLobby]
      return res.status(200).send({ lobbyUrl: newLobby.url, player })
    } catch (error) {
      res.send({ message: 'error', error })
    }
  }

  public static async join(req: Request, res: Response) {
    try {
      const lobbyId = req.params.lobbyId
      const currentLobby = LobbyCrud.lobbies.find(lobby => lobby.uuid === lobbyId)
      if (currentLobby) {
        const newPlayer = new IPlayer(
          req.socket.remoteAddress as string,
          req.body.playerName,
          `player${currentLobby.players.length + 1}`
        )
        currentLobby.addNewPlayer(newPlayer)
        return res.status(200).send({ lobbyUrl: currentLobby.url, player: newPlayer })
      }
      return res.status(404).send({ message: 'error', error: 'Lobby not found' })
    } catch (error) {
      res.send({ message: 'error', error })
    }
  }
}