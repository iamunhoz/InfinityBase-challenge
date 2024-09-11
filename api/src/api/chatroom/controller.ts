import { Request, Response } from "express"
import ChatroomService from "src/api/chatroom/service"
import { handleRequestResponse } from "src/lib/controller-handler"

class ChatroomController {
  constructor() {
    this.createChatroom = this.createChatroom.bind(this)
    this.enterChatroom = this.enterChatroom.bind(this)
    this.leaveChatroom = this.leaveChatroom.bind(this)
    this.postMessageToChatroom = this.postMessageToChatroom.bind(this)
    this.getChatrooms = this.getChatrooms.bind(this)
    this.getMessagesFromChatroom = this.getMessagesFromChatroom.bind(this)
    this.deleteMessageFromChatroom = this.deleteMessageFromChatroom.bind(this)
    this.getChatroomsForUser = this.getChatroomsForUser.bind(this)
    this.listUsersInChatroom = this.listUsersInChatroom.bind(this)
    this.getChatroomById = this.getChatroomById.bind(this)
  }

  async getChatroomById(req: Request, res: Response) {
    return handleRequestResponse(req, res, async () => {
      const chatroomId = req.query.chatroomId

      if (!chatroomId || typeof chatroomId !== "string") {
        throw new Error("wrong chatroom id")
      }
      return await ChatroomService.getChatroomById({ chatroomId })
    })
  }

  // POST /create
  async createChatroom(req: Request, res: Response) {
    return handleRequestResponse(req, res, async () => {
      const { name } = req.body
      const userId = res.locals.jwtVerification.id

      if (!userId) {
        throw new Error("please log in first")
      }
      return await ChatroomService.createChatroom({ name, userId })
    })
  }

  // POST /enter
  async enterChatroom(req: Request, res: Response) {
    return handleRequestResponse(req, res, async () => {
      const { chatroomId } = req.body
      const userId = res.locals.jwtVerification.id
      return await ChatroomService.enterChatroom({ chatroomId, userId })
    })
  }

  // POST /leave
  async leaveChatroom(req: Request, res: Response) {
    return handleRequestResponse(req, res, async () => {
      const { chatroomId } = req.body
      const userId = res.locals.jwtVerification.id
      return await ChatroomService.leaveChatroom({ chatroomId, userId })
    })
  }

  // POST /:chatroomId/message
  async postMessageToChatroom(req: Request, res: Response) {
    return handleRequestResponse(req, res, async () => {
      const { content, chatroomId, contentType } = req.body
      const userId = res.locals.jwtVerification.id
      return await ChatroomService.postMessageToChatroom({
        chatroomId,
        userId,
        content,
        contentType,
      })
    })
  }

  // GET / (get all chatrooms for the user)
  async getChatroomsForUser(req: Request, res: Response) {
    return handleRequestResponse(req, res, async () => {
      const userId = res.locals.jwtVerification.id

      console.log(
        "userId, res.locals.jwtVerification",
        userId,
        res.locals.jwtVerification
      )

      return await ChatroomService.getChatroomsForUser({ userId })
    })
  }

  // GET / (get all chatrooms)
  async getChatrooms(req: Request, res: Response) {
    return handleRequestResponse(req, res, async () => {
      return await ChatroomService.getChatrooms()
    })
  }

  // GET /:chatroomId/messages (optional)
  async getMessagesFromChatroom(req: Request, res: Response) {
    return handleRequestResponse(req, res, async () => {
      const { chatroomId } = req.params
      return await ChatroomService.getMessagesFromChatroom({ chatroomId })
    })
  }

  // DELETE /:chatroomId/message/:messageId (optional)
  async deleteMessageFromChatroom(req: Request, res: Response) {
    return handleRequestResponse(req, res, async () => {
      const { chatroomId, messageId } = req.params
      const userId = res.locals.jwtVerification.id
      return await ChatroomService.deleteMessageFromChatroom({
        chatroomId,
        messageId,
        userId,
      })
    })
  }

  // GET /:chatroomId/users
  async listUsersInChatroom(req: Request, res: Response) {
    return handleRequestResponse(req, res, async () => {
      const { chatroomId } = req.params
      return await ChatroomService.listUsersInChatroom({ chatroomId })
    })
  }
}

export default new ChatroomController()
