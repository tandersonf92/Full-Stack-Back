import { Request, Response } from "express";
import connection from "../data/connection";



export default async function searchMusicByAuthor(req: Request, res: Response) {
    try {
        const authorization = req.headers.authorization
        if (!authorization) {
            throw new Error("The field 'authorization is empty,please fill it.")
        }

        const author = req.query.author

        const [user] = await connection.raw(`
        SELECT * FROM MUSIC
        WHERE music_author = '${author}'`)
        console.log('user:', user)
        if (!user) {
            res.status(409).send({
                message: "user not found"
            })
        }
        res.status(200).send({
            message: user
        })
    } catch (error) {
        console.error(error);
        res.send({ message: error.message || error.sqlMessage });
    }
}