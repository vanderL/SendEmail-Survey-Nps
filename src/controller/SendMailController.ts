import {Request, Response } from 'express'
import { getCustomRepository } from "typeorm"
import { SurveyRepository } from '../mappings/SurveysRepository'
import { SurveysUsersRepository } from '../mappings/SurveysUsersRepository'
import { UsersRepository } from "../mappings/UsersRepository"
import SendMailService from '../services/SendMailService'

class SendMailController {
    async execute(req: Request, res: Response){
        const { email, survey_id } = req.body

        const usersRepository = getCustomRepository(UsersRepository)
        const surveyRepository = getCustomRepository(SurveyRepository)
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

        const userAlreadyExists = await usersRepository.findOne({ email })

        if (!userAlreadyExists) {
            return res.status(400).json({
                error: "User does not exists"
            })
        }

        const survey = await surveyRepository.findOne({id: survey_id})
    
        if(!survey) {
            return res.status(400).json({
                error: "Survey does not exists"
            })
        }

        const surveyUser = surveysUsersRepository.create({
            user_id: userAlreadyExists.id,
            survey_id
        })
        await surveysUsersRepository.save(surveyUser)

        await SendMailService.execute(email, survey.title, survey.description)

        return res.json(surveyUser)
    }
}

export { SendMailController }