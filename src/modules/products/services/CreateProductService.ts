import { getCustomRepository } from "typeorm"
import ProductRepository from "../typeorm/repositories/products.repository"
import AppError from "shared/errors/error"

interface IRequest {
    name: string,
    price: number
    quantity: number
}

class CreateProductService{

    private readonly repository

    constructor(){
        this.repository = getCustomRepository(ProductRepository)
    }
    async execute({name, price, quantity}: IRequest){

        if (await this.repository.findByName(name)) throw new AppError("Product already exists!", 400)

        const product = await this.repository.create({name, price, quantity})


        return await this.repository.save(product)
    }
}

export default CreateProductService