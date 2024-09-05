// src/models/UserToUserMessage.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm"
import { User } from "./User"

@Entity()
export class UserToUserMessage {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @ManyToOne(() => User)
  sender!: User

  @ManyToOne(() => User)
  receiver!: User

  @Column()
  content!: string

  @CreateDateColumn()
  createdAt!: Date
}
