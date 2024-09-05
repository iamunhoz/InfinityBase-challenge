import { Request, Response } from "express"
import AuthService from "./service"

class AuthController {
  constructor() {
    this.login = this.login.bind(this)
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" })
      }

      const token = await AuthService.login({ email, password })

      return res.status(200).json({ token })
    } catch (error) {
      return res.status(401).json({ message: error })
    }
  }
}

export default new AuthController()
