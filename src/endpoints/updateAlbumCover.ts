import { Request, Response } from "express";
import connection from "../connection";
import { getTokenData } from "../services/authenticator";

async function updateAlbumCover(req: Request, res: Response) {
    try {
        const authorization = req.headers.authorization
        if (!authorization) {
            throw new Error("The field 'authorization is empty,please fill it.")
        }

       const album_id = req.params.album_id
        const album_cover = req.body.album_cover;

        if (!album_cover) {
            res.statusCode = 400;
            throw new Error("album_cover not informed");
        }

        const token = getTokenData(authorization)
        const music_author = token.id

        await connection.raw(`
      UPDATE ALBUM
      SET album_cover = "${album_cover}"
      WHERE album_id = "${album_id}";
    `);

        res.send({ message: "album_cover Updated!" });
    } catch (error) {
        console.error(error);
        res.send({ message: error.message || error.sqlMessage });
    }
}

export default updateAlbumCover;
