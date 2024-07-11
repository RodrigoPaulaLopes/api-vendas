import { getCustomRepository, getRepository } from "typeorm"
import CustomerRepository from "../typeorm/repositories/customer.repository"
import Customer from "../typeorm/entities/Customers"

interface IPaginateCustomer {
    from: number;
    to: number;
    per_page: number;
    total: number;
    current_page: number;
    prev_page: number | null;
    next_page: number | null;
    data: Customer[];
  }

class ListCustomerService {

    private readonly repository

    constructor(){
        this.repository = getCustomRepository(CustomerRepository) 
    }

    public async execute() : Promise<IPaginateCustomer> {
        return await this.repository.find()
    }
}

export default ListCustomerService