import { NextFunction, Request, Response } from "express";
import  ErrorHandler from "../errors/application.error";

const verifyAccount = async (req: any, res: Response, next: NextFunction) => {

  try {

    const userInfo = req.user;
    const userId = req.params.id;

    if (userInfo.id !== userId && userInfo.isAdmin === false) {
      throw new ErrorHandler("Missing admin permissions", 401);
    }
  
    return next();

  } catch (error: any) {
    return res.status(error.statusCode).json(error.message)
  }
};

export default verifyAccount