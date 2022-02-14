import { Request, Response, NextFunction } from "express";

import ErrorHandler from "../utils/errors";

export const handleError = (
  error: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ErrorHandler) {
    return res.status(error.statusCode).json({ error: error.message });
  }
  res.status(500).json({ error: "Internal server error!" });
};
