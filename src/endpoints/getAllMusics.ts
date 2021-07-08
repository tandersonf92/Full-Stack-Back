import { Request, Response } from "express";
import connection from "../connection";


export default async function getAllMusics (req:Request,res:Response):Promise<void>  {
    try {
      const [result] = await connection.raw(`
        SELECT music_id as music, music_title as title ,
        music_author as author,
        date,
        music_file as file_address
        FROM MUSIC;
        `)

        const allGenresForTest = await connection('GENRE').select("*") 
        console.log("allGenres: ",allGenresForTest)
       res.status(200).send(result)
    } catch (error) {
       res.send(error.message || error.sqlMessage)
    }
 }