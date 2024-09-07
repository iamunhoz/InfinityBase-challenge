// store.js
import { create } from "zustand"
interface AuthState {
  isLoggedIn: boolean // boolean for login state
  setIsLoggedIn: (status: boolean) => void // function to update the login state
}
// Zustand store for login state
const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false, // initial state
  setIsLoggedIn: (status: boolean) => set({ isLoggedIn: status }), // function to update the state
}))

export default useAuthStore
