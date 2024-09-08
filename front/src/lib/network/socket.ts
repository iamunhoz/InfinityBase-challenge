import { io } from "socket.io-client"

export const socketClient = io("http://localhost:3001") // Adjust URL as needed
