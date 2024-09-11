import { Chatroom, User, ChatroomMessage } from "src/models"
import { DataSource } from "typeorm"

export async function seedDatabase(AppDataSource: DataSource) {
  const userRepository = AppDataSource.getRepository(User)
  const chatroomRepository = AppDataSource.getRepository(Chatroom)
  const messageRepository = AppDataSource.getRepository(ChatroomMessage)

  const existingUser = await userRepository.findOne({
    where: { email: "tester@test.com" },
  })

  if (existingUser) {
    return
  }

  const newUser = userRepository.create({
    email: "tester@test.com",
    password: "123456789123456789",
    name: "Tester",
  })

  const userCreated = await userRepository.save(newUser)

  const newChatroom = chatroomRepository.create({
    name: "seeder room",
    users: [userCreated],
  })

  const chatroomCreated = await chatroomRepository.save(newChatroom)

  const newMessage = messageRepository.create({
    content: "seeder message",
    user: userCreated,
    chatroom: chatroomCreated,
    contentType: "user-message",
  })

  await messageRepository.save(newMessage)

  console.log("Database seeded with a user, chatroom, and message.")
}
