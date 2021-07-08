export type user = {
    id: string,
    name: string,
    password: string,
    nickname:string,
    email: string,
    avatar?:string
 }
 
 export type newUser = {
    name: string,
    email: string,
    password: string
 }