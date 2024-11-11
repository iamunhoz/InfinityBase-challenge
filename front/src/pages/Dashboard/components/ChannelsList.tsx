import { Link } from "react-router-dom"
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
