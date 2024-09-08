import { useState, useEffect, useMemo } from "react"
import { useParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { Box, Button, Input } from "@chakra-ui/react"
import { useToast } from "@chakra-ui/react"
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
  const { id: _id } = useParams<{ id: string }>() // Chatroom ID from URL
  const id = _id ? _id : ""
  const { data: chatroom, isLoading: chatIsLoading } = useGetChatroomData(id)
  const { userId } = useAuthStore()

  const userBelongsToChatroom = useMemo(() => {
    console.log("chatroom, userId", chatroom, userId)
    return chatroom?.users.some((user) => user.id === userId)
  }, [chatroom, userId])

  useEffect(() => {
    // console.log("chatroom", chatroom)
  }, [chatroom])

  const queryClient = useQueryClient()
  const toast = useToast()

  // State to track if the user has joined the chatroom
  const [newMessage, setNewMessage] = useState("")

  // Fetch chatroom messages
  const { data: messages, isLoading: messagesLoading } = useChatroomMessages(id)
  const { data: users, isLoading: usersLoading } = useChatroomUsers(id)

  // Mutation to post a new message
  const postMessageMutation = usePostMessage(id, queryClient)

  // Mutation to join the chatroom
  const joinChatroomMutation = useJoinChatroomMutation(id, () => {
    // setHasJoined(true)

    socketClient.emit("joinChatroom", id) // Join the chatroom via socket
  })

  // Socket listener for new messages
  useEffect(() => {
    if (userBelongsToChatroom) {
      socketClient.on("newMessage", () => {
        queryClient.invalidateQueries({
          queryKey: ["chatroomMessages", id],
          refetchType: "all",
        }) // Refetch chatroom messages when a new message arrives
      })
      socketClient.on("joinChatroom", () => {
        queryClient.invalidateQueries({
          queryKey: ["chatroom-by-id"],
          refetchType: "all",
        })
      })
    }

    return () => {
      socketClient.off("newMessage")
      if (userBelongsToChatroom) {
        socketClient.emit("leaveChatroom", id) // Leave the chatroom when unmounting
      }
    }
  }, [id, queryClient, toast, userBelongsToChatroom])

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      postMessageMutation.mutate(newMessage)
      setNewMessage("") // Clear the input field
    }
  }

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
      <div className="flex-1 flex flex-col">
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
