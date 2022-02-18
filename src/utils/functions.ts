import { Appointment, Professional } from "../entities";
import {
  IAppointmentsPatientResult,
  IAppointmentsProfessionalResult,
  IAppointmentsTomorrowResult,
  IAppointmentWaitListResult,
} from "../types";

export const title = (str: string) => {
  const arr = str.split(" ");
  let result = "";
  arr.forEach((str, i) => {
    result += str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
    if (i < arr.length - 1) {
      result += " ";
    }
  });
  return result;
};

export const formatPatientAppointment = (appointments: Appointment[]) => {
  let result: IAppointmentsPatientResult[] = [];
  appointments.forEach((appointment) => {
    const app = {
      id: appointment.id,
      date: appointment.date,
      finished: appointment.finished,
      patient_name: appointment.patient.name,
      professional: {
        name: appointment.professional.name,
        specialty: appointment.professional.specialty,
        email: appointment.professional.email,
        council_number: appointment.professional.council_number,
      },
    };
    result.push(app);
  });
  return result;
};

export const formatProfessionalAppointment = (appointments: Appointment[]) => {
  let result: IAppointmentsProfessionalResult[] = [];
  appointments.forEach((appointment) => {
    const app = {
      id: appointment.id,
      date: appointment.date,
      finished: appointment.finished,
      professional_name: appointment.professional.name,
      patient: {
        name: appointment.patient.name,
        age: appointment.patient.age,
        sex: appointment.patient.sex,
        health_plan: appointment.patient.health_plan,
      },
    };
    result.push(app);
  });
  return result;
};

export const formatAppointmentsTomorrow = (appointments: Appointment[]) => {
  let result: IAppointmentsTomorrowResult[] = [];
  appointments.forEach((appointment) => {
    const app = {
      id: appointment.id,
      date: appointment.date,
      finished: appointment.finished,
      professional: {
        name: appointment.professional.name,
        council_number: appointment.professional.council_number,
        phone: appointment.professional.phone,
      },
      patient: {
        name: appointment.patient.name,
        cpf: appointment.patient.cpf,
        phone: appointment.patient.phone,
      },
    };
    result.push(app);
  });
  return result;
};

export const formatWaitList = (appointments: Appointment[]) => {
  if (appointments[0] === undefined) {
    return { message: "There is no wait list at the moment" };
  }
  const doctor = appointments[0].professional;
  let result: IAppointmentWaitListResult = {
    message: `The wait list for ${doctor.name} is of ${appointments.length} patients`,
    size: appointments.length,
    professional_email: doctor.email,
    appointments: [],
  };
  appointments.forEach((appointment) => {
    const app = {
      id: appointment.id,
      date: appointment.date,
      patient: {
        name: appointment.patient.name,
        phone: appointment.patient.phone,
        email: appointment.patient.email,
      },
    };
    result.appointments.push(app);
  });
  return result;
};

export const onlyNonSensitive = (repo: Professional[]) => {
  let nonSensitiveDataList: object[] = [];

  for (let count = 0; count < repo.length; count++) {
    const {
      email: email_data,
      password: password_data,
      phone: phone_data,
      address: address_data,
      ...nonSensitiveData
    } = repo[count];

    nonSensitiveDataList.push(nonSensitiveData);
  }

  return nonSensitiveDataList;
};
