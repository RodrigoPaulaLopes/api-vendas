import {Router, Request, Response} from 'express'
import ProductRepository from 'modules/products/typeorm/repositories/products_repository'
import { getCustomRepository } from 'typeorm'



const router = Router()

router.get('/', async (request: Request, response: Response) => {

  
    return response.status(200).json({message: 'hello dev'})
})

export default router