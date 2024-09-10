import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm"
import { Chatroom } from "./Chatroom"
import { User } from "./User"

export type MessageContentType = "user-message" | "system-message" | "media"

@Entity()
export class ChatroomMessage {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column()
  content!: string

  @Column()
  contentType!: MessageContentType

  @ManyToOne(() => User)
  user!: User

  @ManyToOne(() => Chatroom, (chatroom) => chatroom.messages)
  chatroom!: Chatroom

  @CreateDateColumn()
  createdAt!: Date
}
