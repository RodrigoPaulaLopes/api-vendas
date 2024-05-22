import { getCustomRepository } from "typeorm"
import UserRepository from "../typeorm/repositories/user.repository"
import AppError from "shared/errors/error"
import User from "../typeorm/entities/users"
import bcrypt from 'bcrypt'

interface IRequest {
    id: string
    name: string,
    email: string,
    pass: string
}

class UpdateUserService {

    private readonly repository

    constructor() {
        this.repository = getCustomRepository(UserRepository)
    }

    public async execute({ name, email, pass, id }: IRequest): Promise<User> {
        let user = await this.repository.findById(id)
        // verify if user already exists
        if (!user) throw new AppError('User not exist!')

        // hash password
        const password: string = await bcrypt.hash(pass, 10)

        // verify if email is the same email
        if (await this.repository.findByEmail(email)) throw new AppError('You cannot update user with data!')

        user = { ...user, name, email, password }
        
        await this.repository.update(id, user)

        return user

    }
}

export default UpdateUserService