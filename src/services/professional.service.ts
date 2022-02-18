import ProfessionalsRepository from "../repositories/professionals.repository";
import { getCustomRepository } from "typeorm";
import { Professional } from "../entities";
import bcryptjs from "bcryptjs";
import { title } from "../utils/functions";
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

    const emailExists = await professionalsRepository.find({
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
    if (data.council_number) {
      throw new Error("You can not change your council number");
    }
    if (data.password) {
      data.password = await bcryptjs.hash(data.password, 10);
    }
    if (data.name) {
      data.name = title(data.name);
    }
    if (data.address) {
      data.address = title(data.address);
    }
    if (data.specialty) {
      data.specialty = title(data.specialty);
    }
    if (data.email) {
      if (
        data.email.match(
          /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/
        ) == null
      ) {
        throw new Error("Invalid email");
      }
    }
    if (data.phone) {
      if (data.phone.match(/\(\d{2,}\)\d{4,}\-\d{4}/) == null) {
        throw new Error("Invalid phone number. Correct format: (xx)xxxxx-xxxx");
      }
    }
    await professionalsRepository.update(id, data);

    const updatedProfessional = await professionalsRepository.findOne(id);

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
