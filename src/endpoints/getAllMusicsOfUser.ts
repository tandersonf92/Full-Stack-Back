import { Request, Response } from "express";
import connection from "../data/connection";
import { getTokenData } from "../services/authenticator";



export default async function getAllMusicsOfUser(req: Request, res: Response) {
    try {
        const authorization = req.headers.authorization
        if (!authorization) {
            throw new Error("The field 'authorization is empty,please fill it.")
        }
console.log('authorization:',authorization)
        const token = getTokenData(authorization)
        const music_user = token.id
        // const author = req.query.author
console.log('author: ',music_user)
        const [result] = await connection.raw(`
        SELECT music_id as id, music_title as title ,
        music_user as author,
        date,
        music_file as file_address
        FROM MUSIC
        WHERE music_user = '${music_user}'`)
        res.status(200).send(result)
    } catch (error) {
        console.error(error);
        res.send({ message: error.message || error.sqlMessage });
    }
}