import { QueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { TChatroom, TChatroomMessage, TUser } from "../definitions"
import { getRequest, postRequest } from "./baseRequests"

// Fetch all chatrooms
export function useChatrooms() {
  return useQuery<TChatroom[], Error>({
    queryKey: ["chatrooms"],
    queryFn: () =>
      getRequest<TChatroom[]>("/chatroom").then((response) =>
        response.success ? response.result : []
      ),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  })
}

// Fetch messages from a specific chatroom
export function useChatroomMessages(chatroomId: string) {
  return useQuery<TChatroomMessage[], Error>({
    queryKey: ["chatroomMessages", chatroomId],
    queryFn: () =>
      getRequest<TChatroomMessage[]>(`/chatroom/${chatroomId}/messages`).then(
        (response) => (response.success ? response.result : [])
      ),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  })
}

export function usePostMessage(chatroomId: string, queryClient: QueryClient) {
  return useMutation({
    mutationFn: (content: string) =>
      postRequest(`/chatroom/message`, { content, chatroomId }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["chatroomMessages"],
        refetchType: "all",
      }),
  })
}

// Fetch users in a specific chatroom
export function useChatroomUsers(chatroomId: string) {
  return useQuery<TUser[], Error>({
    queryKey: ["chatroomUsers", chatroomId],
    queryFn: () =>
      getRequest<TUser[]>(`/chatroom/${chatroomId}/users`).then((response) =>
        response.success ? response.result : []
      ),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  })
}

export function useGetChatroomData(chatroomId: string) {
  return useQuery<TChatroom | null>({
    queryKey: ["chatroom-by-id", chatroomId],
    queryFn: () =>
      getRequest<TChatroom | null>(
        `/chatroom/byid?chatroomId=${chatroomId}`
      ).then((response) => (response.success ? response.result : null)),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  })
}

export function useJoinChatroomMutation(
  chatroomId: string,
  successCb: () => void
) {
  return useMutation({
    mutationFn: () => postRequest(`/chatroom/enter`, { chatroomId }),
    onSuccess: successCb,
  })
}
