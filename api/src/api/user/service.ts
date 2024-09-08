import UserRepository from "./repository"
import { User, UserSafe } from "src/models/User"
import { AppDataSource } from "src/lib/ormconfig"
import jwt from "jsonwebtoken"

class UserService {
  private userQuery = AppDataSource.getRepository(User)
  private JWT_SECRET = process.env.JWT_SECRET || "umdoistres456seteoitonove10"

  userRepository: UserRepository

  constructor() {
    this.newUser = this.newUser.bind(this)
    this.userRepository = new UserRepository()
  }

  async newUser(user: {
    email: string
    password: string
    name: string
  }): Promise<UserSafe & { token: string }> {
    const existingUser = await this.userQuery.findOneBy({ email: user.email })
    if (existingUser) {
      throw new Error("User with this email already exists.")
    }

    if (user.password.length < 16) {
      throw new Error("Password must be at least 16 characters long.")
    }

    // Create and save the new user, then return it without the password
    const { password, ...newUser }: User = await this.userRepository.createUser(
      user
    )

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      this.JWT_SECRET,
      { expiresIn: "7d" }
    )

    return { ...newUser, token }
  }

  async getUserById({ id }: { id: string }): Promise<UserSafe | null> {
    const user = await this.userRepository.getUserById({ id })
    if (!user) {
      throw new Error("User not found")
    }

    const { password, ...userSafe } = user

    return userSafe
  }
}

export default new UserService()
