import { getCustomRepository } from "typeorm"
import UserRepository from "../typeorm/repositories/user.repository"
import AppError from "shared/errors/error"
import User from "../typeorm/entities/users"
import path from 'path'
import fs from 'fs'
import uploadConfig from '../../../config/upload'

interface IRequest {
    avatarFileName: string,
    user_id: string
}

class UpdateUserAvatarService {

    private readonly repository

    constructor() {
        this.repository = getCustomRepository(UserRepository)
    }

    public async execute({ avatarFileName, user_id }: IRequest): Promise<User> {
        const user = await this.repository.findById(user_id)

        if (!user) {
            throw new AppError('User not exists!', 404)
        }

        if (user.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
            
            try {
                await fs.promises.stat(userAvatarFilePath)
                await fs.promises.unlink(userAvatarFilePath)
            } catch (error) {
                // Se o erro for diferente de 'ENOENT', relançar o erro
                if (error.code !== 'ENOENT') {
                    throw new AppError('An error occurred while deleting the old avatar!', 500)
                }
            }
        }

        user.avatar = avatarFileName
        await this.repository.save(user)

        return user
    }
}

export default UpdateUserAvatarService
