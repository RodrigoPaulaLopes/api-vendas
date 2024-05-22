import { getCustomRepository } from "typeorm"
import UserRepository from "../typeorm/repositories/user.repository"
import AppError from "shared/errors/error"
import User from "../typeorm/entities/users"
import bcrypt from 'bcrypt'

interface IRequest{
    name: string,
    email: string,
    pass: string
}

class CreateUserService {

    private readonly repository

    constructor(){
        this.repository = getCustomRepository(UserRepository)
    }

    public async execute({name, email, pass}: IRequest) : Promise<User> {

        // verify if user already exists
        if(await this.repository.findByEmail(email)) throw new AppError('User already exist!')

        // hash password
        const password: string = await bcrypt.hash(pass, 10)

        const user = await this.repository.create({name, email, password})
        return await this.repository.save(user)
    }
}

export default CreateUserService