import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../utils/config";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(400).json({ message: "JWT token required" });
  }

  try {
    jwt.verify(token, config.secret);
    next();
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
