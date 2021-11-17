import 'reflect-metadata';
import express from 'express';
import "express-async-errors";
import createConnection from './database';
import { router } from './router';
import { AppError } from './errors/AppError';

createConnection();
const app = express();

app.use(express.json());
app.use(router);

app.use(
    (err: Error, req: express.Request, res: express.Response, _next: express.NextFunction) => {
    if ( err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message
        })
    }

    return res.status(500).json({
        status: "Error",
        message: `Internal server error ${err.message}`,
    })
});

export { app };