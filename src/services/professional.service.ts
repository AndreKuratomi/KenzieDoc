import { ProfessionalsRepository } from "../repositories/professionals.repository";
import { getCustomRepository } from "typeorm";
import { Professional } from "../entities";
import bcryptjs from "bcryptjs";

export const createProfessionalService = async (data: Professional) => {
  const professionalsRepository = getCustomRepository(ProfessionalsRepository);
  data.password = await bcryptjs.hash(data.password, 10);

  const newProfessional = professionalsRepository.create(data);

  await professionalsRepository.save(newProfessional);

  return newProfessional;
};

export const professionalsListService = async () => {
  const professionalsRepository = getCustomRepository(ProfessionalsRepository);

  const professionalsList = await professionalsRepository.find();

  return professionalsList;
};

export const updateProfessionalService = async (
  id: string,
  data: Professional
) => {
  const professionalsRepository = getCustomRepository(ProfessionalsRepository);

  await professionalsRepository.update(id, data);

  const updatedProfessional = await professionalsRepository.findOne(id);

  return updatedProfessional;
};

export const deleteProfessionalService = async (id: string) => {
  const professionalsRepository = getCustomRepository(ProfessionalsRepository);

  const profToDelete = await professionalsRepository.findOne(id);

  if (!profToDelete) {
    throw new Error("This professional does not exist");
  }

  const deletedProfessional = await professionalsRepository.remove(
    profToDelete
  );

  return deletedProfessional;
};
