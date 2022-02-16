import AdminRepository from "../repositories/admin.repository";
import { getCustomRepository } from "typeorm";
import { Admin } from "../entities";
import bcryptjs from "bcryptjs";

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

    await adminRepository.update(id, data);
    const updatedAdmin = await adminRepository.findOne(id);

    if (!updatedAdmin) {
      throw new Error("This admin does not exist");
    }
    return updatedAdmin;
  }
}
