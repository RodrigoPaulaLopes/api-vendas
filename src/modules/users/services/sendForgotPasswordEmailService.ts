import { getCustomRepository } from "typeorm"
import UserRepository from "../typeorm/repositories/user.repository"
import AppError from "shared/errors/error"
import path from 'path';
import UserTokenRepository from "../typeorm/repositories/user_tokens.repository"
import EtherealMail from '../../../config/mail/EtherealMail'

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



        const token = await this.userTokenRepository.generate(user.id as string)

        const forgotPasswordTemplate = path.resolve(
            __dirname,
            '..',
            'views',
            'forgot_password.hbs',
          );
        await EtherealMail.sendMail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: '[API Vendas] Recuperação de Senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    token: token,
                    link: `http://localhost:3000/reset_password?token=${token}`,
                },
            },
        });
    }

}


export default SendForgotPasswordEmailService