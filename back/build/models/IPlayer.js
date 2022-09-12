"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IPlayer {
    constructor(ip, name, id) {
        this.nbWin = 0;
        this.currentChoice = '';
        this.currentWinner = false;
        this.ip = ip;
        this.name = name;
        this.id = id;
    }
    setCurrentWinner() {
        this.currentWinner = true;
        this.nbWin++;
    }
    setCurrentUserChoice(currentChoice) {
        this.currentChoice = currentChoice;
    }
    resetForNextTurn() {
        this.currentChoice = '';
        this.currentWinner = false;
    }
}
exports.default = IPlayer;
