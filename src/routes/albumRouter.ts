import { Router } from "express"
import createAlbum from "../endpoints/createAlbum"
import updateAlbumCover from "../endpoints/updateAlbumCover"



export const albumRouter = Router()


albumRouter.post('/createAlbum',createAlbum)
albumRouter.put('/:album_id',updateAlbumCover)