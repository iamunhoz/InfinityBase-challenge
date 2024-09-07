import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm"
import { ChatroomMessage } from "./ChatroomMessage"
import { Chatroom } from "./Chatroom"

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({ unique: true })
  email!: string

  @Column()
  password!: string

  @Column({ default: "Anonymous" }) // Add the new column for 'name'
  name!: string

  @ManyToMany(() => User, (user) => user.friends)
  @JoinTable()
  friends!: User[]

  @ManyToMany(() => Chatroom, (chatroom) => chatroom.users)
  @JoinTable() // You need a join table here
  chatrooms!: Chatroom[]

  @OneToMany(() => ChatroomMessage, (message) => message.user)
  messages!: ChatroomMessage[]

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}

export type UserSafe = Omit<User, "password">
