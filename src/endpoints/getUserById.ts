import { Request, Response } from "express";
import connection from "../data/connection";



export default async function getUserById(req: Request, res: Response) {
    try {
        const authorization = req.headers.authorization
        if (!authorization) {
            throw new Error("The field 'authorization is empty,please fill it.")
        }

        const id = req.params.id

        const [user] = await connection.raw(`
        SELECT nickname,avatar FROM MUSIC_USER
        WHERE id = '${id}'`)
        console.log('user:', user)
        if (!user) {
            res.status(409).send({
                message: "user not found"
            })
        }
        res.status(200).send({
            data: user
        })
    } catch (error) {
        console.error(error);
        res.send({ message: error.message || error.sqlMessage });
    }
}