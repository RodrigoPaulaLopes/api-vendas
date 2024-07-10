import { getCustomRepository } from "typeorm"
import customerRepository from "../typeorm/repositories/customer.repository"
import AppError from "shared/errors/error"



interface IRequest{
    id: string,
    
}

class DeleteCustomerService {

    private readonly repository

    constructor(){
        this.repository = getCustomRepository(customerRepository)
    }

    public async execute({id}: IRequest) : Promise<void> {
        const customer = await this.repository.findById(id)
        // verify if customer not exists
        if(!customer) throw new AppError('customer not exist!')
        
        await this.repository.delete(id)
    }
}

export default DeleteCustomerService