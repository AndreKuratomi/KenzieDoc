import { AppointmentsRepository } from "../repositories/appointments.repository";
import { getCustomRepository, getRepository, LessThan, MoreThan } from "typeorm";
import { Appointment, Patient, Professional } from "../entities";
import { Between } from "typeorm";
import { sendAppointmentEmail, sendCancelationEmail } from "./email.service";

export class CreateAppointmentService {
  async execute(data: Appointment, date: string, hour:string) {
    const patientRepo = getRepository(Patient)
    const proRepo = getRepository(Professional)
    const user = await patientRepo.findOne({where: {cpf : data.patient}})
    const medic = await proRepo.findOne({where: {council_number : data.professional}})
    const name: any = user?.name
    const mail: any = user?.email
    const medicName: any = medic?.name
    const specialty: any = medic?.specialty
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const newAppointment = appointmentsRepository.create(data);

    await appointmentsRepository.save(newAppointment);

    await sendAppointmentEmail(name, medicName, mail, specialty, date, hour)

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
      const patientRepo = getRepository(Patient)
      const proRepo = getRepository(Professional)

    const appointmentToDelete = await appointmentsRepository.findOne(id, {relations: ["professional", "patient"]});
    const user = await patientRepo.findOne({where: {cpf : appointmentToDelete?.patient.cpf}})
    const medic = await proRepo.findOne({where: {council_number : appointmentToDelete?.professional.council_number}})
    const name: any = user?.name
    const mail: any = user?.email
    const medicName: any = medic?.name
    const specialty: any = medic?.specialty
    const appointmentDate:any = appointmentToDelete?.date
    const date:any = appointmentDate
    
    if (!appointmentToDelete) {
      throw new Error("This appointment does not exist");
    }

    sendCancelationEmail(name, medicName, mail, specialty, date)

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

    return appointments;
  }
}

export class AppointmentByProfessionalService {
  async execute(professionalId: string) {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointments = await appointmentsRepository.find({
      where: { professional: professionalId },
    });

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
    return lateAppointments.length;
  }
}
