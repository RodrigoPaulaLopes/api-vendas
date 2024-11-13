import { Column, Entity, getRepository, Repository, getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customers";
import ShowCustomerService from "./showCustomerService";
import CustomerRepository from "../typeorm/repositories/customer.repository"; // Importa o CustomerRepository

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

describe('ShowCustomerService', () => { 
    const mock: Customer =  {
        id: "asdasdasd",
        name: "test",
        email: "test@email.com"
    };

    let customerRepository: jest.Mocked<CustomerRepository>; 
    let showCustomerService: ShowCustomerService;

    beforeEach(() => {
        customerRepository = {
            findById: jest.fn(),
            findOne: jest.fn(),

        } as unknown as jest.Mocked<CustomerRepository>;

        (getCustomRepository as jest.Mock).mockReturnValue(customerRepository);
        showCustomerService = new ShowCustomerService();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return a customer with id", async () => {
        (customerRepository.findById as jest.Mock).mockResolvedValue(mock);

        const id = "asdasdasd";
        const customer = await showCustomerService.execute({ id });

        expect(customer).toEqual(mock);
        expect(customerRepository.findById).toHaveBeenCalledWith(id);
    });
});
