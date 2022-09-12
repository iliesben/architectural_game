import { IPlayer } from "@/schema/IPlayer";
import axios from "axios";
import { IRoom } from "@/schema/IRoom";

const api_path = import.meta.env.VITE_API_URL

interface Lobby {
  lobbyId: string
  player: IPlayer
}

export const createGame = async (player: IPlayer): Promise<Lobby | false> => (
  await axios.post(api_path + '/api/create', player)
    .then(response => response.data)
    .catch(error => false)
)

export const joinGame = async (lobby: IRoom): Promise<Lobby | false> => (
  await axios.post(api_path + '/api/lobby/' + lobby.lobbyId, lobby)
    .then(response => response.data)
    .catch(error => false)
)

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