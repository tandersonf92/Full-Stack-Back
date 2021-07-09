import { Request, Response } from "express";
import connection from "../data/connection";
import { getTokenData } from "../services/authenticator";
import { generateId } from "../services/idGenerator";
import { classroom } from "../models/types";
import { dateValidations, isClassNameValid } from "../validations/classValidations";
// import { isClassNameValid } from "../validations/isValidName";


export default async function createAlbum(req:Request,res:Response):Promise<void>  {
    try {
       let album_name = req.body.album_name
       if (!album_name) {
         throw new Error("album is missing")
     }
     const authorization = req.headers.authorization as string
     if (!authorization) {
         throw new Error("The field 'authorization is empty,please fill it.")
     }

     const [albums] = await connection('ALBUM')
     .where({ album_name })
  if (albums) {
     res.statusCode = 409
     throw new Error("This album already exists")
  }

     //I TESTAR SE O ALBUM JA EXISTE POR OUTRO CONNECTION
     const token = getTokenData(authorization)
     const music_author = token.id
    const id = generateId()
       const [result] = await connection.raw(`
       INSERT INTO ALBUM (album_id,album_name,album_author) 
       VALUES ("${id}","${album_name}","${music_author}");`)
       console.log("Result: ",result)
       res.status(200).send({
          message: "album created",
          album_name,
          id
       })
    } catch (error) {
       res.send(error.message || error.sqlMessage)
    }
 }