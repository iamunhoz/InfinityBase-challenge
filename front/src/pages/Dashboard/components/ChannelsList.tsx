import { useChatrooms } from "src/lib/network/hooks"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { socketClient } from "src/lib/network/socket"
import { QueryKey, SocketEvent } from "src/lib/definitions/enumerations"
import { TChatroom } from "src/lib/definitions"

type ChannelsListProps = {
  chatrooms: TChatroom[]
}

export function ChannelsList(props: ChannelsListProps): JSX.Element {
  const { chatrooms } = props

  return (
    <div className="flex flex-col space-y-2">
      {chatrooms &&
        chatrooms.map((channel) => (
          <Link to={`/app/chatrooms/${channel.id}`} key={channel.id}>
            <div className="bg-gray-700 hover:bg-gray-600 p-2 rounded-md cursor-pointer">
              {channel.name}
            </div>
          </Link>
        ))}
    </div>
  )
}
