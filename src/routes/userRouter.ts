import { Router } from "express";
import getUserAlbums from "../endpoints/getUserAlbums";
import { login } from "../endpoints/login";
import { signUp } from "../endpoints/signup";
import updateAvatar from "../endpoints/updateAvatar";


export const userRouter = Router()


userRouter.post('/login',login)
userRouter.post('signup',signUp)

userRouter.get('/albums',getUserAlbums)
userRouter.put('/user/avatar',updateAvatar)