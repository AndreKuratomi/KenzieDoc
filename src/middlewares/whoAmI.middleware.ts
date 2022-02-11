import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IRequest } from "../types";

export const whoAmI = (req: IRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  const decoded = jwt.decode(token!, { json: true });

  if (!decoded) {
    return res.status(400).json({ message: "Invalid JWT token" });
  }

  if (typeof decoded === "string") {
    return res.status(400).json({ message: "Decoded cannot be a string" });
  }

  req.user = {
    name: decoded.name,
    email: decoded.email,
    id: decoded.id,
    isAdm: decoded.isAdm,
  };

  return next();
};
