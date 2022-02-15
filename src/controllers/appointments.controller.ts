import { Request, Response } from "express";
import { resolve } from "path/posix";

import {
  CreateAppointmentService,
  AppointmentsListService,
  UpdateAppointmentService,
  DeleteAppointmentService,
} from "../services/appointment.service";

export class CreateAppointmentController {
  async handle(req: Request, res: Response) {
    const createAppointmentService = new CreateAppointmentService();
    const data = req.body;
    try {
      const appointment = await createAppointmentService.execute(data);
      res.status(201).json(appointment);
    } catch (err: any) {
      return res.status(err.statusCode).json({ message: err.message });
    }
  }
}
