import { useChatrooms } from "src/lib/network/hooks"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { socketClient } from "src/lib/network/socket"

export function AllChannelsList(): JSX.Element {
  const { data, isLoading, error } = useChatrooms()
  const queryClient = useQueryClient()

  useEffect(() => {
    // Listen for new chatroom notifications
    socketClient.on("newChatroom", (newChatroom) => {
      // Optionally, refetch the chatrooms list when a new chatroom is added
      queryClient.invalidateQueries({
        queryKey: ["chatrooms"],
        refetchType: "all",
      })
    })

    // Cleanup on unmount
    return () => {
      socketClient.off("newChatroom")
    }
  }, [queryClient])
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading chatrooms</div>

  return (
    <div className="flex flex-col space-y-2">
      {data &&
        data.map((channel) => (
          <Link to={`/app/chatrooms/${channel.id}`} key={channel.id}>
            <div className="bg-gray-700 hover:bg-gray-600 p-2 rounded-md cursor-pointer">
              {channel.name}
            </div>
          </Link>
        ))}
    </div>
  )
}
