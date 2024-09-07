import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ChakraProvider } from "@chakra-ui/react"
import { HomePage } from "./pages/HomePage"
import { ChatroomPage } from "./pages/ChatroomPage"
import { LoginPage } from "./pages/Login"
import { AppLayout } from "./components/Layout"
import { SignUpPage } from "./pages/SignUp"
import { DashboardPage } from "./pages/Dashboard"

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="sign-up" element={<SignUpPage />} />
            <Route path="chatrooms/:id" element={<ChatroomPage />} />
          </Route>
        </Routes>
      </Router>
    </ChakraProvider>
  )
}

export default App
