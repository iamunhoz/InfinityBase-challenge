import { useQuery } from "@tanstack/react-query"
import { fetchChatrooms } from "./requests"
import { TChatroom } from "../definitions"

export function useChatrooms() {
  return useQuery<TChatroom[], Error>({
    queryKey: ["chatroom"],
    // initialData: [],
    queryFn: fetchChatrooms,
    staleTime: 1000 * 60 * 5, // 5min
    refetchOnWindowFocus: true,
  })
}
