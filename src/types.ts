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
