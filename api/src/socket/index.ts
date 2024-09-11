import { Express } from "express"
import { Server } from "socket.io"
import http from "http"
import { serverData } from "src/lib/config"
import { Chatroom } from "src/models"

import socketIOClient from "socket.io-client"

const socket: any = socketIOClient

export enum SocketEvent {
  newMessage = "new-message",
  newChatroom = "new-chatroom",
  joinRoom = "join-room",
  leftRoom = "left-room",
}

class SocketIo {
  private io: Server | null = null
  private static instance: SocketIo
  private _socket

  constructor() {
    this.initialize = this.initialize.bind(this)
    this._socket = socket("http://localhost:4001")
  }

  async initialize(app: Express) {
    const server = http.createServer(app)
    this.io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    })

    this.io.on("connection", (socket) => {
      console.log("new socket client:", socket.id)

      socket.on(
        SocketEvent.joinRoom,
        async ({
          chatroomId,
          userName,
          userId,
        }: {
          chatroomId: string
          userName: string
          userId: string
        }) => {
          await socket.join(chatroomId)
          console.log(`User ${userName}(${userId}) joined room: ${chatroomId}`)

          if (this.io) {
            this.io
              // .to(chatroomId)
              .emit(
                SocketEvent.joinRoom,
                `User ${userName}(${userId}) joined room: ${chatroomId}`
              )
          }
        }
      )

      // Event listener for sending messages to the room
      socket.on(
        SocketEvent.newMessage,
        ({ chatroomId, message }: { chatroomId: string; message: string }) => {
          console.log(
            `Message from ${socket.id} in room ${chatroomId}: ${message}`
          )
          // Broadcast the message to all clients in the room
          if (this.io) {
            this.io.emit(SocketEvent.newMessage, {
              message,
              userId: socket.id,
            })
          }
        }
      )

      socket.on(SocketEvent.newChatroom, () => {
        console.log("new chatroom created")

        if (this.io) {
          this.io.emit(SocketEvent.newChatroom)
        }
      })

      // Handle disconnection
      socket.on("disconnect", () => {
        console.log("socket client disconnected:", socket.id)
        // Optionally notify all rooms the user was part of
        socket.rooms.forEach((chatroomId) => {
          socket
            .to(chatroomId)
            .emit("userLeft", { userId: socket.id, chatroomId })
        })
      })
    })

    // Start the server
    server.listen(serverData.portSocket, () => {
      console.log(`Socket server listening on port ${serverData.portSocket}`)
    })
  }

  getInstance(): SocketIo {
    if (!SocketIo.instance) {
      SocketIo.instance = new SocketIo()
    }
    return SocketIo.instance
  }

  emit(event: string, dto: any): boolean {
    this._socket.emit(event, dto)
    return true
  }
}

export default new SocketIo()
