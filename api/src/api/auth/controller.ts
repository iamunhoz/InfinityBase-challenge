import { Request, Response } from "express"
import AuthService from "./service"
import { handleRequestResponse } from "src/lib/controller-handler"
import validations from "src/lib/validations"

class AuthController {
  constructor() {
    this.login = this.login.bind(this)
  }

  async login(req: Request, res: Response) {
    handleRequestResponse(req, res, async () => {
      const { password, email } = validations.validateDto<{
        password: string
        email: string
      }>(req.body, ["email", "password"])

      return await AuthService.login({ email, password })
    })
  }
}

export default new AuthController()
