import { useChatroomsByUser } from "src/lib/network/hooks"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { socketClient } from "src/lib/network/socket"
import { QueryKey, SocketEvent } from "src/lib/definitions/enumerations"
import { ChannelsList } from "./ChannelsList"

export function SubscribedChannelsList(): JSX.Element {
  const { data, isLoading, error } = useChatroomsByUser()
  const queryClient = useQueryClient()

  useEffect(() => {
    // Listen for new chatroom notifications
    socketClient.on(SocketEvent.newChatroom, () => {
      // Optionally, refetch the chatrooms list when a new chatroom is added
      queryClient.invalidateQueries({
        queryKey: [QueryKey.chatroomsByUser],
        refetchType: "all",
      })
    })

    // Cleanup on unmount
    return () => {
      socketClient.off(SocketEvent.newChatroom)
    }
  }, [queryClient])
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading chatrooms</div>
  if (!data) return <div>No chatrooms</div>

  return <ChannelsList chatrooms={data} />
}
