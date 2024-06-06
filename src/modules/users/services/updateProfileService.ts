import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/user.repository";
import AppError from "shared/errors/error";
import User from "../typeorm/entities/users";
import bcrypt from 'bcrypt';

interface IRequest {
    id: string;
    name: string;
    email: string;
    password?: string; // Password pode ser opcional se o usuário não quiser atualizar
    old_password?: string;
}

class UpdateProfileService {
    private readonly repository;

    constructor() {
        this.repository = getCustomRepository(UserRepository);
    }

    public async execute({ id, name, email, password, old_password }: IRequest): Promise<User> {
        const user = await this.repository.findById(id) as User

        if (!user) throw new AppError('User not exist!');

        if (old_password) {
            // Verifica se a old_password foi passada
            const comparedPass = await bcrypt.compare(old_password, user.password);
            if (!comparedPass) throw new AppError('Your old password is incorrect!', 400);

            if (password) {
                // Se a new password foi fornecida, hash a nova senha
                const new_password: string = await bcrypt.hash(password, 10);
                user.password = new_password;
            }
        }

        // Verifica se o e-mail já está em uso por outro usuário
        const updatedEmail = await this.repository.findByEmail(email);
        if (updatedEmail && updatedEmail.id !== id) throw new AppError('You cannot update user with this email!', 400);

        // Atualiza os outros campos do usuário
        user.name = name;
        user.email = email;

        await this.repository.save(user);

        return user;
    }
}

export default UpdateProfileService;
