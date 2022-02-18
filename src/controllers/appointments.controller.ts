import { Request, Response } from "express";
import { PDFGenerator } from "../utils/pdfGeneretor";
import {
  CreateAppointmentService,
  UpdateAppointmentService,
  DeleteAppointmentService,
  AppointmentByPatientService,
  AppointmentByProfessionalService,
  AppointmentsTomorrowService,
  WaitListService,
} from "../services/appointment.service";
import { getCustomRepository } from "typeorm";
import PatientRepository from "../repositories/patients.repository";
import ProfessionalRepository from "../repositories/professionals.repository";
import { sendAppointmentEmail } from "../services/email.service";

export class CreateAppointmentController {
  async handle(req: Request, res: Response) {
    const createAppointmentService = new CreateAppointmentService();
    const data = req.body;
    const { date } = data;
    const patientRepo = getCustomRepository(PatientRepository);
    const proRepo = getCustomRepository(ProfessionalRepository);
    const user = await patientRepo.findOne({ where: { cpf: data.patient } });
    const medic = await proRepo.findOne({
      where: { council_number: data.professional },
    });
    const name: any = user?.name;
    const mail: any = user?.email;
    const medicName: any = medic?.name;
    const specialty: any = medic?.specialty;

    try {
      const day = date.split(" ")[0];
      const hour = date.split(" ")[1];

      const appointment = await createAppointmentService.execute(
        data,
        day,
        hour
      );

      await sendAppointmentEmail(name, medicName, mail, specialty, date, hour);

      res.status(201).json(appointment);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }
}

export class UpdateAppointmentController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;
    const updateAppointmentService = new UpdateAppointmentService();
    try {
      const toUpdate = await updateAppointmentService.execute(id, data);
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

export class AppointmentByPatientController {
  async handle(req: Request, res: Response) {
    const appointmentByPatientService = new AppointmentByPatientService();
    const { cpf } = req.params;

    try {
      const appointments = await appointmentByPatientService.execute(cpf);

      return res.status(200).json(appointments);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }
}
export class AppointmentByProfessionalController {
  async handle(req: Request, res: Response) {
    const appointmentByProfessionalService =
      new AppointmentByProfessionalService();
    let { crm } = req.params;
    crm = crm.toUpperCase();

    try {
      const appointments = await appointmentByProfessionalService.execute(crm);

      return res.status(200).json(appointments);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }
}

export class AppointmentsTomorrowController {
  async handle(req: Request, res: Response) {
    const appointmentsTomorrowService = new AppointmentsTomorrowService();

    try {
      const appointments = await appointmentsTomorrowService.execute();

      return res.status(200).json(appointments);
    } catch (err: any) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    }
  }
}
export class WaitListController {
  async handle(req: Request, res: Response) {
    const waitListService = new WaitListService();
    let { crm } = req.params;
    crm = crm.toUpperCase();

    try {
      const waitList = await waitListService.execute(crm);

      return res.status(200).json(waitList);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }
}

export class Pdf {
  async handle(req: Request, res: Response) {
    try {
      PDFGenerator();

      return res.status(200).json("gerou");
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }
}
