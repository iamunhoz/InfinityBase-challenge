import { useNavigate } from "react-router-dom"
import useAuthStore from "src/store/authStore"
import "./homepage.css"

export function HomePage(): JSX.Element {
  const { isLoggedIn } = useAuthStore()
  const navigate = useNavigate()

  // Redirect to chatrooms if logged in
  if (isLoggedIn) {
    navigate("/app")
    return <></>
  }

  return (
    <main className="flex flex-col min-h-screen">
      <div
        style={{ backgroundImage: "url('/homepage_bg.png')" }}
        className=" blurred-corners flex-grow flex flex-col items-center justify-center  bg-gray-900 text-white"
      >
        <div className="bg-black bg-opacity-75 p-8 rounded-md shadow-lg">
          <h1 className="text-4xl font-extrabold text-center mb-8">
            Welcome to Disclonecord! <br /> Connect, Conquer, Communicate.
          </h1>
          <p className="text-lg text-center mb-16">
            Join the ultimate hub for geeky conversations, strategy talks, and
            more. One chatroom at a time.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <button
              className="relative px-6 py-3 bg-gradient-to-r from-blue-500 via-blue-700 to-purple-700 text-lg font-bold rounded-md text-white tracking-wide shadow-lg transform hover:scale-105 transition-transform duration-300 hover:shadow-blue-500/80 glow-effect"
              onClick={() => navigate("/app/login")}
            >
              Login
            </button>
            <button
              className="relative px-6 py-3 bg-gradient-to-r from-green-400 via-teal-500 to-blue-600 text-lg font-bold rounded-md text-white tracking-wide shadow-lg transform hover:scale-105 transition-transform duration-300 hover:shadow-teal-400/80 glow-effect"
              onClick={() => navigate("/app/sign-up")}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
