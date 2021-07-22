import { Request, Response } from "express";
import connection from "../data/connection";



export default async function getMusicById(req: Request, res: Response) {
    try {
        const authorization = req.headers.authorization
        if (!authorization) {
            throw new Error("The field 'authorization is empty,please fill it.")
        }

        const music_id = req.params.music_id

        const [music] = await connection.raw(`
        SELECT * FROM MUSIC
        WHERE music_id = '${music_id}'`)
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