// src/__tests__/userCreateService.test.ts
import CreateCustomerService from '../services/createCustomerService';
import { Column, Entity, getRepository, getCustomRepository, Repository } from 'typeorm';

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

describe('CreateCustomerService', () => {
  let customerRepository: any;
  let createCustomerService: CreateCustomerService;

  beforeEach(() => {
    customerRepository = {
      create: jest.fn(),
      save: jest.fn(),
      findByEmail: jest.fn(),
    };
    (getCustomRepository as jest.Mock).mockReturnValue(customerRepository);
    createCustomerService = new CreateCustomerService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create and save a new customer', async () => {
    const customerData = { name: 'John Doe', email: 'john.doe@example.com' };
    const createdCustomer = { ...customerData, id: '25882f28-252d-41fd-b231-b24cdd7afbb6' };

    customerRepository.findByEmail.mockReturnValue(null);
    customerRepository.create.mockReturnValue(createdCustomer);
    customerRepository.save.mockResolvedValue(createdCustomer);

    const result = await createCustomerService.execute(customerData);

    expect(customerRepository.create).toHaveBeenCalledWith(customerData);
    expect(customerRepository.save).toHaveBeenCalledWith(createdCustomer);
    expect(result).toEqual(createdCustomer);
  });
});
