import { NextFunction, Request, Response } from "express";
import  ErrorHandler from "../errors/application.error";

const verifyAdmin = (req: any, res: Response, next: NextFunction) => {
    const userInfo = req.user;
    
    if (userInfo.isAdmin === false) {
        throw new ErrorHandler("Acess denied - You must be an Admin to access this resource", 401)
    }

    return next();
};

export default verifyAdmin