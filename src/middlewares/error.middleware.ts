import { Request, Response, NextFunction, response } from 'express';
import ErrorHandler from '../errors/application.error';

export const handleError = (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ErrorHandler) {
        return res.status(err.statusCode).json({
            message: err.message
        });
    }

    return res.status(500).send(console.log(err));
}
