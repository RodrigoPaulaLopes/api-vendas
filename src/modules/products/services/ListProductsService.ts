import { getCustomRepository } from "typeorm"
import ProductRepository from "../typeorm/repositories/products.repository"
import RedisCache from "shared/cache/RedisCache"
import Product from "../typeorm/entities/product"
interface IResponse {
    id: string
    name: string,
    price: number
    quantity: number
    createdAt: Date,
    updatedAt: Date
}

class ListProductsService {
    private readonly repository
    private readonly cache

    constructor() {
        this.repository = getCustomRepository(ProductRepository)
        this.cache = new RedisCache()
    }
    async execute() {

        let products: Product[] | null = await this.cache.recover<Product[]>('products')

        if (!products) {

            products = await this.repository.find()
            await this.cache.save("products", products)
        }
        return products
    }
}

export default ListProductsService