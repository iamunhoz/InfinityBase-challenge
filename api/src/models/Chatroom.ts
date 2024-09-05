// src/models/Chatroom.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from "typeorm"
import { ChatroomMessage } from "./ChatroomMessage"

@Entity()
export class Chatroom {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({ unique: true })
  name!: string

  @OneToMany(() => ChatroomMessage, (message) => message.chatroom)
  messages!: ChatroomMessage[]

  @CreateDateColumn()
  createdAt!: Date
}
