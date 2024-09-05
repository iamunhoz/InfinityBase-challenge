import { Router } from "express"
import { authRouter } from "src/api/auth/router"
import { chatroomRouter } from "src/api/chatroom/router"
import { userRouter } from "src/api/user/router"

class Routes {
  constructor(app: Router) {
    app.use("/user", userRouter)
    app.use("/auth", authRouter)
    app.use("/chatroom", chatroomRouter)
  }
}

export { Routes }
