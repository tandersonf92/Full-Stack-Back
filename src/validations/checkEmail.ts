import { Request, Response } from "express"


export function checkEmail(email: string): void {

    let check = 0
    for (let i = 0; i < email.length; i++) {
        if (email.charAt(i) === "@")
            check++
    }
    if (!check) {
        throw new Error("Formato incorreto, faltou o @")
    }
    if (check > 1) {
        throw new Error("Formato incorreto, 2 ou mais @ encontrados.")
    }

}