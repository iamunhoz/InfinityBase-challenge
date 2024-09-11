import { DirectMessagesList } from "./components/DirectMessagesList"
import { CreateNewChannelButton } from "./components/CreateNewChannelButton"
import { SubscribedChannelsList } from "./components/SubscribedChannelsList"
import { AllChannelsList } from "./components/AllChannelsList"

export function DashboardPage(): JSX.Element {
  return (
    <div className="flex flex-row bg-gray-900 text-white p-2">
      {/* Sidebar */}
      <div className="w-[300px] bg-gray-800 p-4 ml-2 flex flex-col justify-between">
        <h2 className="text-xl font-bold mb-4">Channels</h2>

        {/* List of all available channels */}
        <AllChannelsList />

        {/* Button to create a new channel */}
        <div className="mt-auto">
          <CreateNewChannelButton />
        </div>
      </div>

      <div className="w-[300px] bg-gray-800 p-4 ml-2">
        {/* List of subscribed channels */}
        <h2 className="text-xl font-bold mb-4">Subscribed Channels</h2>
        <SubscribedChannelsList />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col p-4">
        <h2 className="text-xl font-bold mb-4">Direct Messages</h2>

        {/* List of direct messages */}
        <DirectMessagesList />
      </div>
    </div>
  )
}
