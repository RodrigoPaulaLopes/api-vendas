import {Router, Request, Response} from 'express'
import multer from 'multer'
import uploadConfig from '../../../config/upload'
import {celebrate, Joi, Segments } from 'celebrate'
import CustomerController from '../../../modules/customers/controllers/customer.controller'
import IsAuthenticated from 'modules/users/middlewares/isAuthenticated.middleware'
const customerController = new CustomerController()

const router = Router()

const isAuthenticated = new IsAuthenticated()

router.post('/create', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().required(),
    }
}), customerController.create)

router.put('/update/:id', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().required(),
    },
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
    }
}), customerController.update)


router.get('/show/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
    }
}), customerController.show)
router.delete('/delete/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
    }
}), customerController.delete)
router.get('/index', customerController.index)


export default router