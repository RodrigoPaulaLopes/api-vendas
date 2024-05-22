import {Router, Request, Response} from 'express'

import ProductController from 'modules/products/controller/ProductController'
import {celebrate, Joi, Segments } from 'celebrate'
import UserController from 'modules/users/controller/user.controller'
const userController = new UserController()

const router = Router()


router.post('/create', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().required(),
        pass: Joi.string().required()
    }
}), userController.create)

router.put('/update/:id', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().required(),
        pass: Joi.string().required()
    },
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
    }
}), userController.update)

router.get('/show/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
    }
}), userController.show)
router.delete('/delete/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
    }
}), userController.delete)
router.get('/index', userController.index)


export default router