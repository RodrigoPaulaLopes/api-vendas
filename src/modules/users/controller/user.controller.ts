import { Request, Response } from "express";
import GenericController from "modules/products/controller/GenericController";
import CreateUserService from "../services/createUserService";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import ShowUserService from "../services/showUserService";
import ListUserService from "../services/listUserService";
import UpdateUserService from "../services/updateUserService";
import DeleteUserService from "../services/deleteUserService";




class UserController implements GenericController {
   
    async index(req: Request, res: Response): Promise<Response> {

        const listUserService = new ListUserService()
        return res.status(200).json(await listUserService.execute())
    }

    async create(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        const { name, email, pass } = req.body

        const createUserService = new CreateUserService()
        const user = await createUserService.execute({ name, email, pass })
        res.set({'location': `http://localhost:3002/api/v1/user/show/${user.id}` })
        return  res.status(201).json(user)

    }

    async show(req: Request, res: Response): Promise<Response> {
        const {id} = req.params

        const showUserService = new ShowUserService()

        return res.status(200).json(await showUserService.execute({id}))

    }
    async update(req: Request, res: Response): Promise<Response> {
        const {name, email, pass} = req.body
        const {id} = req.params
        const updateUserService = new UpdateUserService()
        return res.status(200).json(await updateUserService.execute({name, email, pass, id}))
    }
    async delete(req: Request, res: Response): Promise<Response> {
        
        const {id} = req.params

        const deleteUserService = new DeleteUserService()

        return res.status(204).json(await deleteUserService.execute({id}))
    }

}

export default UserController