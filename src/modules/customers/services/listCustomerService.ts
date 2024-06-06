import { getCustomRepository } from "typeorm"
import CustomerRepository from "../typeorm/repositories/customer.repository"
import Customer from "../typeorm/entities/Customers"


class ListCustomerService {

    private readonly repository

    constructor(){
        this.repository = getCustomRepository(CustomerRepository)
    }

    public async execute() : Promise<Customer[]> {
        return await this.repository.find()
    }
}

export default ListCustomerService