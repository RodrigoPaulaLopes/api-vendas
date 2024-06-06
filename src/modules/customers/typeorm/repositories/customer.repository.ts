import User from "modules/users/typeorm/entities/users";
import { EntityRepository, Repository } from "typeorm";
import Customer from "../entities/Customers";



@EntityRepository(Customer)
export default class CustomerRepository extends Repository<User> {
    public async findByEmail(email: string): Promise<Customer | undefined> {
        const customer = await this.findOne({ where: { email: email } })
        return customer
    }
    public async findByName(name: string): Promise<Customer | undefined> {
        const customer = await this.findOne({ where: { name: name } })
        return customer
    }
    public async findById(id: string): Promise<Customer | undefined> {
        return this.findOne(id);
    }
}