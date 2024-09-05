import { Router } from "express"
import { userController } from "./controller"
import AuthMiddleware from "src/lib/auth.middleware"
const userRouter = Router()

userRouter.post("/new", userController.createUser)
userRouter.get("/", AuthMiddleware.check, userController.getUserById)

export { userRouter }
