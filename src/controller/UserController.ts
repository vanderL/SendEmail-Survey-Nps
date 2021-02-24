import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { User } from '../model/User'

class UserController {
    async create(req: Request, res: Response) {
        const {name, email} = req.body
        const usersRepository = getRepository(User)
        
        const userAlreadyExists = await usersRepository.findOne({
            email
        })
        
        const user = usersRepository.create({
            name, email
        })

        if (userAlreadyExists) {
            res.status(400).json({
                error: 'User already exists! Recovery password'})
        }

        await usersRepository.save(user)
        
        return res.json(user)
    }
}

export { UserController }