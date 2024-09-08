import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { postRequest } from "src/lib/network/baseRequests"
import useAuthStore from "src/store/authStore"

export function LoginPage(): JSX.Element {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const { setIsLoggedIn, setUserId } = useAuthStore()

  const navigate = useNavigate()

  // Define mutation for login
  const loginMutation = useMutation({
    mutationFn: async () =>
      postRequest<{ token: string; id: string }>("/auth/login", {
        email,
        password,
      }),
    onSuccess: (data) => {
      if (data.success) {
        // Store the token in localStorage
        console.log("login result data", data)
        localStorage.setItem("token", data.result.token)
        setIsLoggedIn(true)
        setUserId(data.result.id)
        navigate("/app") // Redirect to the homepage
      } else {
        setError("Login failed. Please check your credentials.")
        setIsLoggedIn(false)
      }
    },
    onError: () => {
      setError("An error occurred while logging in. Please try again.")
      setIsLoggedIn(false)
    },
  })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null) // Clear previous errors
    loginMutation.mutate() // Trigger mutation
  }

  const handleForgotPassword = () => {
    navigate("/forgot-password")
  }

  return (
    <div className="flex flex-grow items-center justify-center bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 rounded-lg p-8 shadow-md">
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 mt-1 bg-gray-700 border border-gray-600 rounded-md text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 mt-1 bg-gray-700 border border-gray-600 rounded-md text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm"
              disabled={loginMutation.isPending} // Disable button during loading
            >
              {loginMutation.isPending ? "Logging in..." : "Log In"}
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={handleForgotPassword}
            className="text-sm text-blue-400 hover:text-blue-500"
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  )
}
