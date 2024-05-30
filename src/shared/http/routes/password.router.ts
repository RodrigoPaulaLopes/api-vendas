import {Router, Request, Response} from 'express'
import {celebrate, Joi, Segments } from 'celebrate'
import ForgotPasswordController from 'modules/users/controller/forgot_password.controller'

const forgotPassowrdController = new ForgotPasswordController()

const router = Router()


router.post('/forgot', celebrate({
    [Segments.BODY]: {
        email: Joi.string().required()
    }
}), forgotPassowrdController.create)




export default router