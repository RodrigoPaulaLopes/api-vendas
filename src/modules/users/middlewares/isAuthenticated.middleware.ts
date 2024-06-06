import { NextFunction, Request, Response } from "express";
import ShowUserService from "../services/showUserService";
import AppError from "shared/errors/error";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const SECRET = process.env.SECRET as string

class IsAuthenticated {
    async execute(req: Request, res: Response, next: NextFunction) {
        try {
            const showUserService = new ShowUserService();
            // take the authorization header
            const [prefix, token] = req.headers.authorization?.split(" ") || [];
            
            if (!token) {
                throw new AppError('Token not provided', 401);
            }

            // verify prefix
            if (prefix !== 'Bearer') {
                throw new AppError('Invalid prefix token', 401);
            }

            // verify token
            const payload = jwt.verify(token, SECRET) as { sub: string };
            console.log(`JWT Payload: ${JSON.stringify(payload)}`);
            const id = payload.sub;
            if (!id) {
                throw new AppError('Token payload invalid', 401);
            }

            // find user by id
            const user = await showUserService.execute({ id });
;

            req.user = {
                id: user.id as string
            };

            return next();
        } catch (error) {
            console.error(`Authentication error: ${error.message}`);
            return res.status(401).json({ status: 'error', message: error.message });
        }
    }
}

export default IsAuthenticated;
