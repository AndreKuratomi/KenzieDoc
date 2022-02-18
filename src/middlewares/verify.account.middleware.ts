import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errors";

const verifyAccount = async (req: any, res: Response, next: NextFunction) => {
  try {
    const userInfo = req.user;
    const userId = req.params.id.toUpperCase();

    if (userInfo.id !== userId && userInfo.isAdm !== true) {
      throw new ErrorHandler("Missing permissions", 401);
    }

    return next();
  } catch (error: any) {
    return res.status(error.statusCode).json(error.message);
  }
};

export default verifyAccount;
