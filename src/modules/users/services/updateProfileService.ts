import { getCustomRepository } from "typeorm"
import UserRepository from "../typeorm/repositories/user.repository"
import AppError from "shared/errors/error"
import User from "../typeorm/entities/users"
import bcrypt from 'bcrypt'

interface IRequest {
    id: string
    name: string,
    email: string,
    password: string
    old_password: string
}

class UpdateProfileService {

    private readonly repository

    constructor() {
        this.repository = getCustomRepository(UserRepository)
    }

    public async execute({ name, email, password, id, old_password }: IRequest): Promise<User> {
        let user = await this.repository.findById(id)
        // verify if user already exists
        if (!user) throw new AppError('User not exist!')

        // verify if old password is equal than stored password
        if (!await bcrypt.compare(old_password, user.password)) throw new AppError('Your old password is incorrect!', 400)


        // verify if email is the same email
        const updatedEmail = await this.repository.findByEmail(email)
        if (updatedEmail && user.id !== id) throw new AppError('You cannot update user with data!', 400)

        // hash password
        const new_password: string = await bcrypt.hash(password, 10)

        user = { ...user, name, email, password: new_password }

        await this.repository.update(id, user)

        return user

    }
}

export default UpdateProfileService