import UserRepository from "src/api/user/repository"
import jwt from "jsonwebtoken"

class AuthService {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  private JWT_SECRET = process.env.JWT_SECRET || "umdoistres456seteoitonove10"
  async login({
    email,
    password,
  }: {
    email: string
    password: string
  }): Promise<{ token: string; id: string }> {
    const user = await this.userRepository.findUserByEmail({ email })

    if (!user) {
      throw new Error("Invalid email or password")
    }

    if (user.password !== password) {
      throw new Error("Invalid email or password")
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      this.JWT_SECRET,
      { expiresIn: "7d" }
    )

    return { token, id: user.id }
  }
}

export default new AuthService()
