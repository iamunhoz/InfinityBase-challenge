import { AppDataSource } from "src/lib/ormconfig"
import { Chatroom } from "src/models/Chatroom"
import { ChatroomMessage, MessageContentType } from "src/models/ChatroomMessage"
import { User } from "src/models/User"

class ChatroomRepository {
  private chatroomQuery = AppDataSource.getRepository(Chatroom)
  private chatroomMessageQuery = AppDataSource.getRepository(ChatroomMessage)
  private userQuery = AppDataSource.getRepository(User)

  async createChatroom({
    name,
    userId,
  }: {
    name: string
    userId: string
  }): Promise<Chatroom> {
    const newChatroom = this.chatroomQuery.create({ name })
    const savedChatroom = await this.chatroomQuery.save(newChatroom)
    await this.addUserToChatroom({ chatroomId: savedChatroom.id, userId })

    return savedChatroom
  }

  async getChatroomById({
    chatroomId,
  }: {
    chatroomId: string
  }): Promise<Chatroom | null> {
    const chatroom = await this.chatroomQuery.findOne({
      where: { id: chatroomId },
      relations: ["users", "messages"],
    })
    return chatroom || null
  }

  async addUserToChatroom({
    chatroomId,
    userId,
  }: {
    chatroomId: string
    userId: string
  }): Promise<Chatroom | null> {
    const chatroom = await this.getChatroomById({ chatroomId })
    const user = await this.userQuery.findOneBy({ id: userId })

    if (chatroom && user) {
      chatroom.users.push(user)
      return await this.chatroomQuery.save(chatroom)
    }

    return null
  }

  async removeUserFromChatroom({
    chatroomId,
    userId,
  }: {
    chatroomId: string
    userId: string
  }): Promise<void> {
    const chatroom = await this.getChatroomById({ chatroomId })
    if (!chatroom) throw new Error("removeUserFromChatroom: Chatroom not found")

    chatroom.users = chatroom.users.filter((user) => user.id !== userId)
    await this.chatroomQuery.save(chatroom)
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
  }): Promise<ChatroomMessage> {
    const chatroom = await this.chatroomQuery.findOneBy({ id: chatroomId })
    const user = await this.userQuery.findOneBy({ id: userId })

    if (!chatroom) {
      throw new Error("postMessageToChatroom: Chatroom not found")
    }
    if (!user) {
      throw new Error("postMessageToChatroom: User not found")
    }

    const newMessage = this.chatroomMessageQuery.create({
      chatroom,
      user,
      content,
      contentType,
    })

    return await this.chatroomMessageQuery.save(newMessage)
  }

  async getChatrooms(): Promise<Chatroom[]> {
    const chatrooms = await this.chatroomQuery.find()

    if (!chatrooms) throw new Error("No chatrooms found")

    return chatrooms
  }

  async getChatroomsForUser({
    userId,
  }: {
    userId: string
  }): Promise<Chatroom[]> {
    const user = await this.userQuery.findOne({
      where: { id: userId },
      relations: ["chatrooms"],
    })

    if (!user) throw new Error("User not found")

    return user.chatrooms
  }

  async getMessagesFromChatroom({
    chatroomId,
  }: {
    chatroomId: string
  }): Promise<ChatroomMessage[]> {
    const messages = await this.chatroomMessageQuery.find({
      where: { chatroom: { id: chatroomId } },
      relations: ["user"],
      order: { createdAt: "ASC" },
    })

    return messages
  }

  async getMessageById({
    chatroomId,
    messageId,
  }: {
    chatroomId: string
    messageId: string
  }): Promise<ChatroomMessage | null> {
    const message = await this.chatroomMessageQuery.findOne({
      where: { id: messageId, chatroom: { id: chatroomId } },
    })
    return message || null
  }

  async deleteMessageFromChatroom({
    messageId,
  }: {
    messageId: string
  }): Promise<void> {
    await this.chatroomMessageQuery.delete({ id: messageId })
  }
}

export default ChatroomRepository
