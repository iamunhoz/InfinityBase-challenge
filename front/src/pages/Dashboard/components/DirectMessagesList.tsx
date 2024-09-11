// Mock data for direct messages
const directMessages = [
  { id: 1, userName: "JohnDoe", lastMessage: "Hey, how’s it going?" },
  { id: 2, userName: "JaneSmith", lastMessage: "Let’s meet tomorrow." },
  {
    id: 3,
    userName: "GeekMaster",
    lastMessage: "Check out this cool project!",
  },
]

export function DirectMessagesList(): JSX.Element {
  return (
    <div className="flex flex-col space-y-2">
      {directMessages.map((dm) => (
        <div
          key={dm.id}
          className="bg-gray-700 hover:bg-gray-600 p-3 rounded-md cursor-pointer"
        >
          <div className="font-bold text-lg">{dm.userName}</div>
          <div className="text-sm text-gray-400">{dm.lastMessage}</div>
        </div>
      ))}
    </div>
  )
}
