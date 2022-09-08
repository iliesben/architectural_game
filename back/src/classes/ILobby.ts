import {v4 as uuidv4} from 'uuid'
import IPlayer from './IPlayer'

export default class ILobby {

  public uuid: string = uuidv4()
  public players: IPlayer[]
  public url: string = `http://localhost:3000/lobby/${this.uuid}`

  constructor(players: IPlayer[]) {
    this.players = players
  }

  public addNewPlayer(player: IPlayer) {
    if (this.players.length <= 1) {
      this.players = [...this.players, player]
    }
  }
}
