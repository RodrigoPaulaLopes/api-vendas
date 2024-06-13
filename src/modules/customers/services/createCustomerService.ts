import { getCustomRepository } from "typeorm"
import customerRepository from "../typeorm/repositories/customer.repository"
import AppError from "shared/errors/error"
import Customer from "../typeorm/entities/Customers"

interface IRequest{
    name: string,
    email: string,
}

class CreateCustomerService {

    private readonly repository

    constructor(){
        this.repository = getCustomRepository(customerRepository)
    }

    public async execute({name, email}: IRequest) : Promise<Customer> {

        // verify if customer already exists
        if(await this.repository.findByEmail(email)) throw new AppError('Customer already exist!')

        // hash password

        const customer = await this.repository.create({name, email})
        return await this.repository.save(customer)
    }
}

export default CreateCustomerService