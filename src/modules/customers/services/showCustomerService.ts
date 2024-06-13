import { getCustomRepository } from "typeorm";
import AppError from "shared/errors/error";
import CustomerRepository from "../typeorm/repositories/customer.repository";
import Customer from "../typeorm/entities/Customers";


interface IRequest {
    id: string;
}

class ShowCustomerService {
    private readonly repository

    constructor() {
        this.repository = getCustomRepository(CustomerRepository);
    }

    public async execute({ id }: IRequest): Promise<Customer> {
        console.log(`Looking for customer with id: ${id}`);
        const customer = await this.repository.findById(id);
        console.log(`customer found in service: ${customer ? JSON.stringify(customer) : 'Not Found'}`);
        
        if (!customer) {
            throw new AppError('customer not exist!');
        }

        return customer;
    }
}

export default ShowCustomerService;
