import { Response, NextFunction, Request } from "express"
import * as jwt from "jsonwebtoken"

class Auth {
  private JWT_SECRET: string

  constructor() {
    this.JWT_SECRET = process.env.JWT_SECRET || "umdoistres456seteoitonove10"
    this.check = this.check.bind(this)
  }

  public check(req: Request, res: Response, next: NextFunction) {
    const { headers } = req
    const authHeader = headers.authorization

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1]

      try {
        const jwtVerification = jwt.verify(token, this.JWT_SECRET)
        res.locals.jwtVerification = jwtVerification
        next()
      } catch (error: any) {
        res
          .status(401)
          .json({ success: false, message: "Invalid or expired token" })
          .end()
      }
    } else {
      res
        .status(401)
        .json({
          success: false,
          message: "Authorization token missing or malformed",
        })
        .end()
    }
  }
}

export default new Auth()
