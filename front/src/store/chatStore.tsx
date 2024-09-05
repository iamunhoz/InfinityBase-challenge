import { create } from "zustand"

interface ChatState {
  messages: string[]
  addMessage: (message: string) => void
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  addMessage: (message: string) =>
    set((state) => ({ messages: [...state.messages, message] })),
}))
