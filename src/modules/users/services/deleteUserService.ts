import { getCustomRepository } from "typeorm"
import UserRepository from "../typeorm/repositories/user.repository"
import AppError from "shared/errors/error"
import User from "../typeorm/entities/users"
import bcrypt from 'bcrypt'

interface IRequest{
    id: string,
    
}

class DeleteUserService {

    private readonly repository

    constructor(){
        this.repository = getCustomRepository(UserRepository)
    }

    public async execute({id}: IRequest) : Promise<void> {
        const user = await this.repository.findById(id)
        // verify if user not exists
        if(!user) throw new AppError('User not exist!')
        
        await this.repository.delete(id)
    }
}

export default DeleteUserService