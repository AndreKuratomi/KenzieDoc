import ProfessionalsRepository from "../repositories/professionals.repository";
import { getCustomRepository } from "typeorm";
import { Professional } from "../entities";
import bcryptjs from "bcryptjs";

export class CreateProfessionalService {
  async execute(data: Professional) {
    const professionalsRepository = getCustomRepository(
      ProfessionalsRepository
    );
    data.password = await bcryptjs.hash(data.password, 10);

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
