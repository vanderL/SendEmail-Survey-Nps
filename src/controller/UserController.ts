import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { UsersRepository } from '../mappings/UsersRepository'
import * as yup from 'yup';
import { AppError } from '../errors/AppError';

class UserController {
    async create(req: Request, res: Response) {
        const {name, email} = req.body;

        const schema = yup.object().shape({
            name: yup.string().required("Nome é obrigatorio"),
            email: yup.string().email().required("Email é obrigatorio")
        });

        // if(!(await schema.isValid(req.body))) {
        //     return res.status(400).json({error: "Validation Failed!"})
        // }

        try {
           await schema.validate(req.body,{ abortEarly: false});  
        } catch (error) {
            throw new AppError(error);  
        }

        const usersRepository = getCustomRepository(UsersRepository);
        
        const userAlreadyExists = await usersRepository.findOne({
            email
        });
        
        const user = usersRepository.create({
            name, email
        });

        if (userAlreadyExists) {
            throw new AppError("User already exists!");

        };

        await usersRepository.save(user);
        
        return res.status(201).json(user);
    }
}

export { UserController };
