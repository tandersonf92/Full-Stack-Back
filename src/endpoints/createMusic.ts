import { Request, Response } from "express";
import connection from "../data/connection";
import { getTokenData } from "../services/authenticator";
import { generateId } from "../services/idGenerator";


export default async function (req: Request, res: Response): Promise<void> {
    try {

        const authorization = req.headers.authorization as string
        if (!authorization) {
            throw new Error("The field 'authorization is empty,please fill it.")
        }
        let { music_title, music_file,music_author, genre_id, album_id } = req.body
        if (!music_title) {
            throw new Error("music_title is missing")
        }
        if (!music_file) {
            throw new Error("music_file is missing")
        }
        if (!music_author) {
            throw new Error("music_author is missing")
        }
        if (!genre_id) {
            throw new Error("genre_id is missing")
        }
        if (!album_id) {
            throw new Error("album_id is missing")
        }
        //  dateValidations(file,genre_id)

        //TESTARRRRRR O ALBUM ID VER SE EXISTE

        const [genres] = await connection('ALBUM')
            .where({ album_id })
        if (!genres) {
            res.statusCode = 400
            throw new Error("This music_genre doesn't exist")
        }
        // FAZER 1 CHECK PRA SE HOUVER A MUSICA, FALAR QUE JA EXISTE.!!!!!!!!!!!!!!!!
        console.log("2")


        const [thisMusicExists] = await connection('MUSIC')
            .where({ music_title })
        if (thisMusicExists) {
            res.statusCode = 409
            throw new Error("This music already exists")
        }
        console.log("3")


        //TESTARRRRRR O GENDERSSSS  VER SE EXISTE
        const [allGenresForTest] = await connection('GENRE').select() 
        console.log(allGenresForTest)
        const [thisGenreExists] = await connection('GENRE')
            .where({ genre_id })
        if (!thisGenreExists) {
            res.statusCode = 409
            throw new Error("This GENRE doesn't exist")
        }

        console.log("4")

        // for (let genre of genre_id) {
            let insertResult = await connection.raw(`
            INSERT INTO MUSIC_GENRES 
            ( related_music_id,related_genre_id )
            VALUES ("${album_id}","${genre_id}")
            `)
        // }
        console.log('result::::::::::::::;',insertResult)

        console.log("5")

        const token = getTokenData(authorization)
        const music_user = token.id
        let music_id = generateId()
        let date = new Date().toISOString().slice(0, 10)



        const [result] = await connection.raw(`
       INSERT INTO MUSIC (music_id,music_title,music_author,date,music_file,music_album_id,music_user) 
       VALUES ("${music_id}","${music_title}","${music_author}","${date}","${music_file}","${album_id}","${music_user}");`)
       console.log('RESULT DA CREATE: ',result)
       res.status(200).send({
            message: "music created",

        })
    } catch (error) {
        res.send(error.message || error.sqlMessage)
    }
}