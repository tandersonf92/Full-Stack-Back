import { Router } from "express";
import createGenre from "../endpoints/createGenre";
import createMusic from "../endpoints/createMusic";
import getAllGenres from "../endpoints/getAllGenres";
import getAllMusics from "../endpoints/getAllMusics";
import getAllMusicsOfUser from "../endpoints/getAllMusicsOfUser";
import getMusicById from "../endpoints/getMusicById";
import getMusicByAlbum from "../endpoints/getMusicsByAlbum";
import searchMusicByAuthor from "../endpoints/searchMusicByAuthor";
import searchMusicByTitle from "../endpoints/searchMusicByTitle";




export const musicRouter = Router()



musicRouter.post('/createGenre',createGenre)
musicRouter.post('/createMusic',createMusic)

musicRouter.get('/genre',getAllGenres)
musicRouter.get('/all',getAllMusics)
musicRouter.get('/allOfUser',getAllMusicsOfUser)
musicRouter.get('/:music_id',getMusicById)
musicRouter.get('/album/:music_album_id',getMusicByAlbum)
musicRouter.get('/search-by-title',searchMusicByTitle)
musicRouter.get('/search-by-author',searchMusicByAuthor)
