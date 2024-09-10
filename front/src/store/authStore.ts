import { useNavigate } from "react-router-dom"
import { TUser } from "src/lib/definitions"
import { create } from "zustand"

interface AuthState {
  isLoggedIn: boolean
  setIsLoggedIn: (status: boolean) => void
  user: Partial<TUser>
  setUser: (user: Partial<TUser>) => void
  handleLogout: () => void
}
const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (status: boolean) => set({ isLoggedIn: status }),
  user: {
    id: "fddfdfds",
    email: "dffds@gddsf",
    name: "so existe esse user porque não dá pra fazer hook condicional",
  },
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user))
    set({ user })
  },
  handleLogout: () => {
    localStorage.removeItem("token")
    localStorage.removeItem("id")
    set({ isLoggedIn: false })
  },
}))

export const useLogout = () => {
  const navigate = useNavigate()
  const { handleLogout } = useAuthStore()

  return () => {
    handleLogout()
    navigate("/")
  }
}

export default useAuthStore
