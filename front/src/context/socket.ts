import { createContext } from "react";
import { io, Socket } from "socket.io-client";

export const socket = io(import.meta.env.VITE_API_URL)
export const SocketContext = createContext<null | Socket>(null);
