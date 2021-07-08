import { Request, Response } from "express";
import connection from "../connection";



export default async function getMusicByTitle(req: Request, res: Response) {
    try {
        const authorization = req.headers.authorization
        if (!authorization) {
            throw new Error("The field 'authorization is empty,please fill it.")
        }

        const music_title = req.params.music_title
        console.log('music_title: ', music_title)
        const [music] = await connection.raw(`
        SELECT * FROM MUSIC
        WHERE music_title LIKE '%${music_title}%'`)
        console.log('music:', music)
        if (!music) {
            res.status(409).send({
                message: "music not found"
            })
        }
        res.status(200).send({
            message: music
        })
    } catch (error) {
        console.error(error);
        res.send({ message: error.message || error.sqlMessage });
    }
}