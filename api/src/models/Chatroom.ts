import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  ManyToMany,
} from "typeorm"
import { ChatroomMessage } from "./ChatroomMessage"
import { User } from "./User"

@Entity()
export class Chatroom {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({ unique: true })
  name!: string

  @OneToMany(() => ChatroomMessage, (message) => message.chatroom)
  messages!: ChatroomMessage[]

  @ManyToMany(() => User, (user) => user.chatrooms)
  users!: User[]

  @CreateDateColumn()
  createdAt!: Date
}
