import { getCustomRepository } from "typeorm"
import UserRepository from "../typeorm/repositories/user.repository"
import AppError from "shared/errors/error"
import User from "../typeorm/entities/users"
import bcrypt from 'bcrypt'


class ListUserService {

    private readonly repository

    constructor(){
        this.repository = getCustomRepository(UserRepository)
    }

    public async execute() : Promise<User[]> {
        return await this.repository.find()
    }
}

export default ListUserService