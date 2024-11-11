import { QueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { TChatroom, TChatroomMessage, TUser } from "../definitions"
import { getRequest, postRequest } from "./baseRequests"
import { useLogout } from "src/store/authStore"
import { QueryKey } from "../definitions/enumerations"

const minutes = (m: number) => 1000 * 60 * m

/**
 Fetch all chatrooms
 * */
export function useChatrooms() {
  const logout = useLogout()
  return useQuery<TChatroom[], Error>({
    queryKey: [QueryKey.chatrooms],
    queryFn: () =>
      getRequest<TChatroom[]>(`/chatroom`).then((response) => {
        if (response.success) {
          return response.result
        } else {
          logout()
          return []
        }
      }),
    staleTime: minutes(5),
    refetchOnWindowFocus: true,
  })
}

export function useChatroomsByUser() {
  // const logout = useLogout()
  return useQuery<TChatroom[], Error>({
    queryKey: [QueryKey.chatroomsByUser],
    queryFn: () =>
      getRequest<TChatroom[]>(`/chatroom/byuser`).then((response) => {
        if (response.success) {
          return response.result
        } else {
          // logout()
          return []
        }
      }),
    staleTime: minutes(5),
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
    staleTime: minutes(5),
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
    queryKey: [QueryKey.chatroomUsers, chatroomId],
    queryFn: () =>
      getRequest<TUser[]>(`/chatroom/${chatroomId}/users`).then((response) => {
        if (response.success) {
          return response.result
        } else {
          logout()
          return []
        }
      }),
    staleTime: minutes(5),
    refetchOnWindowFocus: true,
  })
}

/** get more detailed data of the chatroom */
export function useGetChatroomData(chatroomId: string) {
  return useQuery<TChatroom | null>({
    queryKey: [QueryKey.chatroomById, chatroomId],
    queryFn: () =>
      getRequest<TChatroom | null>(
        `/chatroom/byid?chatroomId=${chatroomId}`
      ).then((response) => (response.success ? response.result : null)),
    staleTime: minutes(5),
    refetchOnWindowFocus: true,
  })
}

/** join classroom */
export function useJoinChatroomMutation(dto: { chatroomId: string }) {
  return useMutation({
    mutationFn: () => postRequest(`/chatroom/enter`, dto),
  })
}

// self: trazer os mutations de login e signup pra cá

// self: split-refactor after line 300
