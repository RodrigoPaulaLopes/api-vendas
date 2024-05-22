import {Router, Request, Response} from 'express'

import ProductController from 'modules/products/controller/ProductController'
import {celebrate, Joi, Segments } from 'celebrate'
const productController = new ProductController()

const router = Router()

router.get('/index', productController.index)
router.get('/show/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
    }
}), productController.show)
router.post('/create', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        price: Joi.number().positive().required().min(0.1),
        quantity: Joi.number().integer().required().min(1).positive()
    }
}),productController.create)
router.put('/update/:id',celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        price: Joi.number().positive().required().min(0.1).precision(2),
        quantity: Joi.number().integer().required().min(1).positive()
    },
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
    }
}), productController.update)
router.delete('/delete/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
    }
}), productController.delete)

export default router