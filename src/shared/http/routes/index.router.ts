import {Router, Request, Response} from 'express'

import productRouter from "../routes/products.router"
const router = Router()

router.use('/product', productRouter)

router.get("/", (req: Request, res: Response) => {
    res.status(200).json({message: "Hello dev"})
})

export default router