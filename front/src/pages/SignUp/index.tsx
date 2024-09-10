import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { postRequest } from "src/lib/network/baseRequests"
import useAppStore from "src/store/authStore"
import { RequestResponse, TUser } from "src/lib/definitions"

export function SignUpPage(): JSX.Element {
  const [name, setName] = useState<string>("seconduser")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const { setIsLoggedIn, setUser } = useAppStore()

  const navigate = useNavigate()

  // Define mutation for sign-up
  const signUpMutation = useMutation({
    mutationFn: async () =>
      postRequest<{ user: TUser; token: string }>("/user/new", {
        name,
        email,
        password,
      }),
    onSuccess: (data: RequestResponse<{ user: TUser; token: string }>) => {
      console.log("postrequest mutation result", data)
      if (data.success) {
        localStorage.setItem("token", data.result.token)
        setIsLoggedIn(true)
        setUser(data.result.user)
        navigate("/app")
      } else {
        setError("Sign-up failed. Please try again.")
        setIsLoggedIn(false)
      }
    },
    onError: () => {
      setError("An error occurred while signing up. Please try again.")
      setIsLoggedIn(false)
    },
  })

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null) // Clear previous errors
    signUpMutation.mutate() // Trigger mutation
  }

  return (
    <div className="flex flex-grow items-center justify-center bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 rounded-lg p-8 shadow-md">
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          Sign Up
        </h1>
        <form onSubmit={handleSignUp} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-2 mt-1 bg-gray-700 border border-gray-600 rounded-md text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
              disabled={signUpMutation.isPending} // Disable button during loading
            >
              {signUpMutation.isPending ? "Signing up..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
