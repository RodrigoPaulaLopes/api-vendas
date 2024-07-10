import { Request, Response } from "express";
import GenericController from "modules/products/controller/GenericController";
import CreateCustomerService from "../services/createCustomerService";
import ShowCustomerService from "../services/showCustomerService";
import ListCustomerService from "../services/listCustomerService";
import UpdateCustomerService from "../services/updateCustomerService";
import DeleteCustomerService from "../services/deleteCustomerService";




class CustomerController implements GenericController {
   
    async index(req: Request, res: Response): Promise<Response> {

        const listCustomerService = new ListCustomerService()
        return res.status(200).json(await listCustomerService.execute())
    }

    async create(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        const { name, email } = req.body

        const createCustomerService = new CreateCustomerService()
        const customer = await createCustomerService.execute({ name, email })
        res.set({'location': `http://localhost:3002/api/v1/customer/show/${customer.id}` })
        return  res.status(201).json(customer)

    }

    async show(req: Request, res: Response): Promise<Response> {
        const {id} = req.params

        const showCustomerService = new ShowCustomerService()

        return res.status(200).json(await showCustomerService.execute({id}))

    }
    async update(req: Request, res: Response): Promise<Response> {
        const {name, email, pass} = req.body
        const {id} = req.params
        const updateCustomerService = new UpdateCustomerService()
        return res.status(200).json(await updateCustomerService.execute({name, email, id}))
    }
    async delete(req: Request, res: Response): Promise<Response> {
        
        const {id} = req.params

        const deleteCustomerService = new DeleteCustomerService()

        return res.status(204).json(await deleteCustomerService.execute({id}))
    }

    

}

export default CustomerController