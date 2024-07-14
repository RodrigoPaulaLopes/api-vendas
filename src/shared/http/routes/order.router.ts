import {Router} from 'express'
import {celebrate, Joi, Segments } from 'celebrate'

import OrderController from 'modules/orders/controller/order.controller'

const orderController = new OrderController()

const router = Router()


router.post('/create', celebrate({
    [Segments.BODY]: {
        customer_id: Joi.string().uuid().required(),
        products: Joi.required()
    }
}), orderController.create)

router.get('/show/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
    }
}), orderController.show)




export default router