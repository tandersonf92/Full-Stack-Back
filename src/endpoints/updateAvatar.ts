import { Request, Response } from "express";
import connection from "../data/connection";
import { getTokenData } from "../services/authenticator";

async function updateAvatar(req: Request, res: Response) {
    try {
        const authorization = req.headers.authorization
        if (!authorization) {
            throw new Error("The field 'authorization is empty,please fill it.")
        }

        const avatarAddress = req.body.avatarAddress;

        if (!avatarAddress) {
            res.statusCode = 400;
            throw new Error("avatarAddress not informed");
        }

        const token = getTokenData(authorization)
        const music_author = token.id

        await connection.raw(`
      UPDATE MUSIC_USER
      SET avatar = "${avatarAddress}"
      WHERE id = "${music_author}";
    `);

        res.send({ message: "Avatar Updated!" });
    } catch (error) {
        console.error(error);
        res.send({ message: error.message || error.sqlMessage });
    }
}

export default updateAvatar;
