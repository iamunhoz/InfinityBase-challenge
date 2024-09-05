import UserRepository from "src/api/user/repository"
import jwt from "jsonwebtoken"

class AuthService {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  private JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"
  async login({
    email,
    password,
  }: {
    email: string
    password: string
  }): Promise<string> {
    const user = await this.userRepository.findUserByEmail({ email })

    if (!user) {
      throw new Error("Invalid email or password")
    }

    // Assuming password validation (in reality, you should hash the password and compare it)
    if (user.password !== password) {
      throw new Error("Invalid email or password")
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email }, // Payload (user's ID and email)
      this.JWT_SECRET, // Secret key
      { expiresIn: "1h" } // Token expiration
    )

    return token
  }
}

export default new AuthService()
