import { getCustomRepository } from "typeorm"
import ProductRepository from "../typeorm/repositories/products_repository"
import AppError from "shared/errors/error"

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

    constructor(){
        this.repository = getCustomRepository(ProductRepository)
    }
    async execute({id}: IRequest){
    
        const product = await this.repository.findOne(id)

        if(!product) throw new AppError('product not found', 404)

        const response = await this.repository.delete(id)
        return response

    }
}

export default DeleteProductService