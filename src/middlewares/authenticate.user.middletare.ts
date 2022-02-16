import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errors";

const authenticated = (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new ErrorHandler("Missing authorization token", 401);
    }

    jwt.verify(
      token as string,
      process.env.SECRET as string,
      async (err: any, decoded: any) => {
        console.log(decoded);
        if (err) {
          return next(new ErrorHandler("Invalid or expired token", 401));
        }
        const userId = decoded.id || decoded.cpf || decoded.council_number;
        const isAdm = decoded.isAdm || undefined;

        req.user = {
          id: userId,
          isAdm: isAdm,
        };

        next();
      }
    );
  } catch (error: any) {
    return res.status(error.statusCode).json({ Error: error.message });
  }
};

export default authenticated;
