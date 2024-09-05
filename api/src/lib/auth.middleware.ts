/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, NextFunction } from "express"
import * as jwt from "jsonwebtoken"

class Auth {
  private JWT_SECRET: string

  constructor() {
    this.JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"
    this.check = this.check.bind(this)
  }

  public check(req: any, res: Response, next: NextFunction) {
    const { headers } = req
    const authHeader = headers.authorization

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1]

      try {
        const jwtVerification = jwt.verify(token, this.JWT_SECRET)
        // Attach decoded JWT data to res.locals or req for further use
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
