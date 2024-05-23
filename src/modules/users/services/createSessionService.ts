import { getCustomRepository } from "typeorm"
import UserRepository from "../typeorm/repositories/user.repository"
import AppError from "shared/errors/error"
import bcrypt from 'bcrypt'
import User from "../typeorm/entities/users"
import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const SECRET = process.env.SECRET as string

if (!SECRET) {
    throw new Error("SECRET is not defined in the environment variables");
}

interface IRequest {
    email: string
    pass: string
}

interface IResponse {
    token: string
    exp: number

}

class CreateSessionService {
    private readonly repository

    constructor() {
        this.repository = getCustomRepository(UserRepository)
    }

    public async execute({ email, pass }: IRequest): Promise<IResponse> {
        // find user by email
        const user = await this.repository.findByEmail(email)

        // verify if user exists
        if (!user) throw new AppError('Credentials not valid!', 401)

        // verify if correct password
        const isPasswordValid = await bcrypt.compare(pass, user.password)
        if (!isPasswordValid) throw new AppError('Credentials not valid', 401)

        // generate token
        const payload = {
            id: user.id,
            email: user.email
        }
        const token = JWT.sign(payload, SECRET, {
            subject: user.id,
            expiresIn: Math.floor(Date.now() / 1000) + (60 * 60)
        })

        const response: IResponse = {
            token: token,
            exp: Math.floor(Date.now() / 1000) + (60 * 60)
        }
        return response
    }
}

export default CreateSessionService
