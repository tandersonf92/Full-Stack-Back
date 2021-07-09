import { Router } from "express";
import createGenre from "../endpoints/createGenre";
import createMusic from "../endpoints/createMusic";
import getAllGenres from "../endpoints/getAllGenres";
import getAllMusics from "../endpoints/getAllMusics";
import getMusicById from "../endpoints/getMusicById";
import searchMusicByAuthor from "../endpoints/searchMusicByAuthor";
import searchMusicByTitle from "../endpoints/searchMusicByTitle";




export const musicRouter = Router()



musicRouter.post('/createGenre',createGenre)
musicRouter.post('/createMusic',createMusic)

musicRouter.get('/genre',getAllGenres)
musicRouter.get('/all',getAllMusics)
musicRouter.get('/:music_id',getMusicById)
musicRouter.get('/search-by-title',searchMusicByTitle)
musicRouter.get('/search-by-author',searchMusicByAuthor)
