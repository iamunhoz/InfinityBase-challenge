import { io } from "socket.io-client"

export const socketClient = io(
  import.meta.env.MODE === "production"
    ? "https://enso.online:3001"
    : "http://localhost:4001"
)
