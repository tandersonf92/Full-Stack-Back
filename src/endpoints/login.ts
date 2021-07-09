import { compareSync } from "bcryptjs"
import { Request, Response } from "express"
import connection from "../data/connection"

import { generateToken } from "../services/authenticator"
import { checkEmail } from "../validations/checkEmail"

export const login = async (req: Request, res: Response): Promise<void> => {
   try {
      const { email, password } = req.body

      if (!email) {
         throw new Error("Field email is missing")
      }
      if (!password || password.length < 6) {
         throw new Error("Field password is missing or have less than 6 digits")
      }
      checkEmail(email)
      const [user] = await connection("MUSIC_USER").where({ email })

      const checkPassword = compareSync(password, user.password)
      if (!checkPassword) {
         throw new Error("password is incorrect")
      }
      if (!user) {
         throw new Error("email not found.")
      }
      const token = generateToken(
         user.id
      )
      console.log('token: ',token)
      res.send({
         message: "Successfully Logged In ",
         accessToken: token
      })
   } catch (err) {

      res.send({
         message: err.message || err.sqlMessage
      })
   }
}
