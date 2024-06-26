import {Router, Request, Response} from 'express'
import multer from 'multer'
import uploadConfig from '../../../config/upload'
import {celebrate, Joi, Segments } from 'celebrate'
import UserController from 'modules/users/controller/user.controller'
import UserAvatarController from 'modules/users/controller/user.avatar.controller'
import IsAuthenticated from 'modules/users/middlewares/isAuthenticated.middleware'
const userController = new UserController()

const router = Router()
const upload = multer(uploadConfig)
const isAuthenticated = new IsAuthenticated()
const userAvatarController = new UserAvatarController()
router.post('/create', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().required(),
        pass: Joi.string().required()
    }
}), userController.create)

router.put('/update/:id', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().required(),
        pass: Joi.string().required()
    },
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
    }
}), userController.update)


router.patch('/avatar', isAuthenticated.execute, upload.single('avatar'), userAvatarController.update)

router.get('/show/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
    }
}), userController.show)
router.delete('/delete/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
    }
}), userController.delete)
router.get('/index', userController.index)


export default router