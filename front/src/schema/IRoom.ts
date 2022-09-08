import { IPlayer } from "./IPlayer";

export class IRoom {
    uuid?: string;
    players?: Array<IPlayer>
    url: string = `http://localhost:3000/lobby/${this.uuid}`
}