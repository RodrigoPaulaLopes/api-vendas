import { Request, Response } from "express";
import GenericController from "../../products/controller/generic.controller";
import ShowProfileService from "../services/showProfileService";
import UpdateProfileService from "../services/updateProfileService";




class ProfileController implements GenericController {
   

    async show(req: Request, res: Response): Promise<Response> {
        const id = req.user.id
        
        const showProfileService = new ShowProfileService()
        const user = await showProfileService.execute({id: id})

        return res.status(200).json(user)

    }
    async update(req: Request, res: Response): Promise<Response> {
        const {name, email, password, old_password} = req.body
        const id = req.user.id
        const updateProfileService = new UpdateProfileService()

        return res.status(200).json(await updateProfileService.execute({email, id, name, password, old_password}))
    }
   
}

export default ProfileController