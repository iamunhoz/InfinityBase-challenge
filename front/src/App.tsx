import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { HomePage } from "./pages/HomePage"
import { ChatroomPage } from "./pages/ChatroomPage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chatroom/:id" element={<ChatroomPage />} />
      </Routes>
    </Router>
  )
}

export default App
