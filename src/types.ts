export interface IProfessionalByIdResult {
  council_number: string;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  address: string;
  password: string;
  appointments: IAppointmentsProfessional[];
}
interface IAppointmentsProfessional {
  date: Date;
  patient: {
    name: string;
    age: number;
    sex: string;
    health_plan: string;
  };
}

export interface IAppointmentsPatientResult {
  id: string;
  date: Date;
  finished: boolean;
  patient_name: string;
  professional: {
    name: string;
    specialty: string;
    email: string;
    council_number: string;
  };
}

export interface IAppointmentsProfessionalResult {
  id: string;
  date: Date;
  finished: boolean;
  professional_name: string;
  patient: {
    name: string;
    age: number;
    sex: string;
    health_plan: string;
  };
}

export interface IAppointmentsTomorrowResult {
  id: string;
  date: Date;
  finished: boolean;
  professional: {
    name: string;
    council_number: string;
    phone: string;
  };
  patient: {
    name: string;
    cpf: string;
    phone: string;
  };
}

export interface IAppointmentWaitListResult {
  message: string;
  size: number;
  professional_email: string;
  appointments: IWaitList[];
}
interface IWaitList {
  id: string;
  date: Date;
  patient: {
    name: string;
    phone: string;
    email: string;
  };
}

export interface IAppointmentData {
  professional: string;
  patient: string;
  date: Date;
  finished: boolean;
}
