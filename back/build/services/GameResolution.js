"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameResolution = void 0;
const lodash_1 = require("lodash");
class GameResolution {
    static prepareForNextRound(players) {
        players.forEach(player => {
            player.currentChoice = '';
        });
    }
    static resetGameTurn(players) {
        players['player1'].resetForNextTurn();
        players['player2'].resetForNextTurn();
    }
    static playTurn(players) {
        if (this.defineWeakness(players['player1'].currentChoice) === players['player2'].currentChoice) {
            players['player2'].setCurrentWinner();
        }
        else if (this.defineWeakness(players['player2'].currentChoice) === players['player1'].currentChoice) {
            players['player1'].setCurrentWinner();
        }
        return (0, lodash_1.values)(players);
    }
    static defineWeakness(type) {
        switch (type) {
            case 'fire':
                return 'water';
            case 'water':
                return 'grass';
            case 'grass':
                return 'fire';
        }
    }
}
exports.GameResolution = GameResolution;
