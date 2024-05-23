import {Router, Request, Response} from 'express'
import {celebrate, Joi, Segments } from 'celebrate'
import AuthController from 'modules/users/controller/auth.controller'

const authControoler = new AuthController()

const router = Router()


router.post('/login', celebrate({
    [Segments.BODY]: {
        pass: Joi.string().required(),
        email: Joi.string().required()
    }
}), authControoler.login)




export default router