#

this chat will be a guide and a rubber duck for a coding challenge. this first message os to set up roughly what I want. Just use memorize it. I'll ask pieces of code later.

The purpose is to create a full stack discord clone. I plan to start the api, the db and models, test the endpoints by using a rest api text client (thunder api extension) and then I'll build the frontend. I work on archlinux.

Help me first with the typing and models. I'll be using typeorm in the express app, and the db will be postregres running on postgres default port.

The structure will be this way:

- index.ts starts express (done)
- index.ts import class Routes:

  ```
    import { Router } from "express"
    import { userRouter } from "src/api/user/router"

    class Routes {
      constructor(app: Router) {
        app.use("/user", userRouter)
      }
    }

    export { Routes }
  ```

- each router will be like this (tell which requests work in this endpoint):
  import { Router } from "express"
  import { userController } from "./controller"
  const userRouter = Router()

  userRouter.post("/new", userController.createUser)
  userRouter.get("/balance", userController.getuserBalance)

  export { userRouter }

- each controller will be like this (focus is on checking valid request query, body and params and handling http codes and responses):
  import { Request, Response } from "express"
  import Validations from "src/lib/validations"

  class userController {
  userService = userService
  validations = Validations

  constructor() {
  this.userService = userService
  this.validations = Validations

      this.createUser = this.createUser.bind(this)

  }

  async createUser(req: Request, res: Response) {
  try {
  const { password, email } = this.validations.validateDto<{ password: string; email: string }>(
  req.body,
  ["email", "password"]
  )

        // Create a new user
        const newUser = await this.userService.newUser(
          email,
          password
        )

        res.status(200).json({
          newUser
        })
      } catch (error) {
        res.status(500).send(`request failed due to: ${error}`)
      }

  }

  const userController = new userController()

  export { userController }
  }

- each service will be like this (focus on handling business logic):
  class userService {
  constructor() {
  this.newUser = this.newUser.bind(this);
  }
  async newUser({email, password}:{email: string, password: string}): Promise<User[]> {
  /** if email already exists return http impossible to create user \*/
  /** if password is too short return bad password response \*/
  const data = await this.userRepository.newUser({email, password});
  return data;
  }
  }
  export default new userService();

- each repository will be like this (focus is building query to database using typeOrm. I'll let you build the query function calls)
  class UserRepository {
  constructor() {
  this.newUser = this.newUser.bind(this)
  }
  async newUser({
  email,
  password,
  }: {
  email: string
  password: string
  }): Promise<User> {
  /** if email already exists return http impossible to create user \*/
  /** if password is too short return bad password response \*/
  // const data = await typeormclient.functionToInsertDataIntoDb({email, password})
  // return data
  }
  }
  export default new UserRepository()

I need models for user, chatroom, chatroom-messages, user-to-user-messages and how to setup typeorm in an express app.
