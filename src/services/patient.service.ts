import PatientsRepository from "../repositories/patients.repository";
import { getCustomRepository } from "typeorm";
import { Patient } from "../entities";
import bcryptjs from "bcryptjs";

export class CreatePatientService {
  async execute(data: Patient) {
    const patientsRepository = getCustomRepository(PatientsRepository);
    data.password = await bcryptjs.hash(data.password, 10);

    const newPatient = patientsRepository.create(data);

    await patientsRepository.save(newPatient);

    return newPatient;
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
  async execute(id: string, data: Patient) {
    const patientsRepository = getCustomRepository(PatientsRepository);

    await patientsRepository.update(id, data);

    const updatedPatient = await patientsRepository.findOne(id);

    if (!updatedPatient) {
      throw new Error("This patient does not exist");
    }

    return updatedPatient;
  }
}
export class DeletePatientService {
  async execute(id: string) {
    const patientsRepository = getCustomRepository(PatientsRepository);

    const patientToDelete = await patientsRepository.findOne(id);

    if (!patientToDelete) {
      throw new Error("This patient does not exist");
    }

    const deletedPatient = await patientsRepository.remove(patientToDelete);

    return deletedPatient;
  }
}
