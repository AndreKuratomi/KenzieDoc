import ProfessionalsRepository from "../repositories/professionals.repository";
import { getCustomRepository } from "typeorm";
import { Professional } from "../entities";
import bcryptjs from "bcryptjs";
import {
  checkUpdateProfessional,
  formatProfessionalSpecialty,
  title,
} from "../utils/functions";
import { IProfessionalByIdResult } from "../types";

export class CreateProfessionalService {
  async execute(data: Professional) {
    const professionalsRepository = getCustomRepository(
      ProfessionalsRepository
    );
    data.password = await bcryptjs.hash(data.password, 10);
    data.council_number = data.council_number.toUpperCase();
    data.name = title(data.name);
    data.address = title(data.address);
    data.specialty = title(data.specialty);

    const professionalExists = await professionalsRepository.findOne(
      data.council_number
    );

    const emailExists = await professionalsRepository.findOne({
      where: { email: data.email },
    });

    if (professionalExists) {
      throw new Error("A professional with this council number already exists");
    }
    if (emailExists) {
      throw new Error("A professional with this email already exists");
    }
    const newProfessional = professionalsRepository.create(data);

    await professionalsRepository.save(newProfessional);

    return newProfessional;
  }
}

export class ProfessionalsListService {
  async execute() {
    const professionalsRepository = getCustomRepository(
      ProfessionalsRepository
    );

    const professionalsList = await professionalsRepository.find();

    return professionalsList;
  }
}

export class UpdateProfessionalService {
  async execute(id: string, data: Professional) {
    const professionalsRepository = getCustomRepository(
      ProfessionalsRepository
    );
    let upperId = id.toUpperCase();

    checkUpdateProfessional(data);

    await professionalsRepository.update(upperId, data);

    const updatedProfessional = await professionalsRepository.findOne(upperId);

    if (!updatedProfessional) {
      throw new Error("This professional does not exist");
    }

    return updatedProfessional;
  }
}

export class DeleteProfessionalService {
  async execute(id: string) {
    const professionalsRepository = getCustomRepository(
      ProfessionalsRepository
    );

    const profToDelete = await professionalsRepository.findOne(id);

    if (!profToDelete) {
      throw new Error("This professional does not exist");
    }

    const deletedProfessional = await professionalsRepository.remove(
      profToDelete
    );

    return deletedProfessional;
  }
}

export class ProfessionalByIdService {
  async execute(id: string) {
    const professionalsRepository = getCustomRepository(
      ProfessionalsRepository
    );

    const professional = await professionalsRepository.findOne(id, {
      relations: ["appointments", "appointments.patient"],
    });

    if (!professional) {
      throw new Error("This professional does not exist");
    }
    const result: IProfessionalByIdResult = {
      council_number: professional.council_number,
      name: professional.name,
      email: professional.email,
      phone: professional.phone,
      specialty: professional.specialty,
      address: professional.address,
      password: professional.password,
      appointments: [],
    };
    professional.appointments.forEach((appointment) => {
      const newApp = {
        date: appointment.date,
        patient: {
          name: appointment.patient.name,
          age: appointment.patient.age,
          sex: appointment.patient.sex,
          health_plan: appointment.patient.health_plan,
        },
      };
      result.appointments.push(newApp);
    });
    return result;
  }
}

export class ProfessionalBySpecialtyService {
  async execute(specialty: string) {
    const professionalsRepository = getCustomRepository(
      ProfessionalsRepository
    );

    const specialtyList = await professionalsRepository.find({
      where: { specialty: specialty },
    });

    const result = {
      specialty: specialty,
      professionals: formatProfessionalSpecialty(specialtyList),
    };

    return result;
  }
}
