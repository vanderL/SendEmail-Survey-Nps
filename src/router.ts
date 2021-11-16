import { UserController } from "./controller/UserController"
import { Router } from 'express'
import { SurveysController } from "./controller/SurveyController"
import { SendMailController } from "./controller/SendMailController"
import { AnswerController } from "./controller/AnswerController"

const router = Router()

const userController = new UserController()
const surveyController = new SurveysController()
const sendEmailController = new SendMailController()
const answerController = new AnswerController()

router.post('/users', userController.create)

router.post('/surveys', surveyController.create)
router.get('/surveys', surveyController.show)

router.post('/sendEmail', sendEmailController.execute)

router.get("/answers/:value", answerController.execute)

export { router }