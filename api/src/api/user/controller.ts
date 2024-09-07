import { Request, Response } from "express"
import Validations from "src/lib/validations"
import UserService from "./service"
import { handleRequestResponse } from "src/lib/controller-handler"

class UserController {
  accountService = UserService
  validations = Validations

  constructor() {
    this.accountService = UserService
    this.validations = Validations

    this.createUser = this.createUser.bind(this)
    this.getUserById = this.getUserById.bind(this)
  }

  // POST /user/create
  async createUser(req: Request, res: Response) {
    return handleRequestResponse(req, res, async () => {
      const { password, email, name } = this.validations.validateDto<{
        password: string
        email: string
        name: string
      }>(req.body, ["email", "password", "name"])

      // Create a new user account
      return await this.accountService.newUser({
        email,
        password,
        name,
      })
    })
  }

  // GET /user?id=<userId>
  async getUserById(req: Request, res: Response) {
    return handleRequestResponse(req, res, async () => {
      const id = req.query.id as string

      if (!id) {
        throw new Error("User ID is required")
      }

      const user = await UserService.getUserById({ id })

      if (!user) {
        throw new Error("User not found")
      }

      return user
    })
  }
}

const userController = new UserController()
export { userController }
