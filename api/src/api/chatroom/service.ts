import ChatroomRepository from "src/api/chatroom/repository"
import { UserRepository } from "src/api/user/repository"
import { User } from "src/models"

class ChatroomService {
  private chatroomRepository: ChatroomRepository
  private userRepository: UserRepository

  constructor() {
    this.chatroomRepository = new ChatroomRepository()
    this.userRepository = new UserRepository()
  }

  async createChatroom({ name, userId }: { name: string; userId: string }) {
    // Ensure user exists
    const user = await this.userRepository.getUserById({ id: userId })
    if (!user) {
      throw new Error("User not found")
    }

    // Create the chatroom
    const chatroom = await this.chatroomRepository.createChatroom({
      name,
      userId,
    })
    return chatroom
  }

  async enterChatroom({
    chatroomId,
    userId,
  }: {
    chatroomId: string
    userId: string
  }) {
    // Ensure chatroom exists
    const chatroom = await this.chatroomRepository.getChatroomById({
      chatroomId,
    })
    if (!chatroom) {
      throw new Error("Chatroom not found")
    }

    // Add user to chatroom
    const result = await this.chatroomRepository.addUserToChatroom({
      chatroomId,
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
    // Ensure chatroom exists
    const chatroom = await this.chatroomRepository.getChatroomById({
      chatroomId,
    })
    if (!chatroom) {
      throw new Error("Chatroom not found")
    }

    // Remove user from chatroom
    const result = await this.chatroomRepository.removeUserFromChatroom({
      chatroomId,
      userId,
    })
    return result
  }

  async postMessageToChatroom({
    chatroomId,
    userId,
    content,
  }: {
    chatroomId: string
    userId: string
    content: string
  }) {
    // Ensure chatroom exists
    const chatroom = await this.chatroomRepository.getChatroomById({
      chatroomId,
    })
    if (!chatroom) {
      throw new Error("Chatroom not found")
    }

    const user = await this.userRepository.getUserById({ id: userId })
    if (!user) {
      throw new Error("User not found")
    }

    const isUserInChatroom = chatroom.users.some(
      (chatUser) => chatUser.id === userId
    )
    if (!isUserInChatroom) {
      throw new Error("User does not belong to this chatroom")
    }

    const message = await this.chatroomRepository.postMessageToChatroom({
      chatroomId,
      userId,
      content,
    })
    return message
  }

  async getChatrooms() {
    // Get all chatrooms for the user
    const chatrooms = await this.chatroomRepository.getChatrooms()
    return chatrooms
  }

  async getChatroomsForUser({ userId }: { userId: string }) {
    // Get all chatrooms for the user
    const chatrooms = await this.chatroomRepository.getChatroomsForUser({
      userId,
    })
    return chatrooms
  }

  async getMessagesFromChatroom({ chatroomId }: { chatroomId: string }) {
    // Ensure chatroom exists
    const chatroom = await this.chatroomRepository.getChatroomById({
      chatroomId,
    })
    if (!chatroom) {
      throw new Error("Chatroom not found")
    }

    // Get all messages from the chatroom
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
    // Ensure message exists in the chatroom
    const message = await this.chatroomRepository.getMessageById({
      chatroomId,
      messageId,
    })

    if (!message || message.user.id !== userId) {
      throw new Error(
        "Message not found or you are not authorized to delete this message"
      )
    }

    // Delete the message
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
      throw new Error("Chatroom not found")
    }

    return chatroom.users // Return the list of users
  }
}

export default new ChatroomService()
