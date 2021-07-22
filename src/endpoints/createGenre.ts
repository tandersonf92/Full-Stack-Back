import { Request, Response } from "express";
import connection from "../data/connection";
import { generateId } from "../services/idGenerator";
import { classroom } from "../models/types";


export default async function createGenre(req:Request,res:Response):Promise<void>  {
    try {
       let genre = req.body.genre
       if (!genre) {
         throw new Error("genre is missing")
     }
     //I TESTAR SE O GENRE JA EXISTE POR OUTRO CONNECTION

    const id = generateId()

    
       const [result] = await connection.raw(`
       INSERT INTO GENRE (genre_id,genre_name) 
       VALUES ('${id}','${genre}');`)
       console.log("Result: ",result)
       res.status(200).send({
          message: "Genre created",
          genre,
          id
       })
    } catch (error) {
       res.send(error.message || error.sqlMessage)
    }
 }