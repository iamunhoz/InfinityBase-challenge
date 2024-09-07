import { useChatrooms } from "src/lib/network/hooks"

export function ChatroomList() {
  const { data, isLoading, error } = useChatrooms()
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading chatrooms</div>

  return (
    <div>
      {data?.map((chatroom) => <div key={chatroom.id}>{chatroom.name}</div>)}
    </div>
  )
}
