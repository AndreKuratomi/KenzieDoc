import AdminRepository from "../repositories/admin.repository";
import { getCustomRepository } from "typeorm";
import { Admin } from "../entities";
import bcryptjs from "bcryptjs";
import ErrorHandler from "../utils/errors";

export class CreateAdminService {
  async execute(data: Admin) {
    const adminRepository = getCustomRepository(AdminRepository);
    data.password = await bcryptjs.hash(data.password, 10);

    const newAdmin = adminRepository.create(data);
    await adminRepository.save(newAdmin);
    return newAdmin;
  }
}

export class UpdateAdminService {
  async execute(id: string, data: Admin) {
    const adminRepository = getCustomRepository(AdminRepository);

    if (id.length !== 36) {
      throw new ErrorHandler("Invalid uuid posted!", 400);
    }
    const isValidAdminUUID = await adminRepository.findOne({
      where: { id: id },
    });
    console.log(isValidAdminUUID);
    if (!isValidAdminUUID) {
      throw new ErrorHandler("No uuid found!", 404);
    }

    await adminRepository.update(id, data);
    const updatedAdmin = await adminRepository.findOne(id);

    if (!updatedAdmin) {
      throw new Error("This admin does not exist");
    }
    return updatedAdmin;
  }
}
