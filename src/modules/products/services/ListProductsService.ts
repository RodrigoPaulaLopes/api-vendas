import { getCustomRepository } from "typeorm"
import ProductRepository from "../typeorm/repositories/products_repository"

interface IResponse {
    id: string
    name: string,
    price: number
    quantity: number
    createdAt: Date,
    updatedAt: Date
}

class ListProductsService{
    private readonly repository

    constructor(){
        this.repository = getCustomRepository(ProductRepository)
    }
    async execute(){
        return await this.repository.find()
    }
}

export default ListProductsService