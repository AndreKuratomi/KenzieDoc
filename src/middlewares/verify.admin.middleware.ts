import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errors";

const verifyAdmin = (req: any, res: Response, next: NextFunction) => {
  const userInfo = req.user;
  try {
    console.log(userInfo.isAdm);

    if (userInfo.isAdm !== true) {
      //   throw new ErrorHandler(
      //     "Acess denied - You must be an Admin to access this resource",
      //     401
      //   );
      return res.status(401).json({
        status: "error",
        message: "Acess denied - You must be an Admin to access this resource",
      });
    }

    next();
  } catch (err) {
    next(err);
  }
};

export default verifyAdmin;
