import { Request, Response } from "express"
import ChatroomService from "src/api/chatroom/service"

class ChatroomController {
  constructor() {
    this.createChatroom = this.createChatroom.bind(this)
    this.enterChatroom = this.enterChatroom.bind(this)
    this.leaveChatroom = this.leaveChatroom.bind(this)
    this.postMessageToChatroom = this.postMessageToChatroom.bind(this)
    this.getChatrooms = this.getChatrooms.bind(this)
    this.getMessagesFromChatroom = this.getMessagesFromChatroom.bind(this)
    this.deleteMessageFromChatroom = this.deleteMessageFromChatroom.bind(this)
  }

  // POST /create
  async createChatroom(req: Request, res: Response) {
    try {
      const { name } = req.body
      const userId = res.locals.jwtVerification.id

      const chatroom = await ChatroomService.createChatroom({ name, userId })
      return res.status(201).json({ success: true, chatroom })
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message })
    }
  }

  // POST /enter
  async enterChatroom(req: Request, res: Response) {
    try {
      const { chatroomId } = req.body
      const userId = res.locals.jwtVerification.id

      const result = await ChatroomService.enterChatroom({ chatroomId, userId })
      return res.status(200).json({ success: true, result })
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message })
    }
  }

  // POST /leave
  async leaveChatroom(req: Request, res: Response) {
    try {
      const { chatroomId } = req.body
      const userId = res.locals.jwtVerification.id

      const result = await ChatroomService.leaveChatroom({ chatroomId, userId })
      return res.status(200).json({ success: true, result })
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message })
    }
  }

  // POST /:chatroomId/message
  async postMessageToChatroom(req: Request, res: Response) {
    try {
      const { content, chatroomId } = req.body
      const userId = res.locals.jwtVerification.id

      const message = await ChatroomService.postMessageToChatroom({
        chatroomId,
        userId,
        content,
      })
      return res.status(201).json({ success: true, message })
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message })
    }
  }

  // GET / (get all chatrooms for the user)
  async getChatrooms(req: Request, res: Response) {
    try {
      const userId = res.locals.jwtVerification.id

      const chatrooms = await ChatroomService.getChatrooms({ userId })
      return res.status(200).json({ success: true, chatrooms })
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message })
    }
  }

  // GET /:chatroomId/messages (optional)
  async getMessagesFromChatroom(req: Request, res: Response) {
    try {
      const { chatroomId } = req.params

      const messages = await ChatroomService.getMessagesFromChatroom({
        chatroomId,
      })
      return res.status(200).json({ success: true, messages })
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message })
    }
  }

  // DELETE /:chatroomId/message/:messageId (optional)
  async deleteMessageFromChatroom(req: Request, res: Response) {
    try {
      const { chatroomId, messageId } = req.params
      const userId = res.locals.jwtVerification.id

      const result = await ChatroomService.deleteMessageFromChatroom({
        chatroomId,
        messageId,
        userId,
      })
      return res.status(200).json({ success: true, result })
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message })
    }
  }

  async listUsersInChatroom(req: Request, res: Response) {
    try {
      const { chatroomId } = req.params
      const users = await ChatroomService.listUsersInChatroom({ chatroomId })

      return res.status(200).json({ success: true, users })
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message })
    }
  }
}

export default new ChatroomController()
