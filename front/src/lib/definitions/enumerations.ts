export enum QueryKey {
  chatrooms = "chatrooms",
  chatroomsByUser = "chatrooms-by-user",
  chatroomById = "chatroom-by-id",
  chatroomUsers = "chatroom-users",
}

export enum SocketEvent {
  newMessage = "new-message",
  newChatroom = "new-chatroom",
  joinRoom = "join-room",
  leftRoom = "left-room",
}
