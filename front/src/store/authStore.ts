// store.js
import { create } from "zustand"
interface AuthState {
  isLoggedIn: boolean // boolean for login state
  setIsLoggedIn: (status: boolean) => void // function to update the login state
  userId: string
  setUserId: (id: string) => void
}
// Zustand store for login state
const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false, // initial state
  setIsLoggedIn: (status: boolean) => set({ isLoggedIn: status }), // function to update the state
  userId: "not-defined",
  setUserId: (id: string) => {
    set({ userId: id })
  },
}))

export default useAuthStore
