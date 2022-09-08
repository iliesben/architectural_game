import { Request, Response } from 'express'
import ILobby from '../classes/ILobby'
import IPlayer from '../classes/IPlayer'

export class LobbyCrud {

  static lobbies: ILobby[] = []

  public static async create(req: Request, res: Response) {
    try {
      const player = new IPlayer(req.socket.remoteAddress as string, req.body.playerName, 'player1')
      const newLobby = new ILobby([player])
      LobbyCrud.lobbies = [...LobbyCrud.lobbies, newLobby]
      return res.status(200).send({ lobbyUrl: newLobby.url })
    } catch (error) {
      res.send({ message: 'error', error })
    }
  }

  public static async join(req: Request, res: Response) {
    try {
      const lobbyId = req.params.lobbyId
      const currentLobby = LobbyCrud.lobbies.find(lobby => lobby.uuid === lobbyId)
      if (currentLobby) {
        currentLobby.addNewPlayer(new IPlayer(
          req.socket.remoteAddress as string,
          req.body.playerName,
          `player${currentLobby.players.length + 1}`
        ))
        return res.status(200).send({ lobbyUrl: currentLobby.url })
      }
      return res.status(404).send({ message: 'error', error: 'Lobby not found' })
    } catch (error) {
      res.send({ message: 'error', error })
    }
  }
}