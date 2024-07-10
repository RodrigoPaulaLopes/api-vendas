import { getCustomRepository } from "typeorm"
import AppError from "shared/errors/error"
import OrderRepository from "../typeorm/repositories/orders.repository"
import CustomerRepository from "modules/customers/typeorm/repositories/customer.repository"
import ProductRepository from "modules/products/typeorm/repositories/products.repository"
import Customer from "modules/customers/typeorm/entities/Customers"
import Product from "modules/products/typeorm/entities/product"


interface IProduct {
    id: string,
    quantity: number

}
interface IRequest {
    customer_id: string,
    products: IProduct[]

}

class CreateOrderService {

    private readonly orderRepository
    private readonly customerRepository
    private readonly productRepository

    constructor() {
        this.orderRepository = getCustomRepository(OrderRepository)
        this.customerRepository = getCustomRepository(CustomerRepository)
        this.productRepository = getCustomRepository(ProductRepository)
    }
    async execute({ customer_id, products }: IRequest) {

        const customer: Customer | undefined = await this.customerRepository.findById(customer_id)

        if (!customer) throw new AppError("Could not find any customer with id", 404)

        const existsProducts: Product[] = await this.productRepository.findAllById(products)

        if (!existsProducts.length) throw new AppError("Could not find any products with ids", 404)

        const existsProductsId = existsProducts.map(products => products.id)

        const checkInexstentsProducts = products.filter(product => !existsProductsId.includes(product.id))

        if (!checkInexstentsProducts.length) throw new AppError(`Could not find product with id ${checkInexstentsProducts[0].id}`, 404)

        const quantityAvailable = products.filter(product => existsProducts.filter(p => p.id === product.id)[0].quantity < product.quantity)

        if (!quantityAvailable.length) throw new AppError(`The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}`, 400)


        const serializedProducts = products.map(product =>
        ({
            product_id: product.id,
            quantity: product.quantity,
            price: existsProducts.filter(p => p.id === product.id)[0].price
        })
        )

        const order = await this.orderRepository.createOrder({ customer: customer, products: serializedProducts })

        const { orders_products } = order

        const updateProductQuantity = orders_products.map(product => 
            ({
                 id: product.id, 
                 quantity: existsProducts.filter(p => p.id === product.id)[0].quantity - product.quantity,

                })
            )
        await this.productRepository.save(updateProductQuantity)

        return order
    }
}

export default CreateOrderService