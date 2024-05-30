import {Router, Request, Response} from 'express'

import productRouter from "../routes/products.router"
import userRouter from '../routes/users.router'
import authRouter from '../routes/auth.router'
import IsAuthenticated from 'modules/users/middlewares/isAuthenticated.middleware'
const router = Router()
const isAuthenticated = new IsAuthenticated()

router.use('/product', isAuthenticated.execute, productRouter)
router.use('/user', userRouter)
router.use('/auth', authRouter)

router.get("/", (req: Request, res: Response) => {
    res.status(200).json({message: "Hello dev"})
})

export default router