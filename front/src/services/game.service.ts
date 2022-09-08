import { IPlayer } from "@/schema/IPlayer";
import { IRoom } from "@/schema/IRoom";
import axios from "axios";
import { useNavigate } from "react-router";
import { Element, ElementId, ElementType } from "../types/game.type"

const navigate = useNavigate();
const api_path  = 'http://localhost:3000'

export const createGame = (player: IPlayer) : string => {
    let path = ''
    axios.post<IRoom>(api_path + '/create', player)
      .then((response) => {
        path = response.data.url
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
    return path
};

export const joinGame = (lobby: IRoom) => {
    axios.post<IRoom>(api_path + '/lobby/' + lobby.uuid)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
};

export const chooseElement = (element: ElementType) : string => {
    let winnerName = ''
    axios.post(api_path + '/lobby/chooseElement/' + ElementId.get(element))
       .then((response) => {
        winnerName = response.data
      })
      .catch((error) => {
      });
    return winnerName
}

export const quitGame = (lobby: IRoom) : boolean => {
    let bool = false
    axios.post<IRoom>(api_path + '/quit/' + lobby.uuid)
      .then((response) => {
        bool = true
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
    return bool
};