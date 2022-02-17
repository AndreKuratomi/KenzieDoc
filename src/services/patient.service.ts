import PatientsRepository from "../repositories/patients.repository";
import { getCustomRepository } from "typeorm";
import { Patient } from "../entities";
import bcryptjs from "bcryptjs";
import ErrorHandler from "../utils/errors";

export class CreatePatientService {
  async execute(data: Patient) {
    const patientsRepository = getCustomRepository(PatientsRepository);
    data.password = await bcryptjs.hash(data.password, 10);

    const emailAlreadyExists = await patientsRepository.findOne({
      where: {
        email: data.email,
      },
    });

    const cpfAlreadyExists = await patientsRepository.findOne({
      where: {
        cpf: data.cpf,
      },
    });

    if (cpfAlreadyExists) {
      throw new ErrorHandler("User already registered!", 409);
    }

    if (emailAlreadyExists) {
      throw new ErrorHandler("Email already registered!", 409);
    }

    const newPatient = patientsRepository.create(data);

    await patientsRepository.save(newPatient);

    const { password: data_password, ...newData } = newPatient;

    return newData;
  }
}

export class PatientsListService {
  async execute() {
    const patientsRepository = getCustomRepository(PatientsRepository);

    const patientsList = await patientsRepository.find();

    return patientsList;
  }
}

export class UpdatePatientService {
  async execute(cpf: string, data: Patient) {
    const patientsRepository = getCustomRepository(PatientsRepository);

    await patientsRepository.update(cpf, data);

    const updatedPatient = await patientsRepository.findOne(cpf);

    if (!updatedPatient) {
      throw new ErrorHandler("This patient does not exist", 404);
    }

    return updatedPatient;
  }
}

export class DeletePatientService {
  async execute(cpf: string) {
    const patientsRepository = getCustomRepository(PatientsRepository);

    const patientToDelete = await patientsRepository.findOne(cpf);

    if (!patientToDelete) {
      throw new ErrorHandler("This patient does not exist", 404);
    }

    const deletedPatient = await patientsRepository.remove(patientToDelete);

    return deletedPatient;
  }
}
