import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppointmentsRepository } from "../repositories/appointments.repository";
import ErrorHandler from "../utils/errors";

const isValidUUID = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  try {
    if (id.length !== 36) {
      throw new ErrorHandler("Invalid uuid posted!", 400);
    }

    const isValidUUID = await appointmentsRepository.find({
      where: { id: id },
    });

    if (isValidUUID.length === 0) {
      throw new ErrorHandler("No uuid found!", 404);
    }
    next();
  } catch (error: any) {
    return res.status(error.statusCode).json({ Error: error.message });
  }
};

export default isValidUUID;
