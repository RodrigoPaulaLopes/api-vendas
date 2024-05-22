import { getCustomRepository } from "typeorm"
import ProductRepository from "../typeorm/repositories/products.repository"
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
    id: string,
    name: string,
    price: number
    quantity: number

}
class UpdateProductService{
    private readonly repository

    constructor(){
        this.repository = getCustomRepository(ProductRepository)
    }

    async execute({id, name, price, quantity}: IRequest){

 
        let product = await this.repository.findOne(id)

        if(!product) throw new AppError('product not found', 404)

        if(product.name === name) throw new AppError('product already exists!', 400)

        product = {...product, name, price, quantity}

        this.repository.update(id, product)
        
        return product
    }
}

export default UpdateProductService