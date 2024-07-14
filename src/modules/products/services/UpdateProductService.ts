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
    id: string,
    name: string,
    price: number
    quantity: number

}
class UpdateProductService {
    private readonly repository
    private readonly cache
    constructor() {
        this.repository = getCustomRepository(ProductRepository)
        this.cache = new RedisCache()
    }

    async execute({ id, name, price, quantity }: IRequest) {


        let product = await this.repository.findOne(id)

        if (!product) throw new AppError('product not found', 404)

        if (product.name === name) throw new AppError('product already exists!', 400)

        product = { ...product, name, price, quantity }
        
        await this.cache.invalidate('products')

        this.repository.update(id, product)

        return product
    }
}

export default UpdateProductService