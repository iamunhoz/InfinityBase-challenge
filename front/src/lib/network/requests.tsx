import { TChatroom } from "../definitions"
import { getRequest } from "./baseRequests"

const fetchChatrooms = async (): Promise<TChatroom[]> => {
  const response = await getRequest<TChatroom[]>("/chatroom")
  if (response.success) {
    return response.result
  }

  return [
    {
      name: "error",
      createdAt: "xdfwes",
      id: "dfdsfdsfsd",
      messages: [],
      users: [],
    },
  ]
}

export { fetchChatrooms }
