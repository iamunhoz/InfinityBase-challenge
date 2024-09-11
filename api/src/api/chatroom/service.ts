import ChatroomRepository from "src/api/chatroom/repository"
import { UserRepository } from "src/api/user/repository"
import { Chatroom, User } from "src/models"
import { MessageContentType } from "src/models/ChatroomMessage"
import SocketInstance, { SocketEvent } from "src/socket"

class ChatroomService {
  private chatroomRepository: ChatroomRepository
  private userRepository: UserRepository

  constructor() {
    this.chatroomRepository = new ChatroomRepository()
    this.userRepository = new UserRepository()
  }

  async getChatroomById({ chatroomId }: { chatroomId: string }) {
    const chatroom = await this.chatroomRepository.getChatroomById({
      chatroomId,
    })

    return chatroom
  }

  async createChatroom({ name, userId }: { name: string; userId: string }) {
    const user = await this.userRepository.getUserById({ id: userId })
    if (!user) {
      throw new Error("User not found")
    }

    const chatroom = await this.chatroomRepository.createChatroom({
      name,
      userId,
    })

    if (chatroom) {
      SocketInstance.emit(SocketEvent.newChatroom, chatroom)
    }
    return chatroom
  }

  async enterChatroom({
    chatroomId,
    userId,
  }: {
    chatroomId: string
    userId: string
  }): Promise<Chatroom | null> {
    const chatroom = await this.chatroomRepository.getChatroomById({
      chatroomId,
    })

    const user = await this.userRepository.getUserById({ id: userId })

    if (!chatroom || !user) {
      throw new Error("enterChatroom: Chatroom or User not found")
    }

    const result = await this.chatroomRepository.addUserToChatroom({
      chatroomId,
      userId,
    })

    await this.postMessageToChatroom({
      chatroomId,
      userId,
      content: `${user.name} has joined the room`,
      contentType: "system-message",
    })

    SocketInstance.emit(SocketEvent.joinRoom, {
      chatroomId,
      userName: user.name,
      userId,
    })

    return result
  }

  async leaveChatroom({
    chatroomId,
    userId,
  }: {
    chatroomId: string
    userId: string
  }) {
    const chatroom = await this.chatroomRepository.getChatroomById({
      chatroomId,
    })

    const user = await this.userRepository.getUserById({ id: userId })

    if (!chatroom || !user) {
      throw new Error("enterChatroom: Chatroom or User not found")
    }

    const result = await this.chatroomRepository.removeUserFromChatroom({
      chatroomId,
      userId,
    })

    await this.postMessageToChatroom({
      chatroomId,
      userId,
      content: `${user.name} has left the room`,
      contentType: "system-message",
    })

    SocketInstance.emit(SocketEvent.leftRoom, {
      chatroomId,
    })

    return result
  }

  async postMessageToChatroom({
    chatroomId,
    userId,
    content,
    contentType,
  }: {
    chatroomId: string
    userId: string
    content: string
    contentType: MessageContentType
  }) {
    const chatroom = await this.chatroomRepository.getChatroomById({
      chatroomId,
    })
    if (!chatroom) {
      throw new Error("postMessageToChatroom: Chatroom not found")
    }

    const user = await this.userRepository.getUserById({ id: userId })
    if (!user) {
      throw new Error("postMessageToChatroom: User not found")
    }

    const isUserInChatroom = chatroom.users.some(
      (chatUser) => chatUser.id === userId
    )
    if (!isUserInChatroom && contentType !== "system-message") {
      throw new Error(
        "postMessageToChatroom: User does not belong to this chatroom"
      )
    }

    const message = await this.chatroomRepository.postMessageToChatroom({
      chatroomId,
      userId,
      content,
      contentType,
    })

    SocketInstance.emit(SocketEvent.newMessage, {
      chatroomId,
      message: content,
    })

    return message
  }

  async getChatrooms() {
    const chatrooms = await this.chatroomRepository.getChatrooms()
    return chatrooms
  }

  async getChatroomsForUser({ userId }: { userId: string }) {
    const chatrooms = await this.chatroomRepository.getChatroomsForUser({
      userId,
    })
    return chatrooms
  }

  async getMessagesFromChatroom({ chatroomId }: { chatroomId: string }) {
    const chatroom = await this.chatroomRepository.getChatroomById({
      chatroomId,
    })

    if (!chatroom) {
      throw new Error("getMessagesFromChatroom: Chatroom not found")
    }

    const messages = await this.chatroomRepository.getMessagesFromChatroom({
      chatroomId,
    })

    return messages
  }

  async deleteMessageFromChatroom({
    chatroomId,
    messageId,
    userId,
  }: {
    chatroomId: string
    messageId: string
    userId: string
  }) {
    const message = await this.chatroomRepository.getMessageById({
      chatroomId,
      messageId,
    })

    if (!message || message.user.id !== userId) {
      throw new Error(
        "Message not found or you are not authorized to delete this message"
      )
    }

    const result = await this.chatroomRepository.deleteMessageFromChatroom({
      messageId,
    })
    return result
  }

  async listUsersInChatroom({
    chatroomId,
  }: {
    chatroomId: string
  }): Promise<User[]> {
    const chatroom = await this.chatroomRepository.getChatroomById({
      chatroomId,
    })

    if (!chatroom) {
      throw new Error("listUsersInChatroom: Chatroom not found")
    }

    return chatroom.users
  }
}

export default new ChatroomService()
