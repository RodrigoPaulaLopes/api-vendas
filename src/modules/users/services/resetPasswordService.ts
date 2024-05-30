import { getCustomRepository } from "typeorm"
import UserRepository from "../typeorm/repositories/user.repository"
import AppError from "shared/errors/error"
import {isAfter, addHours} from 'date-fns'
import UserTokenRepository from "../typeorm/repositories/user_tokens.repository"
import {hash} from 'bcrypt'
interface IRequest {
    token: string,
    password: string

}

class ResetPasswordService {

    private readonly userRepository
    private readonly userTokenRepository

    constructor() {
        this.userRepository = getCustomRepository(UserRepository)
        this.userTokenRepository = getCustomRepository(UserTokenRepository)
    }

    public async execute({ token, password }: IRequest): Promise<void> {

        const userToken = await this.userTokenRepository.findByToken(token)


        // verify if token exists
        if (!userToken) throw new AppError('Token does not exists!', 404)


        // verify if user exists
        const user = await this.userRepository.findById(userToken.id as string)
        if (!user) throw new AppError('The user provide from token does not exists!', 404)

        // verify if token has been taken 2 hours


        const addedTwoHoursDate = addHours(new Date(user.created_at as Date), 2)


        if(isAfter(Date.now(), addedTwoHoursDate)) throw new AppError('Token expired!', 400)


        const hasPass: string = await hash(password, 10)
        user.password = hasPass


        this.userRepository.update(user.id as string, user)


    }
}

export default ResetPasswordService