import { User } from "src/models"
import { AppDataSource } from "src/lib/ormconfig"

export class UserRepository {
  private userQuery = AppDataSource.getRepository(User)

  async createUser({
    email,
    password,
    name,
  }: {
    email: string
    password: string
    name: string
  }): Promise<User> {
    const newUser = this.userQuery.create({ email, password, name })
    return this.userQuery.save(newUser)
  }

  async getUserById({ id }: { id: string }): Promise<User | null> {
    const user = await this.userQuery.findOneBy({ id })
    return user || null
  }

  async findUserByEmail({ email }: { email: string }): Promise<User | null> {
    const user = await this.userQuery.findOneBy({ email })
    return user || null
  }
}

export default UserRepository
