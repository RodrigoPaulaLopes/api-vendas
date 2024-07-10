import { getCustomRepository } from "typeorm"
import customerRepository from "../typeorm/repositories/customer.repository"
import AppError from "shared/errors/error"
import Customer from "../typeorm/entities/Customers"

interface IRequest {
    id: string
    name: string,
    email: string,

}

class UpdateCustomerService {

    private readonly repository

    constructor() {
        this.repository = getCustomRepository(customerRepository)
    }

    public async execute({ name, email, id }: IRequest): Promise<Customer> {
        let customer = await this.repository.findById(id)
        // verify if customer already exists
        if (!customer) throw new AppError('customer not exist!')

        // verify if email is the same email
        if (await this.repository.findByEmail(email)) throw new AppError('You cannot update customer with data!')

        customer = { ...customer, name, email }
        
        await this.repository.update(id, customer)

        return customer

    }
}

export default UpdateCustomerService