import IPlayer from '../models/IPlayer'
import { IPlayers } from '../models/ILobby';
import { values } from 'lodash'

export class GameResolution {

  public static prepareForNextRound(players: IPlayer[]) {
    players.forEach(player => {
      player.currentChoice = ''
    });
  }

  public static resetGameTurn(players: IPlayers) {
    players['player1'].resetForNextTurn()
    players['player2'].resetForNextTurn()
  }

  public static playTurn(players: IPlayers) {
    if (this.defineWeakness(players['player1'].currentChoice) === players['player2'].currentChoice) {
      players['player2'].setCurrentWinner()
    } else if (this.defineWeakness(players['player2'].currentChoice) === players['player1'].currentChoice) {
      players['player1'].setCurrentWinner()
    }

    return values(players)
  }

  private static defineWeakness(type: string): string | undefined {
    switch (type) {
      case 'fire':
        return 'water'
      case 'water':
        return 'grass'
      case 'grass':
        return 'fire'
    }
  }
}