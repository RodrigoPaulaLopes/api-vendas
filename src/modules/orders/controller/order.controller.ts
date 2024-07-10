import { type Request, type Response } from "express";
import CreateOrderService from "../services/CreateOrderService";
import ShowOrderService from "../services/ShowOrderService";





class OrderController {

    async create(req: Request, res: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>> {

        const { customer_id, products } = req.body
        const createOrderService = new CreateOrderService()

        const order = await createOrderService.execute({ customer_id, products })

        return res.status(201).json(order)
    }

    async show(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        const { id } = req.params
        const listOneService = new ShowOrderService()
        const order = await listOneService.execute({ id })

        return res.status(200).json(order)
    }

}

export default OrderController