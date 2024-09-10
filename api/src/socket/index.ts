import { Express } from "express"
import { Server, Socket } from "socket.io"
import http from "http"
import { serverData } from "src/lib/config"
import { Chatroom } from "src/models"

import socketIOClient from "socket.io-client"

const socket: any = socketIOClient

export enum SocketCalls {
  newMessage = "new-message",
  newChatroom = "new-chatroom",
  joinRoom = "join-room",
}

class SocketIo {
  private io: Server | null = null
  private static instance: SocketIo
  private _socket
  // private socketEmitter: Socket | null = null

  constructor() {
    this.initialize = this.initialize.bind(this)
    this.emitNewChatroom = this.emitNewChatroom.bind(this)
    this.emitNewMessage = this.emitNewMessage.bind(this)
    this._socket = socket("http://localhost:3001")
  }

  async initialize(app: Express) {
    const server = http.createServer(app)
    this.io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    })

    // Handle socket connections
    this.io.on("connection", (socket) => {
      // this.socketEmitter = socket
      console.log("new socket client:", socket.id)

      socket.onAny((data) => {
        console.log("=========socketinfoend============")
        console.log("socket calls", data)
        console.log("=========socketinfoend============")
      })

      socket.on(
        "join-room",
        ({
          chatroomId,
          userName,
          userId,
        }: {
          chatroomId: string
          userName: string
          userId: string
        }) => {
          socket.join(chatroomId)
          console.log(`User ${userName}(${userId}) joined room: ${chatroomId}`)
        }
      )

      // Event listener for sending messages to the room
      socket.on(
        SocketCalls.newMessage,
        ({ chatroomId, message }: { chatroomId: string; message: string }) => {
          console.log(
            `Message from ${socket.id} in room ${chatroomId}: ${message}`
          )
          // Broadcast the message to all clients in the room
          if (this.io) {
            this.io.emit(SocketCalls.newMessage, { message, userId: socket.id })
          }
          /* ?.to(chatroomId) */
        }
      )

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

  // Emit event when a new chatroom is created
  emitNewChatroom(chatroomData: Chatroom) {
    if (this.io) {
      this.io.emit("new-chatroom", chatroomData)
    }
  }

  /** warn chatroom members that a new message has arrived */
  emitNewMessage(dto: { chatroomId: string; message: string }) {
    console.log(
      "emitNewMessage(dto: { chatroomId: string; message: string }) called"
    )
    if (this.io) {
      const result = this.io.emit(SocketCalls.newMessage, dto)
      console.log("emit result", result)
    }
  }
}

export default new SocketIo()
