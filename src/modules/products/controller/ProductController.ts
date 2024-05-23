import { type Request, type Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import Product from "../typeorm/entities/product";
import GenericController from "./GenericController";
import ListProductsService from "../services/ListProductsService";
import ListProductService from "../services/ListProductService";
import CreateProductService from "../services/CreateProductService";
import UpdateProductService from "../services/UpdateProductService";
import DeleteProductService from "../services/DeleteProductService";



class ProductController implements GenericController {
    async index(req: Request, res: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>> {

        const listService = new ListProductsService()

        return res.status(200).json(await listService.execute())
    }

    async create(req: Request, res: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>> {
        
        const {name, price, quantity} = req.body
        const createProductService = new CreateProductService()

        const product = await createProductService.execute({name, price, quantity})

        return res.status(201).json(product)
    }

    async show(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        const { id } = req.params
        const listOneService = new ListProductService()
        const product = await listOneService.execute({ id })

        return res.status(200).json(product)
    }

    async update(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        
        const {id} = req.params
        const {name, price, quantity} = req.body

        const updateProductService = new UpdateProductService()

        const product = await updateProductService.execute({id, name, price, quantity})

        return res.status(200).json(product)
    }

    async delete(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        const { id } = req.params
        const deleteProductService = new DeleteProductService()

        await deleteProductService.execute({ id })

        return res.status(204).json({message: "product deleted!"})
    }

}

export default ProductController