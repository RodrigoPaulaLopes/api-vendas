import { Request, Response } from "express";
import GenericController from "modules/products/controller/GenericController";
import ListUserService from "../services/listUserService";
import UpdateUserAvatarService from "../services/updateUserAvatarService";




class UserAvatarController implements GenericController {
   
    async update(req: Request, res: Response): Promise<Response> {

        const updateUserAvatarService = new UpdateUserAvatarService()
       
        const response = await updateUserAvatarService.execute({user_id: req.user.id, avatarFileName: req.file?.filename as string})
        return res.status(200).json(response)
    }

}

export default UserAvatarController