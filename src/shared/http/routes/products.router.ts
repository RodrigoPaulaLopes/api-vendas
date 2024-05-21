import {Router, Request, Response} from 'express'

import ProductController from 'modules/products/controller/ProductController'

const productController = new ProductController()

const router = Router()

router.get('/index', productController.index)
router.get('/show/:id', productController.show)
router.post('/create', productController.create)
router.put('/update/:id', productController.update)
router.delete('/delete/:id', productController.delete)

export default router