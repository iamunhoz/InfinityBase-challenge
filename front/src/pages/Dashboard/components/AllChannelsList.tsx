import React from "react"

// Mock data for available channels
const channels = [
  { id: 1, name: "General" },
  { id: 2, name: "Tech Talk" },
  { id: 3, name: "Gaming" },
  { id: 4, name: "Movies" },
]

export function AllChannelsList(): JSX.Element {
  return (
    <div className="flex flex-col space-y-2">
      {channels.map((channel) => (
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
