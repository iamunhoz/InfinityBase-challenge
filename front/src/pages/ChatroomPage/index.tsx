// import { useEffect } from "react"
import { useParams } from "react-router-dom"
// import socket from "src/lib/network/socket"
import { useChatStore } from "src/store/chatStore"

export function ChatroomPage(): JSX.Element {
  const { id } = useParams<{ id: string }>()
  // const addMessage = useChatStore((state) => state.addMessage)
  const messages = useChatStore((state) => state.messages)

  /* useEffect(() => {
    socket.emit("join", { chatroomId: id })

    socket.on("message", (message) => {
      addMessage(message)
    })

    return () => {
      socket.emit("leave", { chatroomId: id })
      socket.off("message")
    }
  }, [id, addMessage]) */

  return (
    <div className="p-4">
      <h1 className="text-3xl">Chatroom {id}</h1>
      <div className="mt-4">
        {messages.map((msg, index) => (
          <div key={index} className="p-2 border-b">
            {msg}
          </div>
        ))}
      </div>
    </div>
  )
}
