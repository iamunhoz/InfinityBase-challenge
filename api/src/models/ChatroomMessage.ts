// src/models/ChatroomMessage.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm"
import { Chatroom } from "./Chatroom"
import { User } from "./User"

@Entity()
export class ChatroomMessage {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column()
  content!: string

  @ManyToOne(() => User)
  user!: User

  @ManyToOne(() => Chatroom, (chatroom) => chatroom.messages)
  chatroom!: Chatroom

  @CreateDateColumn()
  createdAt!: Date
}
