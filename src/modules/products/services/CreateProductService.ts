import { getCustomRepository } from "typeorm"
import ProductRepository from "../typeorm/repositories/products.repository"
import AppError from "shared/errors/error"
import RedisCache from "shared/cache/RedisCache"

interface IRequest {
    name: string,
    price: number
    quantity: number
}

class CreateProductService{

    private readonly repository
    private readonly cache

    constructor(){
        this.repository = getCustomRepository(ProductRepository)
        this.cache = new RedisCache()
    }
    async execute({name, price, quantity}: IRequest){

        if (await this.repository.findByName(name)) throw new AppError("Product already exists!", 400)

        const product = await this.repository.create({name, price, quantity})

        await this.cache.invalidate('products')
        
        return await this.repository.save(product)
    }
}

export default CreateProductService