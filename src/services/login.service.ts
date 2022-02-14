import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import PatientRepository from "../repositories/patients.repository";
import ProfessionalRepository from "../repositories/professionals.repository";

export class LoginUserService {
  async execute(email: string, password: string) {
    const patientRepository = getCustomRepository(PatientRepository);
    const patient = await patientRepository.findByEmail(email);

    const professionalRepository = getCustomRepository(ProfessionalRepository);
    const professional = await professionalRepository.findByEmail(email);

    if (patient) {
      if (!bcrypt.compareSync(password, patient.password)) {
        return { message: "Wrong email/password" };
      }
      const token = jwt.sign(
        { cpf: patient.cpf },
        process.env.SECRET as string,
        {
          expiresIn: "1d",
        }
      );
    } else if (professional) {
      if (!bcrypt.compareSync(password, professional.password)) {
        return { message: "Wrong email/password" };
      }
      const token = jwt.sign(
        { council_number: professional.council_number },
        process.env.SECRET as string,
        {
          expiresIn: "1d",
        }
      );
    }
    //Verify Admin
    return { message: "User don't exisist" };
  }
}
