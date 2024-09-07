export type TChatroom = {
  id: string
  name: string
  messages: TChatroomMessage[]
  users: TUser[]
  createdAt: string
}

export type TChatroomMessage = {
  id: string
  content: string
  user: TUser
  chatroom: TChatroom
  createdAt: string
}

export type TUser = {
  id: string
  email: string
  password: string
  friends: TUser[]
  chatrooms: TChatroom[]
  messages: TChatroomMessage[]
  createdAt: string
  updatedAt: string
}
