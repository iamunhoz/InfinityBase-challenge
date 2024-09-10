import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { Box, Button, Input } from "@chakra-ui/react"
import { socketClient } from "src/lib/network/socket"
import {
  useChatroomMessages,
  useChatroomUsers,
  useGetChatroomData,
  useJoinChatroomMutation,
  usePostMessage,
} from "src/lib/network/hooks"
import useAuthStore from "src/store/authStore"

export function ChatroomPage(): JSX.Element {
  const { id } = useParams<{ id: string }>()
  const chatroomId = id ? id : ""
  const { data: chatroom, isLoading: chatIsLoading } =
    useGetChatroomData(chatroomId)
  const { user } = useAuthStore()

  const userBelongsToChatroom = chatroom?.users.some(
    (room_user) => room_user.id === user.id
  )

  const queryClient = useQueryClient()
  const [newMessage, setNewMessage] = useState("")

  const { data: messages, isLoading: messagesLoading } =
    useChatroomMessages(chatroomId)
  const { data: users, isLoading: usersLoading } = useChatroomUsers(chatroomId)

  const postMessageMutation = usePostMessage(chatroomId, queryClient)

  const joinChatroomMutation = useJoinChatroomMutation({
    chatroomId,
    userId: user.id as string,
    userName: user.name as string,
  })

  useEffect(() => {
    if (userBelongsToChatroom) {
      socketClient.on("new-message", () => {
        console.log("new-message arrived")
        queryClient.invalidateQueries({
          queryKey: ["chatroomMessages", chatroomId],
          refetchType: "all",
        })
      })
    }

    socketClient.on("new-member", () => {
      queryClient.invalidateQueries({
        queryKey: ["chatroomMessages", chatroomId],
        refetchType: "all",
      })
    })

    return () => {
      socketClient.off("new-message")
      socketClient.off("join-room")
      if (userBelongsToChatroom) {
        socketClient.emit("leave-room", chatroomId)
      }
    }
  }, [chatroomId, queryClient, userBelongsToChatroom])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      postMessageMutation.mutate({
        content: newMessage,
        contentType: "user-message",
      })
      setNewMessage("")
    }
  }

  useEffect(() => {
    let doneOnce = false

    if (!doneOnce) {
      if (userBelongsToChatroom && user) {
        /* socketClient.emit("join-room", {
          chatroomId,
          userName: user.name,
          userId: user.id,
        }) */
      }
    }

    return () => {
      doneOnce = Boolean(userBelongsToChatroom) && Boolean(user)
    }
  }, [])

  if (messagesLoading || usersLoading || chatIsLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="relative flex flex-grow">
      {/* Join Button Overlay */}
      {!userBelongsToChatroom && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <Button
            onClick={() => joinChatroomMutation.mutate()}
            colorScheme="teal"
            size="lg"
            isLoading={joinChatroomMutation.isPending}
          >
            Join Channel
          </Button>
        </div>
      )}

      {/* Sidebar with online users */}
      <Box className="w-1/4 bg-gray-800 p-4">
        <h2 className="text-xl font-bold mb-4">Online Users</h2>
        <ul>
          {users &&
            users.map((user: any) => (
              <li key={user.id} className="text-white mb-2">
                {user.name}
              </li>
            ))}
        </ul>
      </Box>

      {/* Main Chatroom Area */}
      <div className="flex-1 flex flex-col h-[100%]">
        {/* Chat Messages */}
        <Box className="flex-1 p-4 overflow-y-auto bg-gray-700">
          {messages && messages.length ? (
            messages.map((message: any) => (
              <div key={message.id} className="mb-4">
                <div className="text-white font-bold">{message.user.name}:</div>
                <div className="text-gray-300">{message.content}</div>
              </div>
            ))
          ) : (
            <div className="text-gray-400">No messages yet</div>
          )}
        </Box>

        {/* Input bar for sending messages */}
        <Box className="p-4 bg-gray-800 flex items-center">
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && userBelongsToChatroom) {
                handleSendMessage()
              }
            }}
            className="flex-1 mr-4"
            size="lg"
            isDisabled={!userBelongsToChatroom} // Disable input if the user hasn't joined
          />
          <Button
            onClick={handleSendMessage}
            colorScheme="teal"
            size="lg"
            isDisabled={!userBelongsToChatroom}
          >
            Send
          </Button>
        </Box>
      </div>
    </div>
  )
}
