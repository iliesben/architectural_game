import IPlayer from '../classes/IPlayer'

export class GameResolution {

  public static prepareForNextRound(players: IPlayer[]) {
    players.forEach(player => {
      player.currentChoice = ''
    });
  }

  // TODO : check for refacto (clean if else if)
  public static playTurn(players: IPlayer[]) {
    if(this.defineWeakness(players[0].currentChoice) == players[1].currentChoice) {
      players[1].incrementNbWin()
    } else if (this.defineWeakness(players[1].currentChoice) == players[0].currentChoice) {
      players[0].incrementNbWin()
    }
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