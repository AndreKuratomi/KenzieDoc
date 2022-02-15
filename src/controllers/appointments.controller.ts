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

export class AppointmentsListController {
  async handle(req: Request, res: Response) {
    try {
      const appointmentsListService = new AppointmentsListService();
      const list = await appointmentsListService.execute();

      return res.status(200).json(list);
    } catch (err: any) {
      return res.status(err.statusCode).json(err.message);
    }
  }
}

export class UpdateAppointmentController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;
    const updateAppointmentService = new UpdateAppointmentService();
    try {
      const toUpdate = updateAppointmentService.execute(id, data);
      return res.status(200).json(toUpdate);
    } catch (err: any) {
      return res.status(err.statusCode).json({ message: err.message });
    }
  }
}

export class DeleteAppointmentController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const deleteAppointmentService = new DeleteAppointmentService();

      const toDelete = deleteAppointmentService.execute(id);
      return res.status(204).json(toDelete);
    } catch (err: any) {
      return res.status(err.statusCode).json({ message: err.message });
    }
  }
}
