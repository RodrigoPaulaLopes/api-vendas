import { getCustomRepository } from "typeorm"
import AppError from "shared/errors/error"
import OrderRepository from "../typeorm/repositories/orders.repository"
import Order from "../typeorm/entities/Order"


interface IRequest {
    id: string
}

class ShowOrderService {

    private readonly orderRepository

    constructor() {
        this.orderRepository = getCustomRepository(OrderRepository)

    }
    async execute({ id }: IRequest) {

        const order: Order | undefined = await this.orderRepository.findByID(id)

        if(!order) throw new AppError("Order not found!", 404)

        return order

    }
}

export default ShowOrderService