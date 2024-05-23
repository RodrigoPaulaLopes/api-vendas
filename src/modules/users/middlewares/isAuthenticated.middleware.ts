import { NextFunction, Request, Response } from "express";
import ShowUserService from "../services/showUserService";
import AppError from "shared/errors/error";
import jwt, { JsonWebTokenError, VerifyErrors } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const SECRET = process.env.SECRET as string

class IsAuthenticated {

    async execute(req: Request, res: Response, next: NextFunction) {

        const findUserById = new ShowUserService()

        // take the authorization header
        const [prefix, token] = req.headers.authorization?.split(" ") as string[]

        // verify prefix
        if (prefix !== 'Bearer') throw new AppError('Invalid prefix token', 401)

        // verify token
        try {

            const payload = jwt.verify(token, SECRET)
            const id = payload.sub as string

            // find user by id
            const user = await findUserById.execute({ id })

            req.user = {
                id: user.id
            }

            return next()
        } catch {
            throw new AppError('Invalid token!', 401)
        }
    }
}

export default IsAuthenticated