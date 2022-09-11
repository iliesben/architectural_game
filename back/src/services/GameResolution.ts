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
    players['player1'].resetCurrentChoice()
    players['player2'].resetCurrentChoice()
    players['player1'].resetCurrentWinner()
    players['player2'].resetCurrentWinner()
  }

  public static playTurn(players: IPlayers) {
    if (this.defineWeakness(players['player1'].currentChoice) === players['player2'].currentChoice) {
      players['player2'].incrementNbWin()
      players['player2'].setCurrentWinner(players['player2'].id)
      players['player1'].setCurrentWinner(players['player2'].id)
    } else if (this.defineWeakness(players['player2'].currentChoice) === players['player1'].currentChoice) {
      players['player1'].incrementNbWin()
      players['player1'].setCurrentWinner(players['player1'].id)
      players['player2'].setCurrentWinner(players['player1'].id)
    }

    return values(players)
  }

  private static defineWeakness(type: string) {
    switch (type) {
      case 'fire':
        return 'water'
      case 'water':
        return 'grass'
      case 'grass':
        return 'fire'
      case 'iron':
        return 'iron'
    }
  }
}