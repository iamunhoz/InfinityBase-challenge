import React from "react"

// Mock data for subscribed channels
const subscribedChannels = [
  { id: 1, name: "Project Updates" },
  { id: 2, name: "Team Chat" },
  { id: 3, name: "Random" },
]

export function SubscribedChannelsList(): JSX.Element {
  return (
    <div className="flex flex-col space-y-2">
      {subscribedChannels.map((channel) => (
        <div
          key={channel.id}
          className="bg-gray-700 hover:bg-gray-600 p-2 rounded-md cursor-pointer"
        >
          {channel.name}
        </div>
      ))}
    </div>
  )
}
