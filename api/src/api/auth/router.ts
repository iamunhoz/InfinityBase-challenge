import { Router } from "express"
import AuthController from "./controller"

const authRouter = Router()

authRouter.post("/login", AuthController.login)

export { authRouter }
