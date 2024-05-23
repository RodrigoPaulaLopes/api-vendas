
import { Request, Response } from 'express'
import CreateSessionService from '../services/createSessionService'


class AuthController {


    async login(req: Request, res: Response) {

        const { email, pass } = req.body
        const authService = new CreateSessionService()

        return res.status(200).json(await authService.execute({ email, pass }))
    }
}

export default AuthController