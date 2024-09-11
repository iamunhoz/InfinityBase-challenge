import useAppStore, { useLogout } from "src/store/authStore"

export function HeaderButtons(): JSX.Element {
  const { isLoggedIn } = useAppStore()
  const logout = useLogout()

  return (
    <div className="flex space-x-4">
      {isLoggedIn && (
        <>
          <button
            className="py-2 px-4 hover:border hover:border-red-700 text-white rounded-md"
            onClick={logout}
          >
            Logout
          </button>
        </>
      )}
    </div>
  )
}
