import {Router, Request, Response} from 'express'

import productRouter from "../routes/products.router"
import userRouter from '../routes/users.router'
const router = Router()

router.use('/product', productRouter)
router.use('/user', userRouter)

router.get("/", (req: Request, res: Response) => {
    res.status(200).json({message: "Hello dev"})
})

export default router