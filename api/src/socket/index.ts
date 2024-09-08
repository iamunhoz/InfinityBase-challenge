import { Express } from "express"
import { Server } from "socket.io"
import http from "http"
import { serverData } from "src/lib/config"
import { Chatroom } from "src/models"

class SocketIo {
  private io: Server | null = null
  constructor() {
    this.initialize = this.initialize.bind(this)
    this.emitNewChatroom = this.emitNewChatroom.bind(this)
  }
  async initialize(app: Express) {
    const server = http.createServer(app)
    this.io = new Server(server, {
      cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
      },
    })

    this.io.on("connection", (socket) => {
      console.log("User connected:", socket.id)

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id)
      })
    })

    server.listen(serverData.portSocket, () => {
      console.log(`Socket server listening on port ${serverData.portSocket}`)
    })
  }

  emitNewChatroom(chatroomData: Chatroom) {
    if (this.io) {
      this.io.emit("newChatroom", chatroomData)
    }
  }
}

export default new SocketIo()
