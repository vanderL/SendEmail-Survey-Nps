import { UserController } from "./controller/UserController"
import { Router } from 'express'

const router = Router()

const userController = new UserController()

router.post('/users', userController.create)

export { router }