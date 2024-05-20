import { getCustomRepository } from "typeorm"
import ProductRepository from "../typeorm/repositories/products_repository"
import AppError from "shared/errors/error"

interface IRequest {
    name: string,
    price: number
    quantity: number
}

class CreateProductService{


    async execute({name, price, quantity}: IRequest){
        const repository = getCustomRepository(ProductRepository)

        if (await repository.findByName(name)) throw new AppError("Product already exists!", 400)

        const product = await repository.create({name, price, quantity})


        return await repository.save(product)
    }
}

export default CreateProductService