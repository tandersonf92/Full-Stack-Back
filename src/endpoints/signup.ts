import { Request, Response } from "express";
import connection from "../data/connection";
import { checkEmail } from "../validations/checkEmail";
import { generateToken } from "../services/authenticator";
import { createHash } from "../services/hashManager";
import { generateId } from "../services/idGenerator";
import { user } from "../types/User";


export const signUp = async (req: Request, res: Response): Promise<void> => {
   try {
      const { name, email, password, nickname } = req.body
      if (!name) {
         throw new Error("Field name is missing")
      }
      if (!email) {
         throw new Error("Field email is missing")
      }
      if (!nickname) {
         throw new Error("Field nickname is missing")
      }
      if (!password || password.length < 6) {
         throw new Error("Field password is missing or have less than 6 digits")
      }

      const [user] = await connection('MUSIC_USER')
         .where({ email })
      if (user) {
         res.statusCode = 409
         throw new Error("This email already exists")
      }

      const [thisNicknameExist] = await connection('MUSIC_USER')
         .where({ nickname })
      if (thisNicknameExist) {
         res.statusCode = 409
         throw new Error("This nickname already exists")
      }

      checkEmail(email)

      const id: string = generateId()

      const newUser: user = {
         id,
         name,
         password: createHash(password),
         nickname,
         email,


      }
      await connection('MUSIC_USER')
         .insert(newUser)

      const token: string = generateToken(id)


      res.status(201).send({
         message: "User created.",
         token
      })
   } catch (err) {
      res.send({
         message: err.message || err.sqlMessage
      })
   }
}