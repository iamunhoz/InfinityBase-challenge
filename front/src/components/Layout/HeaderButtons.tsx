// import { useEffect } from "react"
import useAppStore, { useLogout } from "src/store/authStore"

export function HeaderButtons(): JSX.Element {
  const { isLoggedIn } = useAppStore()
  const logout = useLogout()

  return (
    <div className="flex space-x-4">
      <button
        className="py-2 px-4 hover:border hover:border-red-700 text-white rounded-md"
        onClick={logout}
      >
        Logout
      </button>
      {isLoggedIn ? (
        <></>
      ) : (
        <>
          {/* <button
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
          </button> */}
        </>
      )}
    </div>
  )
}
