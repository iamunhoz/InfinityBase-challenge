import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import useAppStore from "src/store/authStore"

export function HeaderButtons(): JSX.Element {
  const navigate = useNavigate()
  const { isLoggedIn, setIsLoggedIn } = useAppStore()

  useEffect(() => {
    // Check if the user is logged in by checking localStorage for a token
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token)
  }, [])

  const handleLogin = () => {
    navigate("/app/login")
  }

  const handleSignUp = () => {
    navigate("/app/sign-up") // Assuming you have a sign-up page
  }

  const handleLogout = () => {
    localStorage.removeItem("token") // Remove token to log out
    setIsLoggedIn(false)
    navigate("/app/login")
  }

  return (
    <div className="flex space-x-4">
      {isLoggedIn ? (
        <button
          className="py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-md"
          onClick={handleLogout}
        >
          Logout
        </button>
      ) : (
        <>
          <button
            className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            onClick={handleLogin}
          >
            Login
          </button>
          <button
            className="py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        </>
      )}
    </div>
  )
}
