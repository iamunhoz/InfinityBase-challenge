import { Outlet } from "react-router-dom"
import { HeaderButtons } from "./HeaderButtons"
import { Link } from "react-router-dom"

export function AppLayout() {
  return (
    <div
      className="flex flex-col min-h-screen bg-gray-900 text-white"
      // style={{ border: "1px solid red" }}
    >
      {/* Header */}
      <header
        className="bg-gray-800 p-1 shadow-md flex justify-between"
        // style={{ border: "1px solid blue" }}
      >
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

      {/* Main Content */}
      <main className="flex-grow flex">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 p-4 mt-auto">
        {/* Empty footer for now */}
      </footer>
    </div>
  )
}
