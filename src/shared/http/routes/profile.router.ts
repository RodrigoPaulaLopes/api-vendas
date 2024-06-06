import {Router, Request, Response} from 'express'
import {celebrate, Joi, Segments } from 'celebrate'
import UserController from 'modules/users/controller/user.controller'
import ProfileController from 'modules/users/controller/profile.controller'


const router = Router()

const profileController = new ProfileController()

router.put('/update', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        old_password: Joi.string().required(),
    },
}), profileController.update)


router.get('/show', profileController.show)



export default router