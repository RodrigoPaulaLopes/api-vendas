import { Column, Entity, getRepository, Repository, getCustomRepository } from "typeorm"
import ListCustomerService from "./listCustomerService";
import CustomerRepository from "../typeorm/repositories/customer.repository";
import Customer from "../typeorm/entities/Customers";


// basicamente mockar todo o typeorm que você estiver usando no repository
jest.mock('typeorm', () => {
    return {
        Entity: jest.fn(),
        Column: jest.fn(),
        CreateDateColumn: jest.fn(),
        UpdateDateColumn: jest.fn(),
        PrimaryGeneratedColumn: jest.fn(),
        EntityRepository: jest.fn(),
        Repository: jest.fn(),
        getRepository: jest.fn(),
        getCustomRepository: jest.fn(),
    };
});



describe("List Customer service ", () => {


    const mock: Customer[] = [ {
        id: "asdasdasd",
        name: "test",
        email: "test@email.com"
    }] 

    // mockar o repository e pegar partes das funções de repositorio do customer
    let customerRepository: jest.Mocked<Partial<Repository<Customer>>>
    let listCustomerService: ListCustomerService 

    beforeEach(() => {
        // mockar as funções do repository
        customerRepository = {
            find: jest.fn()
          };
        
          (getCustomRepository as jest.Mock).mockReturnValue(customerRepository)
          listCustomerService = new ListCustomerService()
    })
    it('Should return a list of users', async () => {

       (customerRepository.find as jest.Mock).mockResolvedValue(mock)

       const customers = await listCustomerService.execute()

       expect(customers).toEqual(mock)
       expect(customers.length).toEqual(1)
    })
})