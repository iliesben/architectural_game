import { IPlayer } from "@/schema/IPlayer";
import { IRoom } from "@/schema/IRoom";
import axios from "axios";
import { Element, ElementId, ElementType } from "../types/game.type"

const api_path = 'http://localhost:3000'

export const createGame = async (player: IPlayer): Promise<any> => {
  return await axios.post(api_path + '/api/create', player)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error);
      return "error";
    });
};

export const joinGame = async (lobby: IRoom): Promise<any> => {
  return await axios.post(api_path + '/api/lobby/' + lobby.lobbyId, lobby)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const chooseElement = (element: ElementType): string => {
  let winnerName = ''
  // /lobby/:lobbyId/inGame
  axios.post(api_path + '/api/lobby/:uuid/inGame' + ElementId.get(element))
    .then((response) => {
      winnerName = response.data
    })
    .catch((error) => {
    });
  return winnerName
}

export const quitGame = (lobby: IRoom, lobbyId: string): boolean => {
  let bool = false
  axios.post<IRoom>(api_path + '/api/lobby/:' + lobbyId + '/quit')
    .then((response) => {
      bool = true
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
  return bool
};