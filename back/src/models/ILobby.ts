import {v4 as uuidv4} from 'uuid'
import IPlayer from './IPlayer'

export interface IPlayers {
  [id: string]: IPlayer
}

export default class ILobby {

  public uuid: string = uuidv4()
  public players: IPlayers
  public url: string = `http://localhost:3030/lobby/${this.uuid}`

  constructor(players: IPlayers) {
    this.players = players
  }

  public addNewPlayer(player: IPlayer) {
    if (Object.keys(this.players).length < 2) {
      this.players[player.id] = player
    }
  }
}
