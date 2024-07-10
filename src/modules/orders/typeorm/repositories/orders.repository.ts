import { EntityRepository, Repository } from "typeorm";
import Order from "../entities/Order";
import Customer from "modules/customers/typeorm/entities/Customers";

interface IProduct {
    product_id: string,
    price: number,
    quantity: number
}
interface IRequest {
    customer: Customer
    products: IProduct[]
}
@EntityRepository(Order)
class OrderRepository extends Repository<Order> {

    public async findByID(id: string): Promise<Order | undefined> {
        const order = await this.findOne(id, { relations: ['orders_products', 'customer'] })

        return order
    }


    public async createOrder({customer, products} : IRequest) {
        const order = this.create({customer: customer, orders_products: products})
        await this.save(order)
    }
}

export default OrderRepository