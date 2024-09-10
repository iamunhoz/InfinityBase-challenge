// self: split-refactor after line 300
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { TChatroom, TChatroomMessage, TUser } from "../definitions"
import { getRequest, postRequest } from "./baseRequests"
import { socketClient } from "./socket"
import { useLogout } from "src/store/authStore"

/**
 Fetch all chatrooms
 * */
export function useChatrooms() {
  const logout = useLogout()
  return useQuery<TChatroom[], Error>({
    queryKey: ["chatrooms"],
    queryFn: () =>
      getRequest<TChatroom[]>("/chatroom").then((response) => {
        if (response.success) {
          return response.result
        } else {
          logout()
          return []
        }
      }),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  })
}

/** Fetch messages from a specific chatroom */
export function useChatroomMessages(chatroomId: string) {
  const logout = useLogout()

  return useQuery<TChatroomMessage[], Error>({
    queryKey: ["chatroomMessages", chatroomId],
    queryFn: () =>
      getRequest<TChatroomMessage[]>(`/chatroom/${chatroomId}/messages`).then(
        (response) => {
          if (response.success) {
            return response.result
          } else {
            logout()
            return []
          }
        }
      ),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  })
}

/** send messages in the chatroom */
export function usePostMessage(chatroomId: string, queryClient: QueryClient) {
  return useMutation({
    mutationFn: ({
      content,
      contentType,
    }: {
      content: string
      contentType: string
    }) =>
      postRequest(`/chatroom/message`, { content, chatroomId, contentType }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["chatroomMessages"],
        refetchType: "all",
      }),
  })
}

/** Fetch users in a specific chatroom */
export function useChatroomUsers(chatroomId: string) {
  const logout = useLogout()

  return useQuery<TUser[], Error>({
    queryKey: ["chatroomUsers", chatroomId],
    queryFn: () =>
      getRequest<TUser[]>(`/chatroom/${chatroomId}/users`).then((response) => {
        if (response.success) {
          return response.result
        } else {
          logout()
          return []
        }
      }),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  })
}

/** get more detailed data of the chatroom */
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

/** join classroom */
export function useJoinChatroomMutation(
  {
    chatroomId,
    userName,
    userId,
  }: { chatroomId: string; userName: string; userId: string }
  // successCb: () => void
) {
  return useMutation({
    mutationFn: () => postRequest(`/chatroom/enter`, { chatroomId }),
    onSuccess: () => {
      /* socketClient.emit("join-room", { chatroomId, userName, userId }), */
    },
  })
}
