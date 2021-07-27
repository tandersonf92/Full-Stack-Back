import { config } from "dotenv";
import * as jwt from "jsonwebtoken"


config()

export type authenticationData = {
    id: string
}

export function generateToken(id: string): string {

    return jwt.sign(
        {
            id
        }
        ,
        process.env.JWT_KEY!,
        {
            expiresIn: "20d"
        }
    )
}



export function getTokenData(token: string): authenticationData {
    const result = jwt.verify(
        token,
        process.env.JWT_KEY!
    ) as authenticationData
    return result
}