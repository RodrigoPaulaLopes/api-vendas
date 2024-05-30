import { getCustomRepository } from "typeorm"
import UserRepository from "../typeorm/repositories/user.repository"
import AppError from "shared/errors/error"
import User from "../typeorm/entities/users"
import bcrypt from 'bcrypt'
import UserTokenRepository from "../typeorm/repositories/user_tokens.repository"

interface IRequest {
    email: string,

}

class SendForgotPasswordEmailService {

    private readonly userRepository
    private readonly userTokenRepository

    constructor() {
        this.userRepository = getCustomRepository(UserRepository)
        this.userTokenRepository = getCustomRepository(UserTokenRepository)
    }

    public async execute({ email }: IRequest): Promise<void> {

        const user = await this.userRepository.findByEmail(email)
        
        // verify if user exists with email
        if (!user) throw new AppError('User does not exists!', 404)



        const token = this.userTokenRepository.generate(user.id as string)

        console.log(token)

    }
}

export default SendForgotPasswordEmailService