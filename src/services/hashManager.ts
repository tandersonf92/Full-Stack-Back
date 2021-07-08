import { compareSync, genSaltSync, hashSync } from "bcryptjs"

export const createHash = (textId: string): string => {
    const salt: string = genSaltSync(12)
    const hash: string = hashSync(textId, salt)
    return hash
}

export const compareHash = (textId: string, cypherId: string): boolean => {
    return compareSync(textId, cypherId)
}