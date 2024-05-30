
import { Request, Response } from 'express'
import SendForgotPasswordEmailService from '../services/sendForgotPasswordEmailService'


class ForgotPasswordController {


    async create(req: Request, res: Response) {

        const { email } = req.body
        const forgotPasswordService = new SendForgotPasswordEmailService()

        await forgotPasswordService.execute({ email })
        
        return res.status(204).json()
    }
}

export default ForgotPasswordController