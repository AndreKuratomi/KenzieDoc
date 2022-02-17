import { Request, Response, NextFunction } from "express";

export const validateSchema = (schema) = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const resource = req.body;
  try {
    await schema.validate(resource);
    next();
  } catch (error: any) {
      res.status(error.statusCode).json({message: error.message})
  }
});
