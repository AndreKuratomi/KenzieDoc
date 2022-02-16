import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import AdminRepository from "../repositories/admin.repository";
import PatientRepository from "../repositories/patients.repository";
import ProfessionalRepository from "../repositories/professionals.repository";
import ErrorHandler from "../utils/errors";

export class LoginUserService {
  async execute(email: string, password: string) {
    const patientRepository = getCustomRepository(PatientRepository);
    const patient = await patientRepository.findByEmail(email);

    const professionalRepository = getCustomRepository(ProfessionalRepository);
    const professional = await professionalRepository.findByEmail(email);

    const adminRepository = getCustomRepository(AdminRepository);
    const admin = await adminRepository.findByEmail(email);

    if (patient) {
      if (!bcrypt.compareSync(password, patient.password)) {
        // return { message: "Wrong email/password" };
        throw new ErrorHandler("Wrong email/password", 400);
      }
      const token = jwt.sign(
        { cpf: patient.cpf, name: patient.name },
        process.env.SECRET as string,
        {
          expiresIn: "1d",
        }
      );
      return token;
    } else if (professional) {
      if (!bcrypt.compareSync(password, professional.password)) {
        // return { message: "Wrong email/password" };
        throw new ErrorHandler("Wrong email/password", 400);
      }
      const token = jwt.sign(
        {
          council_number: professional.council_number,
          name: professional.name,
        },
        process.env.SECRET as string,
        {
          expiresIn: "1d",
        }
      );
      return token;
    } else if (admin) {
      if (!bcrypt.compareSync(password, admin.password)) {
        // return { message: "Wrong email/password" };
        throw new ErrorHandler("Wrong email/password", 400);
      }
      const token = jwt.sign(
        {
          email: admin.email,
          name: admin.name,
          isAdm: admin.isAdm,
        },
        process.env.SECRET as string,
        {
          expiresIn: "1d",
        }
      );
      return token;
    }
    //Verify Admin
    // return { message: "User don't exist" };
    throw new ErrorHandler("User don't exist", 404);
  }
}
