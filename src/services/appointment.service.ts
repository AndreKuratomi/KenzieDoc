import { AppointmentsRepository } from "../repositories/appointments.repository";
import { getCustomRepository } from "typeorm";
import { Appointment } from "../entities";

export class CreateAppointmentService {
  async execute(data: Appointment) {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const newAppointment = appointmentsRepository.create(data);

    await appointmentsRepository.save(newAppointment);

    return newAppointment;
  }
}

export class AppointmentsListService {
  async execute() {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentsList = await appointmentsRepository.find();

    return appointmentsList;
  }
}

export class UpdateAppointmentService {
  async execute(id: string, data: Appointment) {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    await appointmentsRepository.update(id, data);

    const updatedAppointment = await appointmentsRepository.findOne(id);

    if (!updatedAppointment) {
      throw new Error("This professional does not exist");
    }

    return updatedAppointment;
  }
}

export class DeleteAppointmentService {
  async execute(id: string) {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentToDelete = await appointmentsRepository.findOne(id);

    if (!appointmentToDelete) {
      throw new Error("This appointment does not exist");
    }

    const deletedAppointment = await appointmentsRepository.remove(
      appointmentToDelete
    );

    return deletedAppointment;
  }
}
