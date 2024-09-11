import { Chatroom, ChatroomMessage, User, UserToUserMessage } from "src/models"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 54321,
  username: "discord_clone_admin",
  password: "Nove10valete",
  database: "discord_clone",
  entities: [User, Chatroom, ChatroomMessage, UserToUserMessage],
  synchronize: process.env.NODE_ENV === "development",
  dropSchema: process.env.NODE_ENV === "development",
  logging: false,
  migrations: ["src/migration/*.ts"],
})
