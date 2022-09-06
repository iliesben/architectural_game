import {v4 as uuidv4} from 'uuid';
import IPlayer from './IPlayer'

class ILobby {

  private uuid: string = uuidv4();
  private players: IPlayer[]

  constructor(players: IPlayer[]) {
    this.players = players
  }

  private generateNewPlayer(name: string) {
    const player = new IPlayer(name, '127.0.0.1');
    this.players.push(player)
  }
}
