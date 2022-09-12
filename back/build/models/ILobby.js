"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class ILobby {
    constructor(players) {
        this.uuid = (0, uuid_1.v4)();
        this.url = `http://localhost:3030/lobby/${this.uuid}`;
        this.players = players;
    }
    addNewPlayer(player) {
        if (Object.keys(this.players).length < 2) {
            this.players[player.id] = player;
        }
    }
}
exports.default = ILobby;
