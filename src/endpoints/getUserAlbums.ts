import { Response, Request } from "express";
import connection from "../connection";
import { getTokenData } from "../services/authenticator";

async function getUserAlbums(req: Request, res: Response): Promise<void> {
  try {

    const authorization = req.headers.authorization as string
     if (!authorization) {
         throw new Error("The field 'authorization is empty,please fill it.")
     }
     //I TESTAR SE O ALBUM JA EXISTE POR OUTRO CONNECTION
     const token = getTokenData(authorization)
     const music_author_id = token.id
     console.log('music_author_id :',music_author_id)
    

    const [result] = await connection.raw(`
      SELECT album_id, album_name,album_cover
       FROM ALBUM
       JOIN  MUSIC_USER
       ON  ALBUM.album_author = MUSIC_USER.id 
      WHERE album_author= '${music_author_id}';
    `);


    if(result.length === 0){
      res.statusCode = 400
      throw new Error("This user does not exist");
    }

    res.send(result);
  } catch (error) {
    console.error(error);
    res.send({ message: error.message || error.sqlMessage });
  }
}

export default getUserAlbums;
