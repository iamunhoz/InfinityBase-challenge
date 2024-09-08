import { Router } from "express"
import ChatroomController from "src/api/chatroom/controller"
import AuthMiddleware from "src/lib/auth.middleware"

const chatroomRouter = Router()

// Route to create a new chatroom
chatroomRouter.post(
  "/create",
  AuthMiddleware.check,
  ChatroomController.createChatroom
)

// Route to enter an existing chatroom
chatroomRouter.post(
  "/enter",
  AuthMiddleware.check,
  ChatroomController.enterChatroom
)

// Route to leave a chatroom
chatroomRouter.post(
  "/leave",
  AuthMiddleware.check,
  ChatroomController.leaveChatroom
)

// Route to post a message to a chatroom
chatroomRouter.post(
  "/message",
  AuthMiddleware.check,
  ChatroomController.postMessageToChatroom
)

// Route to get all chatrooms that the user is part of
chatroomRouter.get(
  "/",
  /* AuthMiddleware.check, */ ChatroomController.getChatrooms
)

chatroomRouter.get(
  "/byid",
  /* AuthMiddleware.check, */ ChatroomController.getChatroomById
)

// Optional: Route to fetch all messages from a specific chatroom
chatroomRouter.get(
  "/:chatroomId/messages",
  AuthMiddleware.check,
  ChatroomController.getMessagesFromChatroom
)

// Optional: Route to delete a specific message from a chatroom
chatroomRouter.delete(
  "/:chatroomId/message/:messageId",
  AuthMiddleware.check,
  ChatroomController.deleteMessageFromChatroom
)

chatroomRouter.get(
  "/:chatroomId/users",
  AuthMiddleware.check,
  ChatroomController.listUsersInChatroom
)

export { chatroomRouter }
