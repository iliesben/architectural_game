import IPlayer from '../models/IPlayer'

export class GameResolution {

  public static prepareForNextRound(players: IPlayer[]) {
    players.forEach(player => {
      player.currentChoice = ''
    });
  }

  public static resetGameTurn(players: IPlayer[]) {
    players[0].resetCurrentChoice()
    players[1].resetCurrentChoice()
    players[0].resetCurrentWinner()
    players[1].resetCurrentWinner()
  }

  public static playTurn(players: IPlayer[]) {
    if (this.defineWeakness(players[0].currentChoice) == players[1].currentChoice) {
      players[1].incrementNbWin()
      players[0].setCurrentWinner(players[1].id)
      players[1].setCurrentWinner(players[1].id)
    } else if (this.defineWeakness(players[1].currentChoice) == players[0].currentChoice) {
      players[0].incrementNbWin()
      players[0].setCurrentWinner(players[0].id)
      players[1].setCurrentWinner(players[0].id)
    }

    return players
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