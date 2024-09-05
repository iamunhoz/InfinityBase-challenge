import { Request, Response } from "express"
import Validations from "src/lib/validations"
import UserService from "./service"

class UserController {
  accountService = UserService
  validations = Validations

  constructor() {
    this.accountService = UserService
    this.validations = Validations

    this.createUser = this.createUser.bind(this)
  }

  async createUser(req: Request, res: Response) {
    try {
      const { password, email } = this.validations.validateDto<{
        password: string
        email: string
      }>(req.body, ["email", "password"])

      // Create a new account
      const newUser = await this.accountService.newUser({
        email,
        password,
      })

      res.status(200).json({
        newUser,
      })
    } catch (error) {
      res.status(500).send(`request failed due to: ${error}`)
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const id = req.query.id as string

      if (!id) {
        return res.status(400).json({ message: "User ID is required" })
      }

      const user = await UserService.getUserById({ id })

      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }

      return res.status(200).json({ user })
    } catch (error) {
      return res.status(500).json({ message: `Error: ${error}` })
    }
  }
}

const userController = new UserController()

export { userController }
