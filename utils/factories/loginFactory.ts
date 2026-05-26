import { DataFactory } from "../DataFactory"
import { LoginRequest } from "../../types/api/auth.types"


const LOGIN_DEFAULTS ={
    email: 'eve.holt@reqres.in',
    password: 'cityslicka'
} as const

export const loginFactory = new DataFactory<LoginRequest>(LOGIN_DEFAULTS)
