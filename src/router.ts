import { UserController } from "./controller/UserController"
import { Router } from 'express'
import { SurveysController } from "./controller/SurveyController"
import { SendMailController } from "./controller/SendMailController"

const router = Router()

const userController = new UserController()
const surveyController = new SurveysController()
const sendEmailController = new SendMailController()

router.post('/users', userController.create)

router.post('/surveys', surveyController.create)
router.get('/surveys', surveyController.show)

router.post('/sendEmail', sendEmailController.execute)

export { router }