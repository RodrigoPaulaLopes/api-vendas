
import { Request, Response } from 'express'
import SendForgotPasswordEmailService from '../services/sendForgotPasswordEmailService'
import ResetPasswordService from '../services/resetPasswordService'


class ResetPasswordController {


    async create(req: Request, res: Response) {

        const { token, password } = req.body
        const forgotPasswordService = new ResetPasswordService()

        await forgotPasswordService.execute({ token, password })
        
        return res.status(204).json()
    }
}

export default ResetPasswordController