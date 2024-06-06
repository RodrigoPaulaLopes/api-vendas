import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/user.repository";
import AppError from "shared/errors/error";
import User from "../typeorm/entities/users";

interface IRequest {
    id: string;
}

class ShowUserService {
    private readonly repository

    constructor() {
        this.repository = getCustomRepository(UserRepository);
    }

    public async execute({ id }: IRequest): Promise<User> {
        console.log(`Looking for user with id: ${id}`);
        const user = await this.repository.findById(id);
        console.log(`User found in service: ${user ? JSON.stringify(user) : 'Not Found'}`);
        
        if (!user) {
            throw new AppError('User not exist!');
        }

        return user;
    }
}

export default ShowUserService;
