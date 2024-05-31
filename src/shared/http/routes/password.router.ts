import {Router, Request, Response} from 'express'
import {celebrate, Joi, Segments } from 'celebrate'
import ForgotPasswordController from 'modules/users/controller/forgot_password.controller'
import ResetPasswordController from 'modules/users/controller/reset_password.controller'

const forgotPassowrdController = new ForgotPasswordController()
const resetPasswordController = new ResetPasswordController()

const router = Router()


router.post('/forgot', celebrate({
    [Segments.BODY]: {
        email: Joi.string().required()
    }
}), forgotPassowrdController.create)

router.post('/reset', celebrate({
    [Segments.BODY]: {
        token: Joi.string().uuid().required(),
        password: Joi.string().required(),
        confirm_password: Joi.string().required().valid(Joi.ref('password'))
    }
}), resetPasswordController.create)




export default router