import {describe, expect, test} from '@jest/globals';
import IPlayer from '../models/IPlayer';
import { GameResolution } from './gameResolution';

describe('Test playTurn() function', () => {

  test('first player should win', () => {
    let player1: IPlayer = new IPlayer('::1', 'player 1', '1')
    let player2: IPlayer = new IPlayer('::1', 'player 2', '2')

    player1.setCurrentUserChoice('fire')
    player2.setCurrentUserChoice('grass')

    const players = [player1, player2]

    GameResolution.playTurn(players)
    expect(player1.nbWin).toEqual(1)
    expect(player2.nbWin).toEqual(0)
  })

  test('second player should win', () => {
    let player1: IPlayer = new IPlayer('::1', 'player 1', '1')
    let player2: IPlayer = new IPlayer('::1', 'player 2', '2')

    player1.setCurrentUserChoice('fire')
    player2.setCurrentUserChoice('water')

    const players = [player1, player2]

    GameResolution.playTurn(players)
    expect(player1.nbWin).toEqual(0)
    expect(player2.nbWin).toEqual(1)
  })
})