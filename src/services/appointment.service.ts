import { AppointmentsRepository } from "../repositories/appointments.repository";
import { getCustomRepository, LessThan, MoreThan } from "typeorm";
import { Appointment } from "../entities";
import { Between } from "typeorm";
import ErrorHandler from "../utils/errors";

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

    if (!appointmentsList) {
      throw new ErrorHandler("There is no appointment listed!", 404);
    }

    return appointmentsList;
  }
}

export class UpdateAppointmentService {
  async execute(id: string, data: Appointment) {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    await appointmentsRepository.update(id, data);

    const updatedAppointment = await appointmentsRepository.findOne(id);

    if (!updatedAppointment) {
      throw new ErrorHandler("This professional does not exist", 404);
    }

    return updatedAppointment;
  }
}

export class DeleteAppointmentService {
  async execute(id: string) {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentToDelete = await appointmentsRepository.findOne(id);

    if (!appointmentToDelete) {
      throw new ErrorHandler("This appointment does not exist", 404);
    }

    const deletedAppointment = await appointmentsRepository.remove(
      appointmentToDelete
    );

    return deletedAppointment;
  }
}

export class AppointmentByPatientService {
  async execute(patientId: string) {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointments = await appointmentsRepository.find({
      where: { patient: patientId },
    });

    if (!appointments) {
      throw new ErrorHandler("There is no appointment for this patient", 404);
    }

    return appointments;
  }
}

export class AppointmentByProfessionalService {
  async execute(professionalId: string) {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointments = await appointmentsRepository.find({
      where: { professional: professionalId },
    });

    if (!appointments) {
      throw new ErrorHandler(
        "There is no appointment for this professional",
        404
      );
    }

    return appointments;
  }
}

export class AppointmentsTomorrowService {
  async execute(date: string) {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const currentDate = new Date();
    const yearMonth =
      currentDate.getFullYear() +
      "-" +
      String(currentDate.getMonth() + 1).padStart(2, "0") +
      "-";
    const tomorrow =
      yearMonth + String(currentDate.getDate()).padStart(2, "0") + "T21:00";

    const endTomorrow =
      yearMonth + String(currentDate.getDate() + 1).padStart(2, "0") + "T20:59";

    const appointments = await appointmentsRepository.find({
      date: Between(tomorrow, endTomorrow),
    });

    if (!appointments) {
      throw new ErrorHandler("There is no appointment for this period", 404);
    }
    return appointments;
  }
}

export class WaitListService {
  async execute(crm: String) {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() - 3);

    const lateAppointments = await appointmentsRepository.find({
      where: {
        professional: crm,
        finished: false,
        date: LessThan(currentDate),
      },
    });

    if (!lateAppointments) {
      throw new ErrorHandler(
        "There are no late appointments for this professionals!",
        404
      );
    }

    return lateAppointments.length;
  }
}
