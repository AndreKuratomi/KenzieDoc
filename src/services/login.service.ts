import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import PatientRepository from "../repositories/patient.repository";
import ProfessionalRepository from "../repositories/professional.repository";

export const authentcateUser = async (email: string, password: string) => {
  const patientRepository = getCustomRepository(PatientRepository);
  const patient = await patientRepository.findByEmail(email);

  const professionalRepository = getCustomRepository(ProfessionalRepository);
  const professional = await professionalRepository.findByEmail(email);

  if (patient) {
    if (
      patient === undefined ||
      !bcrypt.compareSync(password, patient.password)
    ) {
      return { message: "Wrong email/password" };
    }
    const token = jwt.sign({ id: patient.id }, process.env.SECRET as string, {
      expiresIn: "1d",
    });
  } else if (professional) {
    if (
      professional === undefined ||
      !bcrypt.compareSync(password, professional.password)
    ) {
      return { message: "Wrong email/password" };
    }
    const token = jwt.sign(
      { id: professional.id },
      process.env.SECRET as string,
      {
        expiresIn: "1d",
      }
    );
  } else {
    //Admin
  }
};
