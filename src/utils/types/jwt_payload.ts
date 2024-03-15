import { Role } from "../enums/role.enum"

export interface JWTPayload {
    id: number
    uuid: string
    name: string
    surname: string
    email: string
    role: string
}