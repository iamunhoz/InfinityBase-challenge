import { Outlet } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { HeaderButtons } from "./HeaderButtons"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import useAuthStore from "src/store/authStore"

export function AppLayout() {
  const navigate = useNavigate()
  const { setIsLoggedIn, setUser } = useAuthStore()

  useEffect(() => {
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user")

    if (!token) {
      console.log("DISCONNECTING")
      // socketClient.disconnect()
    }

    if (
      !token &&
      !["/app/login", "/app/sign-up"].includes(window.location.pathname)
    ) {
      navigate("/app/login")
      return
    }

    if (!user) {
      return
    }

    setUser(JSON.parse(user))
    setIsLoggedIn(true)
  }, [])

  return (
    <div className="flex flex-col max-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-1 shadow-md flex justify-between">
        <h1 className="text-2xl font-bold p-0 m-0">
          <Link
            to="/"
            className="text-white hover:text-blue-400 transition-colors duration-300"
          >
            Disclonecord
          </Link>
        </h1>
        <HeaderButtons />
      </header>

      <main className="flex">
        <Outlet />
      </main>

      <footer>{/* Empty footer for now */}</footer>
    </div>
  )
}
