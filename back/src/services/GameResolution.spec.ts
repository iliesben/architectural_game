import IPlayer from '../models/IPlayer';
import { GameResolution } from './GameResolution';

describe('Test playTurn() function', () => {

  test('first player should win', () => {
    const player1 = new IPlayer('::1', 'player 1', 'player1')
    const player2 = new IPlayer('::1', 'player 2', 'player2')

    player1.setCurrentUserChoice('fire')
    player2.setCurrentUserChoice('grass')

    const players = {
      [player1.id]: player1, 
      [player2.id]: player2
    }

    GameResolution.playTurn(players)
    expect(player1.nbWin).toEqual(1)
    expect(player2.nbWin).toEqual(0)
  })

  test('second player should win', () => {
    const player1 = new IPlayer('::1', 'player 1', 'player1')
    const player2 = new IPlayer('::1', 'player 2', 'player2')

    player1.setCurrentUserChoice('fire')
    player2.setCurrentUserChoice('water')

    const players = {
      [player1.id]: player1, 
      [player2.id]: player2
    }

    GameResolution.playTurn(players)
    expect(player1.nbWin).toEqual(0)
    expect(player2.nbWin).toEqual(1)
  })
})