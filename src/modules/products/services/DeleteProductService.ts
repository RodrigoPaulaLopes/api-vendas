import { getCustomRepository } from "typeorm"
import ProductRepository from "../typeorm/repositories/products.repository"
import AppError from "shared/errors/error"
import RedisCache from "shared/cache/RedisCache"

interface IResponse {
    id: string
    name: string,
    price: number
    quantity: number
    createdAt: Date,
    updatedAt: Date
}

interface IRequest {
    id: string
}
class DeleteProductService{

    private readonly repository
    private readonly cache

    constructor(){
        this.repository = getCustomRepository(ProductRepository)
        this.cache = new RedisCache()
    }
    async execute({id}: IRequest){
    
        const product = await this.repository.findOne(id)

        if(!product) throw new AppError('product not found', 404)
            await this.cache.invalidate('products')
        const response = await this.repository.delete(id)
        return response

    }
}

export default DeleteProductService