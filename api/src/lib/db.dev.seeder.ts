import { Chatroom, User, ChatroomMessage } from "src/models"
import { DataSource } from "typeorm"

export async function seedDatabase(AppDataSource: DataSource) {
  const userRepository = AppDataSource.getRepository(User)
  const chatroomRepository = AppDataSource.getRepository(Chatroom)
  const messageRepository = AppDataSource.getRepository(ChatroomMessage)

  // Check if the user already exists
  const existingUser = await userRepository.findOne({
    where: { email: "tester@test.com" },
  })

  if (existingUser) {
    return
  }

  // Create and save the user
  // const hashedPassword = await bcrypt.hash("123456789123456789", 10); // Hash the password
  const newUser = userRepository.create({
    email: "tester@test.com",
    password: "123456789123456789",
    name: "Tester",
  })

  const userCreated = await userRepository.save(newUser)

  // Create and save the chatroom
  const newChatroom = chatroomRepository.create({
    name: "seeder room",
    users: [userCreated], // Add the user to the chatroom's user list
  })

  const chatroomCreated = await chatroomRepository.save(newChatroom)

  // Create and save a message from the user in the chatroom
  const newMessage = messageRepository.create({
    content: "seeder message",
    user: userCreated, // The user who created the message
    chatroom: chatroomCreated, // The chatroom where the message was posted
  })

  await messageRepository.save(newMessage)

  console.log("Database seeded with a user, chatroom, and message.")
}
