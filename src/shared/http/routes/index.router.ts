import {Router, Request, Response} from 'express'

import productRouter from "../routes/products.router"
import userRouter from '../routes/users.router'
import customerRouter from '../routes/customer.router'
import authRouter from '../routes/auth.router'
import IsAuthenticated from 'modules/users/middlewares/isAuthenticated.middleware'
import forgotRouter from './password.router'
import profileRouter from './profile.router'
import orderRouter from './order.router'

const router = Router()
const isAuthenticated = new IsAuthenticated()

router.use('/product', isAuthenticated.execute, productRouter)
router.use('/user', userRouter)
router.use('/customer', isAuthenticated.execute, customerRouter)
router.use('/auth', authRouter)
router.use('/password', forgotRouter)
router.use('/order', isAuthenticated.execute, orderRouter)

router.use('/profile', isAuthenticated.execute, profileRouter)

router.get("/", (req: Request, res: Response) => {
    res.status(200).json({message: "Hello dev"})
})

export default router