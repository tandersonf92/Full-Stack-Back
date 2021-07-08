import { Request, Response } from "express";
import connection from "../connection";


export default async function getAllGenres (req:Request,res:Response):Promise<void>  {
    try {
       const [result] = await connection.raw(`  SELECT * FROM GENRE;`)
       console.log("result: ",result)
       res.status(200).send(result)
    } catch (error) {
       res.send(error.message || error.sqlMessage)
    }
 }